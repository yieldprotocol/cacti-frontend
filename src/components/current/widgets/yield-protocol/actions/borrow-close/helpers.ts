import { encodeFunctionData } from 'viem';
import { Address } from 'wagmi';
import ladleAbi from '../../contracts/abis/Ladle';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData, getWrapEthCallData } from '../../helpers';
import { YieldVault } from '../../hooks/useVault';

export const WETH = '0x303000000000';

interface BorrowCloseProps {
  account: Address;
  vault: YieldVault | undefined;
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
const _borrowClose = ({ account, vault, chainId }: BorrowCloseProps): ICallData[] | undefined => {
  const {
    id: vaultId,
    ink: collateralAmount,
    accruedArt: debtAmount,
    baseId,
    baseAddress,
    ilkId,
    seriesEntity,
    associatedJoinAddress,
    poolAddress,
  } = vault || {};

  const isMature = seriesEntity?.isMature;
  const maxBaseIn = seriesEntity?.maxBaseIn;

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

  if (!debtAmount) {
    console.error('debtAmount not found');
    return undefined;
  }

  const amountToTransfer = isMature ? (debtAmount * BigInt(10001)) / BigInt(10000) : debtAmount; // After maturity + 0.1% for increases during tx time

  if (!maxBaseIn) {
    console.error('maxBaseIn not found');
  }
  const tradeIsPossible = maxBaseIn ? debtAmount > maxBaseIn : true;

  const transferToAddress = !tradeIsPossible || isMature ? associatedJoinAddress : poolAddress;
  const borrowTokenIsEth = baseId === WETH;
  const collateralTokenIsEth = ilkId === WETH;
  const removeCollateralToAddress = collateralTokenIsEth ? ladleAddress : account;
  const collateralToRemove = (collateralAmount || BigInt(0)) * BigInt(-1);
  const debtToRepay = (debtAmount || BigInt(0)) * BigInt(-1);

  if (!amountToTransfer) {
    console.error('amountToTransfer not found');
    return undefined;
  }
  if (!collateralAmount) {
    console.error('collateralAmount not found');
    return undefined;
  }

  return [
    ...(borrowTokenIsEth
      ? getWrapEthCallData({
          value: amountToTransfer,
          to: isMature ? ladleAddress : transferToAddress,
          chainId,
        })
      : []),

    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'transfer',
        args: [baseAddress!, transferToAddress!, amountToTransfer],
      }),
      ignoreIf: borrowTokenIsEth,
    },

    /* BEFORE MATURITY */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'repayVault',
        args: [vaultId!, removeCollateralToAddress, collateralToRemove, debtToRepay],
      }),
      ignoreIf: isMature || !tradeIsPossible,
    },

    /* edge case in pool low liquidity situations where the repay amount is greater than the max base into the pool (debt is repaid at 1:1 with fyToken, so there's a penalty) */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'close',
        args: [vaultId!, removeCollateralToAddress, collateralToRemove, debtToRepay],
      }),
      ignoreIf: isMature || tradeIsPossible,
    },

    /* AFTER MATURITY */
    {
      call: encodeFunctionData({
        abi: ladleAbi,
        functionName: 'close',
        args: [vaultId!, removeCollateralToAddress, collateralToRemove, debtToRepay],
      }),
      ignoreIf: !isMature || !tradeIsPossible,
    },

    ...getUnwrapEthCallData({
      to: account,
      value: collateralTokenIsEth ? BigInt(1) : BigInt(0),
    }),
  ];
};

/**
 * Returns the send params for closing a borrow position
 */
const borrowClose = ({ account, vault, chainId }: BorrowCloseProps) => {
  const calls = _borrowClose({
    account,
    vault,
    chainId,
  });
  return calls ? getSendParams({ account, calls, chainId }) : undefined;
};

export default borrowClose;
