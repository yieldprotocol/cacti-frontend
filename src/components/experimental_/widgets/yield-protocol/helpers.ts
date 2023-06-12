import { BigNumber, BigNumberish, Contract, PayableOverrides, ethers } from 'ethers';
import { Address } from 'wagmi';
import { getContract } from 'wagmi/actions';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import ladleAbi from './contracts/abis/Ladle.json';
import wrapEtherModuleAbi from './contracts/abis/WrapEtherModule.json';
import contractAddresses, { ContractNames } from './contracts/config';
import { LadleActions, ModuleActions } from './operations';

export interface ICallData {
  args: (string | BigNumberish | boolean)[];
  operation: string;
  targetContract?: Contract;
  fnName?: string;
  ignoreIf?: boolean;
  overrides?: PayableOverrides;
}

/**
 * Encode all function calls to ladle.batch()
 * @param calls array of ICallData objects
 * @param ladleAddress ladle contract address
 * @returns {Promise<TxBasicParams | undefined>}
 */
export const getTxParams = async (
  calls: ICallData[],
  ladleAddress: string
): Promise<TxBasicParams | undefined> => {
  const ladle = getContract({ address: ladleAddress, abi: ladleAbi });
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
        const encodedFn = call.targetContract.interface.encodeFunctionData(call.fnName, call.args);

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
      throw new Error('Function name and contract target required for routing/module interaction');
    }

    return ladle.interface.encodeFunctionData(call.operation, call.args);
  });

  /* calculate the eth value sent */
  const batchValue = await getCallValue(calls);

  return {
    address: ladleAddress,
    abi: ladleAbi,
    functionName: LadleActions.Fn.BATCH,
    args: encodedCalls,
    overrides: { value: batchValue },
  } as TxBasicParams;
};

const getCallValue = async (calls: ICallData[]) =>
  calls.reduce(async (_sum, call) => {
    const sum = await _sum;
    const value = await call.overrides?.value;

    return call.ignoreIf || !value ? sum.add(ethers.constants.Zero) : sum.add(value);
  }, Promise.resolve(ethers.constants.Zero));

/**
 * Handles wrapping eth specific to Yield Protocol
 * @dev any non-zero value can be supplied to wrap; all eth available will be wrapped (value specified does not matter)
 * @param to address to send wrapped eth to
 * @param value amount of eth to wrap
 * @param chainId chainId to use (defaults to mainnet for now)
 * @returns
 */
export const getWrapEthCallData = (to: Address, value: BigNumber, chainId = 1): ICallData[] => {
  const address = contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE);

  const targetContract = getContract({
    address: address!,
    abi: wrapEtherModuleAbi,
  });

  if (!targetContract) {
    console.error('WrapEtherModule contract not found');
    return [];
  }

  return [
    {
      operation: LadleActions.Fn.MODULE,
      fnName: ModuleActions.Fn.WRAP_ETHER_MODULE,
      args: [to, value] as ModuleActions.Args.WRAP_ETHER_MODULE,
      targetContract,
      ignoreIf: value.lte(ethers.constants.Zero), // ignores if value is 0 or negative
      overrides: { value },
    },
  ];
};

/**
 * Handles unwrapping eth specific to Yield Protocol
 * @dev any non-zero value can be supplied to unwrap; all eth available will be unwrapped (value specified does not matter)
 * @param to address to unwrap eth to
 * @param value amount of eth to unwrap
 * @param chainId chainId to use (defaults to mainnet for now)
 * @returns
 */
const getUnwrapEthCallData = (to: Address, value: BigNumber, chainId = 1): ICallData[] => {
  const address = contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE);

  const targetContract = getContract({
    address: address!,
    abi: wrapEtherModuleAbi,
  });

  if (!targetContract) {
    console.error('WrapEtherModule contract not found');
    return [];
  }

  return [
    {
      operation: LadleActions.Fn.EXIT_ETHER,
      args: [to] as LadleActions.Args.EXIT_ETHER,
      ignoreIf: value.eq(ethers.constants.Zero),
    },
  ];
};
