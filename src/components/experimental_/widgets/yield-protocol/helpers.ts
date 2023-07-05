import {
  BigNumber,
  BigNumberish,
  Contract,
  PayableOverrides,
  Signer,
  UnsignedTransaction,
  ethers,
} from 'ethers';
import { Address } from 'wagmi';
import { PrepareWriteContractResult, getContract, prepareWriteContract } from 'wagmi/actions';
import ladleAbi from './contracts/abis/Ladle';
import wrapEtherModuleAbi from './contracts/abis/WrapEtherModule';
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
 * @param signer ethers signer
 * @param chainId chainId
 * @returns {Promise<UnsignedTransaction | undefined>}
 */
export const getSendParams = async (calls: ICallData[], signer: Signer, chainId: number) => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }

  const ladle = getContract({
    address: ladleAddress,
    abi: ladleAbi,
    signerOrProvider: signer,
  });

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

  let prepped: PrepareWriteContractResult | undefined;

  try {
    prepped = await prepareWriteContract({
      abi: ladleAbi,
      address: ladle.address,
      signer,
      functionName: 'batch',
      args: [encodedCalls as `0x${string}`[]],
      overrides: { value: batchValue },
      chainId,
    });
  } catch (e) {
    prepped = undefined;
    console.log('🦄 ~ file: helpers.ts:85 ~ e:', e);
  }

  return prepped ? (prepped.request as UnsignedTransaction) : undefined;
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
export const getWrapEthCallData = (
  to: Address,
  value: BigNumber,
  signer: Signer,
  chainId = 1
): ICallData[] => {
  const address = contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE);
  if (!address)
    throw new Error('Wrap Ether Module address not found; possibly on an unsupported chain');

  const targetContract = getContract({
    address: address,
    abi: wrapEtherModuleAbi,
    signerOrProvider: signer,
  });

  return [
    {
      operation: LadleActions.Fn.MODULE,
      fnName: 'wrap',
      args: [to, value] as ModuleActions.Args.WRAP_ETHER_MODULE,
      targetContract,
      ignoreIf: value.lte(ethers.constants.Zero), // ignores if value is 0 or negative
      overrides: { value },
    },
  ];
};
