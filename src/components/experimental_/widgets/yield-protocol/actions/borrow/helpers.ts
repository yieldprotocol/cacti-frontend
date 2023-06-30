import { BigNumber, Signer, ethers } from 'ethers';
import { Address } from 'wagmi';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getWrapEthCallData } from '../../helpers';
import { LadleActions } from '../../operations';

interface BorrowProps {
  account: Address | undefined;
  borrowAmount: BigNumber;
  collateralAmount: BigNumber;
  seriesEntityId: string;
  ilkId: string;
  vaultId: string | undefined; // can be undefined if no vault is already built
  borrowTokenIsEth: boolean;
  collateralTokenIsEth: boolean;
  signer: Signer;
  chainId: number;
}

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
 * @param signer
 * @param chainId
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
  signer,
  chainId,
}: BorrowProps): ICallData[] | undefined => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }

  /* if ETH is being borrowed, send the borrowed tokens (WETH) to ladle for unwrapping */
  const serveToAddress = borrowTokenIsEth ? ladleAddress : account; // TODO handle unwrapping WETH cuz this is going to send borrowed eth to the ladle which is fubar

  return [
    ...getWrapEthCallData(
      ladleAddress,
      collateralTokenIsEth ? collateralAmount : ethers.constants.Zero,
      signer,
      chainId
    ),

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
    // ...getUnwrapEthCallData(ladleAddress, isEthBase ? borrowAmount : ethers.constants.Zero),
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
  signer,
  chainId,
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
    signer,
    chainId,
  });
  return borrowCallData ? await getSendParams(borrowCallData, signer, chainId) : undefined;
};

export default borrow;
