import { TransactionBase, encodeFunctionData } from 'viem';
import { Address } from 'wagmi';
import ladleAbi from './contracts/abis/Ladle';
import wrapEtherModuleAbi from './contracts/abis/WrapEtherModule';
import contractAddresses, { ContractNames } from './contracts/config';

export interface ICallData {
  call: `0x${string}`;
  ignoreIf?: boolean;
  value?: bigint;
}

/**
 * Encode all function calls to ladle.batch()
 * @params calls array of ICallData
 * @returns {TransactionBase | undefined}
 */
export const getSendParams = ({
  calls,
  chainId,
}: {
  calls: ICallData[];
  chainId: number;
}): Partial<TransactionBase> | undefined => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }

  /* filter out any ignored calls */
  const args = calls.filter((c) => !c.ignoreIf).map((c) => c.call);
  console.log('Yield Protocol Batch multicall: ', args);

  return {
    to: ladleAddress,
    value: getCallValue(calls),
    input: encodeFunctionData({
      abi: ladleAbi,
      functionName: 'batch',
      args: [args],
    }),
  };
};

const getCallValue = (calls: ICallData[]) =>
  calls.reduce((sum, { ignoreIf, value }) => (ignoreIf || !value ? sum : sum + value), BigInt(0));

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
  chainId = 1,
}: {
  to?: Address;
  value: bigint;
  chainId: number;
}): ICallData[] => {
  const address = contractAddresses.addresses.get(chainId)?.get(ContractNames.WRAP_ETHER_MODULE);
  if (!address)
    throw new Error('Wrap Ether Module address not found; possibly on an unsupported chain');

  if (to) {
    const wrapEncoded = encodeFunctionData({
      abi: wrapEtherModuleAbi,
      functionName: 'wrap',
      args: [to, value],
    });

    return [
      {
        call: encodeFunctionData({
          abi: ladleAbi,
          functionName: 'moduleCall',
          args: [address, wrapEncoded],
        }),
        value,
        ignoreIf: value <= BigInt(0),
      },
    ];
  }

  return [
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'joinEther',
        args: ['0x303000000000'],
      }),
      value,
      ignoreIf: value <= BigInt(0),
    },
  ];
};

export const getUnwrapEthCallData = ({
  value,
  to,
}: {
  value: bigint;
  to: Address;
}): ICallData[] => [
  {
    call: encodeFunctionData({
      abi: ladleAbi,
      functionName: 'exitEther',
      args: [to],
    }),
    ignoreIf: value <= BigInt(0),
  },
];
