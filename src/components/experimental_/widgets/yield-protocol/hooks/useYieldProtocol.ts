import { useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, PayableOverrides, ethers } from 'ethers';
import { Address, useContract } from 'wagmi';
import { PrepareWriteContractResult, getContract, prepareWriteContract } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import ladleAbi from '../contracts/abis/Ladle';
import poolAbi from '../contracts/abis/Pool';
import wrapEtherModuleAbi from '../contracts/abis/WrapEtherModule';
import contractAddresses, { ContractNames } from '../contracts/config';
import { LadleActions, ModuleActions, RoutedActions } from '../operations';

export interface ICallData {
  args: (string | BigNumberish | boolean)[];
  operation: string;
  targetContract?: Contract;
  fnName?: string;
  ignoreIf?: boolean;
  overrides?: PayableOverrides;
}

interface LendProps {
  account: Address | undefined;
  input: BigNumber;
  baseAddress: Address;
  poolAddress: Address;
  isEthBase: boolean;
}

interface BorrowProps {
  account: Address | undefined;
  borrowAmount: BigNumber;
  collateralAmount: BigNumber;
  seriesEntityId: string;
  ilkId: string;
  vaultId: string | undefined;
  isEthBase: boolean;
  isEthCollateral: boolean;
}

const useYieldProtocol = () => {
  const chainId = useChainId();
  const signer = useSigner();
  const ladle = useContract({
    address: contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE),
    abi: ladleAbi,
    signerOrProvider: signer,
  });
  const wrapEtherModule = useContract({
    address: contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE),
    abi: wrapEtherModuleAbi,
    signerOrProvider: signer,
  });

  const getCallValue = useCallback(
    async (calls: ICallData[]) =>
      calls.reduce(async (_sum, call) => {
        const sum = await _sum;
        const value = await call.overrides?.value;

        return call.ignoreIf || !value ? sum.add(ethers.constants.Zero) : sum.add(value);
      }, Promise.resolve(ethers.constants.Zero)),
    []
  );

  /**
   * Encode all function calls to ladle.batch()
   * @param calls array of ICallData objects
   * @param ladleAddress ladle contract address
   * @returns {Promise<PrepareWriteContractResult | undefined>}
   */
  const getSendParams = useCallback(
    async (calls: ICallData[]): Promise<PrepareWriteContractResult | undefined> => {
      if (!ladle) {
        console.error('Ladle contract not found');
        return undefined;
      }

      /* filter out any ignored calls */
      const filteredCalls = calls.filter((c) => !c.ignoreIf);
      console.log('Yield Protocol Batch multicall: ', filteredCalls);

      /* Encode each of the calls or pre-encoded route calls */
      const encodedCalls = filteredCalls.map((call) => {
        /* 'pre-encode' routed calls if required */
        if (call.operation === LadleActions.Fn.ROUTE || call.operation === LadleActions.Fn.MODULE) {
          if (call.fnName && call.targetContract) {
            const encodedFn = call.targetContract.interface.encodeFunctionData(
              call.fnName,
              call.args
            );

            if (call.operation === LadleActions.Fn.ROUTE)
              return ladle.interface.encodeFunctionData(LadleActions.Fn.ROUTE, [
                call.targetContract.address,
                encodedFn,
              ]);

            if (call.operation === LadleActions.Fn.MODULE)
              return ladle.interface.encodeFunctionData(LadleActions.Fn.MODULE, [
                call.targetContract.address,
                encodedFn,
              ]);
          }
          throw new Error(
            'Function name and contract target required for routing/module interaction'
          );
        }

        return ladle.interface.encodeFunctionData(call.operation, call.args);
      });

      /* calculate the eth value sent */
      const batchValue = await getCallValue(calls);

      const prepped = await prepareWriteContract({
        abi: ladleAbi,
        address: ladle.address,
        signer,
        functionName: 'batch',
        args: [encodedCalls as `0x${string}`[]],
        overrides: { value: batchValue },
        chainId,
      });

      return prepped;
    },
    [ladle, getCallValue, signer, chainId]
  );

  /**
   * Handles wrapping eth specific to Yield Protocol
   * @dev any non-zero value can be supplied to wrap; all eth available will be wrapped (value specified does not matter)
   * @param to address to send wrapped eth to
   * @param value amount of eth to wrap
   * @param chainId chainId to use (defaults to mainnet for now)
   * @returns
   */
  const getWrapEthCallData = useCallback(
    (to: Address, value: BigNumber): ICallData[] => {
      if (!wrapEtherModule) {
        console.error('WrapEtherModule contract not found');
        return [];
      }

      return [
        {
          operation: LadleActions.Fn.MODULE,
          fnName: 'wrap',
          args: [to, value] as ModuleActions.Args.WRAP_ETHER_MODULE,
          targetContract: wrapEtherModule,
          ignoreIf: value.lte(ethers.constants.Zero), // ignores if value is 0 or negative
          overrides: { value },
        },
      ];
    },
    [wrapEtherModule]
  );

  const _lend = useCallback(
    ({
      account,
      input,
      baseAddress,
      poolAddress,
      isEthBase,
    }: LendProps): ICallData[] | undefined => {
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      const targetContract = getContract({
        address: poolAddress,
        abi: poolAbi,
        signerOrProvider: signer,
      });

      if (!targetContract) {
        console.error('Pool contract not found');
        return undefined;
      }

      return [
        ...getWrapEthCallData(poolAddress, isEthBase ? input : ethers.constants.Zero), // wrap eth to the pool if required
        {
          operation: LadleActions.Fn.TRANSFER,
          args: [baseAddress, poolAddress, input] as LadleActions.Args.TRANSFER,
          ignoreIf: isEthBase,
        },
        {
          operation: LadleActions.Fn.ROUTE,
          args: [account, ethers.constants.Zero] as RoutedActions.Args.SELL_BASE, // TODO handle slippage more gracefully
          fnName: RoutedActions.Fn.SELL_BASE,
          targetContract,
          ignoreIf: false,
        },
      ];
    },
    [getWrapEthCallData, signer]
  );

  /**
   * Returns the tx params for lending
   */
  const lend = useCallback(
    async ({ account, input, baseAddress, poolAddress, isEthBase }: LendProps) => {
      const lendCallData = _lend({ account, input, baseAddress, poolAddress, isEthBase });
      return lendCallData ? await getSendParams(lendCallData) : undefined;
    },
    [_lend, getSendParams]
  );

  const _borrow = useCallback(
    ({
      account,
      borrowAmount,
      collateralAmount,
      seriesEntityId,
      ilkId,
      vaultId,
      isEthBase,
      isEthCollateral,
    }: BorrowProps) => {
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      /* if ETH is being borrowed, send the borrowed tokens (WETH) to ladle for unwrapping */
      const serveToAddress = isEthBase ? ladle?.address : account; // TODO handle unwrapping WETH cuz this is going to send borrowed eth to the ladle

      return [
        /* Include all the signatures gathered, if required */
        // ...permitCallData,

        ...getWrapEthCallData(
          ladle?.address as Address,
          isEthCollateral ? collateralAmount : ethers.constants.Zero
        ), // wrap eth to the pool if required

        /* If vault is null, build a new vault, else ignore */
        {
          operation: LadleActions.Fn.BUILD,
          args: [seriesEntityId, ilkId, '0'] as LadleActions.Args.BUILD,
          ignoreIf: !!vaultId, // Don't need to build a vault if it's already built
        },

        {
          operation: LadleActions.Fn.SERVE,
          args: [
            vaultId,
            serveToAddress,
            collateralAmount,
            borrowAmount,
            ethers.constants.MaxUint256,
          ] as LadleActions.Args.SERVE, // TODO handle slippage more gracefully
        },
        // ...getUnwrapEthCallData(ladle?.address as Address, isEthBase ? collateralAmount : ethers.constants.Zero), // wrap eth to the pool if required
      ];
    },
    [getWrapEthCallData, ladle?.address, signer]
  );

  const borrow = useCallback(
    async ({
      account,
      borrowAmount,
      collateralAmount,
      seriesEntityId,
      ilkId,
      vaultId,
      isEthBase,
      isEthCollateral,
    }: BorrowProps) => {
      const borrowCallData = _borrow({
        account,
        borrowAmount,
        collateralAmount,
        seriesEntityId,
        ilkId,
        vaultId,
        isEthBase,
        isEthCollateral,
      });
      return borrowCallData ? await getSendParams(borrowCallData) : undefined;
    },
    [_borrow, getSendParams]
  );

  return { lend, borrow };
};

export default useYieldProtocol;
