import { encodeFunctionData } from 'viem';
import { Address } from 'wagmi';
import ladleAbi from '../../contracts/abis/Ladle';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData, getWrapEthCallData } from '../../helpers';

interface BorrowProps {
  account: Address;
  borrowAmount: bigint;
  collateralAmount: bigint;
  seriesEntityId: `0x${string}`;
  ilkId: `0x${string}`;
  vaultId: `0x${string}` | undefined; // can be undefined if no vault is already built
  borrowTokenIsEth: boolean;
  collateralTokenIsEth: boolean;
  chainId: number;
  maxAmountToBorrow: bigint;
}
const BLANK_VAULT = '0x000000000000000000000000';

/**
 * Returns the calldata needed for the batch transaction to borrow
 * @param account
 * @param borrowAmount
 * @param collateralAmount
 * @param seriesEntityId
 * @param ilkId
 * @param vaultId
 * @param borrowTokenIsEth
 * @param collateralTokenIsEth
 * @param chainId
 * @param maxAmountToBorrow
 *
 * @returns {ICallData[] | undefined}
 */
const _borrow = ({
  account,
  borrowAmount,
  collateralAmount,
  seriesEntityId,
  ilkId,
  vaultId,
  borrowTokenIsEth,
  collateralTokenIsEth,
  chainId,
  maxAmountToBorrow,
}: BorrowProps): ICallData[] | undefined => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }

  /* if ETH is being borrowed, send the borrowed tokens (WETH) to ladle for unwrapping */
  const serveToAddress = borrowTokenIsEth ? ladleAddress : account; // TODO handle unwrapping WETH cuz this is going to send borrowed eth to the ladle which is fubar

  return [
    ...getWrapEthCallData({
      value: collateralTokenIsEth ? collateralAmount : BigInt(0),
      chainId,
    }),

    /* If vault is null, build a new vault, else ignore */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'build',
        args: [seriesEntityId, ilkId, 0],
      }),
      ignoreIf: !!vaultId, // Don't need to build a vault if it's already built
    },

    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'serve',
        args: [
          vaultId ?? BLANK_VAULT,
          serveToAddress,
          collateralAmount,
          borrowAmount,
          maxAmountToBorrow,
        ],
      }),
    },
    ...getUnwrapEthCallData({
      to: account,
      value: borrowTokenIsEth ? borrowAmount : BigInt(0),
    }),
  ];
};

/**
 * Returns the send params for borrowing
 */
const borrow = async ({
  account,
  borrowAmount,
  collateralAmount,
  seriesEntityId,
  ilkId,
  vaultId,
  borrowTokenIsEth,
  collateralTokenIsEth,
  chainId,
  maxAmountToBorrow,
}: BorrowProps) => {
  const borrowCallData = _borrow({
    account,
    borrowAmount,
    collateralAmount,
    seriesEntityId,
    ilkId,
    vaultId,
    borrowTokenIsEth,
    collateralTokenIsEth,
    chainId,
    maxAmountToBorrow,
  });
  return borrowCallData ? getSendParams({ account, calls: borrowCallData, chainId }) : undefined;
};

export default borrow;
