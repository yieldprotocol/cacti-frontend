import { BigNumber, Signer, ethers } from 'ethers';
import { Address } from 'wagmi';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData, getWrapEthCallData } from '../../helpers';
import { Vault } from '../../hooks/useVault';
import { LadleActions } from '../../operations';

export const WETH = '0x303000000000';

interface BorrowCloseProps {
  account: Address;
  vault: Vault;
  signer: Signer;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to close a vault (close borrow position)
 * @param account
 * @param vault
 * @param signer
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _borrowClose = ({
  account,
  vault,
  signer,
  chainId,
}: BorrowCloseProps): ICallData[] | undefined => {
  const {
    id: vaultId,
    ink: collateralAmount,
    ink: debtAmount,
    baseId,
    baseAddress,
    ilkId,
    art,
    accruedArt,
    seriesEntity: { isMature, maxBaseIn },
    associatedJoinAddress,
  } = vault;
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }
  const cauldronAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.CAULDRON);
  if (!cauldronAddress) {
    console.error('Cauldron address not found; possibly on an unsupported chain');
    return undefined;
  }

  const amountToTransfer = isMature ? debtAmount.mul(10001).div(10000) : art; // After maturity + 0.1% for increases during tx time

  const tradeIsPossible = debtAmount.gt(maxBaseIn);

  const borrowTokenIsEth = baseId === WETH;
  const collateralTokenIsEth = ilkId === WETH;
  const removeCollateralToAddress = collateralTokenIsEth ? ladleAddress : account;

  return [
    ...(borrowTokenIsEth
      ? getWrapEthCallData({
          value: amountToTransfer,
          to: isMature ? ladleAddress : associatedJoinAddress,
          signer,
          chainId,
        })
      : []),

    {
      operation: LadleActions.Fn.TRANSFER,
      args: [baseAddress, associatedJoinAddress, amountToTransfer] as LadleActions.Args.TRANSFER,
      ignoreIf: borrowTokenIsEth,
    },

    /* BEFORE MATURITY */
    {
      operation: LadleActions.Fn.REPAY_VAULT,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        debtAmount,
      ] as LadleActions.Args.REPAY_VAULT,
      ignoreIf: isMature || !tradeIsPossible,
    },

    /* edge case in pool low liquidity situations wheere the repay amount is greater than the max base into the pool (debt is repaid at 1:1 with fyToken, so there's a penalty) */
    {
      operation: LadleActions.Fn.CLOSE,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        debtAmount.mul(-1),
      ] as LadleActions.Args.CLOSE,
      ignoreIf: isMature || tradeIsPossible,
    },

    /* AFTER MATURITY */
    {
      operation: LadleActions.Fn.CLOSE,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        BigNumber.from(debtAmount).mul(-1),
      ] as LadleActions.Args.CLOSE,
      ignoreIf: !isMature || tradeIsPossible,
    },

    ...getUnwrapEthCallData({
      to: account,
      value: collateralTokenIsEth ? collateralAmount : ethers.constants.Zero,
    }),
  ];
};

/**
 * Returns the send params for closing a borrow position
 */
const borrowClose = async ({ account, vault, signer, chainId }: BorrowCloseProps) => {
  const calls = _borrowClose({
    account,
    vault,
    signer,
    chainId,
  });
  return calls ? await getSendParams({ calls, signer, chainId }) : undefined;
};

export default borrowClose;
