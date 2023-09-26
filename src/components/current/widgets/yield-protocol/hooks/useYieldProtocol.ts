import { useCallback } from 'react';
import { Address, useAccount } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import borrowCloseHelper from '../actions/borrow-close/helpers';
import borrowHelper from '../actions/borrow/helpers';
import lendCloseHelper from '../actions/lend-close/helpers';
import lendHelper from '../actions/lend/helpers';
import { YieldVault } from './useVault';

const useYieldProtocol = () => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const borrow = useCallback(
    ({
      borrowAmount,
      collateralAmount,
      seriesEntityId,
      ilkId,
      borrowTokenIsEth,
      collateralTokenIsEth,
      maxAmountToBorrow,
    }: {
      borrowAmount: bigint;
      collateralAmount: bigint;
      seriesEntityId: `0x${string}`;
      ilkId: `0x${string}`;
      borrowTokenIsEth: boolean;
      collateralTokenIsEth: boolean;
      maxAmountToBorrow: bigint;
    }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }

      return borrowHelper({
        account,
        borrowAmount,
        collateralAmount,
        seriesEntityId,
        ilkId,
        vaultId: undefined,
        borrowTokenIsEth,
        collateralTokenIsEth,
        chainId,
        maxAmountToBorrow,
      });
    },
    [account, chainId]
  );

  const borrowClose = useCallback(
    ({ vault }: { vault: YieldVault }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }

      return borrowCloseHelper({
        account,
        vault,
        chainId,
      });
    },
    [account, chainId]
  );

  const lend = useCallback(
    ({
      tokenInAddress,
      amount,
      poolAddress,
      isEthBase,
    }: {
      tokenInAddress: Address;
      amount: bigint;
      poolAddress: Address;
      isEthBase: boolean;
    }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }
      return lendHelper({
        account,
        input: amount,
        poolAddress,
        baseAddress: tokenInAddress,
        isEthBase,
        chainId,
      });
    },
    [account, chainId]
  );

  const lendClose = useCallback(
    ({
      fyTokenAmount,
      fyTokenAddress,
      poolAddress,
      seriesEntityId,
      seriesEntityIsMature,
      isEthBase,
    }: {
      fyTokenAmount: bigint;
      fyTokenAddress: Address;
      poolAddress: Address;
      seriesEntityId: `0x${string}`;
      seriesEntityIsMature: boolean;
      isEthBase: boolean;
    }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }

      return lendCloseHelper({
        account,
        fyTokenAmount,
        fyTokenAddress,
        poolAddress,
        seriesEntityId,
        seriesEntityIsMature,
        isEthBase,
        chainId,
      });
    },
    [account, chainId]
  );

  return { lend, borrow, lendClose, borrowClose };
};

export default useYieldProtocol;
