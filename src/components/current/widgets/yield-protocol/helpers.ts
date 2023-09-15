//@ts-nocheck
import { BigNumber, BigNumberish, Contract, PayableOverrides, Signer, ethers } from 'ethers';
import { Address } from 'wagmi';
import { getContract } from 'wagmi/actions';
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
 * @params calls array of ICallData
 * @returns {Promise<PopulatedTransaction | undefined>}
 */
export const getSendParams = async ({
  calls,
  signer,
  chainId,
}: {
  calls: ICallData[];
  signer: Signer;
  chainId: number;
}) => {
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
  const value = await getCallValue(calls);

  return await ladle.populateTransaction.batch(encodedCalls as `0x${string}`[], {
    value,
  });
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
export const getWrapEthCallData = ({
  to,
  value,
  signer,
  chainId = 1,
}: {
  to?: Address;
  value: BigNumber;
  signer: Signer;
  chainId: number;
}): ICallData[] => {
  const address = contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE);
  if (!address)
    throw new Error('Wrap Ether Module address not found; possibly on an unsupported chain');

  const targetContract = getContract({
    address: address,
    abi: wrapEtherModuleAbi,
    signerOrProvider: signer,
  });

  return to
    ? [
        {
          operation: LadleActions.Fn.MODULE,
          fnName: 'wrap',
          args: [to, value] as ModuleActions.Args.WRAP_ETHER_MODULE,
          targetContract,
          ignoreIf: value.lte(ethers.constants.Zero), // ignores if value is 0 or negative
          overrides: { value },
        },
      ]
    : [
        {
          operation: LadleActions.Fn.JOIN_ETHER,
          args: ['0x303000000000'] as LadleActions.Args.JOIN_ETHER,
          ignoreIf: value.lte(ethers.constants.Zero), // ignores if value is 0 or negative
          overrides: { value },
        },
      ];
};

export const getUnwrapEthCallData = ({
  value,
  to,
}: {
  value: BigNumber;
  to: Address;
}): ICallData[] => [
  {
    operation: LadleActions.Fn.EXIT_ETHER,
    args: [to] as LadleActions.Args.EXIT_ETHER,
    ignoreIf: value.eq(ethers.constants.Zero),
  },
];
