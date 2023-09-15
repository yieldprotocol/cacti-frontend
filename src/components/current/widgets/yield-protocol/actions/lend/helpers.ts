import { encodeFunctionData } from 'viem';
import { Address } from 'wagmi';
import { getContract } from 'wagmi/actions';
import ladleAbi from '../../contracts/abis/Ladle';
import poolAbi from '../../contracts/abis/Pool';
import { ICallData, getSendParams, getWrapEthCallData } from '../../helpers';

interface LendProps {
  account: Address | undefined;
  input: bigint;
  poolAddress: Address;
  baseAddress: Address;
  isEthBase: boolean;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to lend
 * @param account
 * @param input
 * @param poolAddress
 * @param baseAddress
 * @param isEthBase
 * @param signer
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _lend = ({
  account,
  input,
  poolAddress,
  baseAddress,
  isEthBase,
  chainId,
}: LendProps): ICallData[] | undefined => {
  const poolContract = getContract({
    address: poolAddress,
    abi: poolAbi,
  });

  return [
    ...getWrapEthCallData({
      to: poolAddress,
      value: isEthBase ? input : BigInt(0),
      chainId,
    }), // wrap eth to the pool if required
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'transfer',
        args: [baseAddress, poolAddress, input],
      }),
      ignoreIf: isEthBase,
    },
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'route',
        args: [
          poolAddress,
          encodeFunctionData({
            abi: poolAbi,
            functionName: 'sellBase',
            args: [account!, BigInt(0)],
          }),
        ],
      }),
      ignoreIf: false,
    },
  ];
};

/**
 * Returns the send params for lending
 */
const lend = async ({
  account,
  input,
  poolAddress,
  baseAddress,
  isEthBase,
  chainId,
}: LendProps) => {
  const lendCallData = _lend({
    account,
    input,
    poolAddress,
    baseAddress,
    isEthBase,
    chainId,
  });
  return lendCallData
    ? getSendParams({ account: account!, calls: lendCallData, chainId })
    : undefined;
};

export default lend;
