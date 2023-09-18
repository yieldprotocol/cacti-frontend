import { useCallback } from 'react';
import { Address, useAccount } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import borrowCloseHelper from '../actions/borrow-close/helpers';
import borrowHelper from '../actions/borrow/helpers';
import lendCloseHelper from '../actions/lend-close/helpers';
import lendHelper from '../actions/lend/helpers';
import { YieldVault } from './useVault';

const useYieldProtocol = () => {
  const chainId = useChainId();
  const signer = useSigner();
  const { address: account } = useAccount();

  const borrow = useCallback(
    async ({
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

      return await borrowHelper({
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
    async ({
      tokenInAddress,
      amount,
      poolAddress,
      isEthBase,
    }: {
      tokenInAddress: Address;
      amount: bigint;
      poolAddress: Address;
      isEthBase: boolean;
    }) =>
      await lendHelper({
        account,
        input: amount,
        poolAddress,
        baseAddress: tokenInAddress,
        isEthBase,
        chainId,
      }),
    [account, chainId]
  );

  const lendClose = useCallback(
    async ({
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
      seriesEntityId: string;
      seriesEntityIsMature: boolean;
      isEthBase: boolean;
    }) =>
      await lendCloseHelper({
        account,
        fyTokenAmount,
        fyTokenAddress,
        poolAddress,
        seriesEntityId,
        seriesEntityIsMature,
        isEthBase,
        chainId,
      }),
    [account, chainId]
  );

  return { lend, borrow, lendClose, borrowClose };
};

export default useYieldProtocol;
