import { encodeFunctionData } from 'viem';
import { Address } from 'wagmi';
import ladleAbi from '../../contracts/abis/Ladle';
import poolAbi from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData } from '../../helpers';

interface LendCloseProps {
  account: Address;
  fyTokenAmount: bigint;
  fyTokenAddress: Address;
  poolAddress: Address;
  seriesEntityId: `0x${string}`;
  seriesEntityIsMature: boolean;
  isEthBase: boolean;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to lend
 * @param account
 * @param fyTokenAmount
 * @param fyTokenAddress
 * @param poolAddress
 * @param seriesEntityId
 * @param seriesEntityIsMature
 * @param isEthBase
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _lendClose = ({
  account,
  fyTokenAmount,
  fyTokenAddress,
  poolAddress,
  seriesEntityId,
  seriesEntityIsMature,
  isEthBase,
  chainId,
}: LendCloseProps): ICallData[] | undefined => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }

  // select destination based on if mature
  const transferToAddress = seriesEntityIsMature ? fyTokenAddress : poolAddress;
  const receiverAddress = isEthBase ? ladleAddress : account;
  const sellFYTokenEncoded = encodeFunctionData({
    abi: poolAbi,
    functionName: 'sellFYToken',
    args: [receiverAddress, BigInt(0)],
  });

  return [
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'transfer',
        args: [transferToAddress, transferToAddress, fyTokenAmount],
      }),
    },

    /* BEFORE MATURITY */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'route',
        args: [poolAddress, sellFYTokenEncoded],
      }),
      ignoreIf: seriesEntityIsMature,
    },
    /* AFTER MATURITY */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'redeem',
        args: [seriesEntityId, receiverAddress, fyTokenAmount],
      }),
      ignoreIf: !seriesEntityIsMature,
    },

    ...(isEthBase ? getUnwrapEthCallData({ value: BigInt(1), to: receiverAddress }) : []), // will unwrap all eth in the ladle, so value does not matter here (just has to be greater than 0)
  ];
};

/**
 * Returns the send params for closing a lend position (selling fyToken for base)
 */
const lendClose = ({
  account,
  fyTokenAmount,
  fyTokenAddress,
  poolAddress,
  seriesEntityId,
  seriesEntityIsMature,
  isEthBase,
  chainId,
}: LendCloseProps) => {
  const calls = _lendClose({
    account,
    fyTokenAmount,
    fyTokenAddress,
    poolAddress,
    seriesEntityId,
    seriesEntityIsMature,
    isEthBase,
    chainId,
  });
  return calls ? getSendParams({ calls, chainId, account }) : undefined;
};

export default lendClose;
