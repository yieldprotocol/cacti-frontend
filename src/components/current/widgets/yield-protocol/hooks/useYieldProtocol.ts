import { useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, PayableOverrides } from 'ethers';
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
      if (!signer) {
        console.error('Signer not found');
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
    [account, chainId, signer]
  );

  const borrowClose = useCallback(
    ({ vault }: { vault: YieldVault }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      return borrowCloseHelper({
        account,
        vault,
        chainId,
      });
    },
    [account, chainId, signer]
  );

  const lend = useCallback(
    async ({
      tokenInAddress,
      amount,
      poolAddress,
      isEthBase,
    }: {
      tokenInAddress: Address;
      amount: BigNumber;
      poolAddress: Address;
      isEthBase: boolean;
    }) => {
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      return await lendHelper({
        account,
        input: amount,
        poolAddress,
        baseAddress: tokenInAddress,
        isEthBase,
        signer,
        chainId,
      });
    },
    [account, chainId, signer]
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
      fyTokenAmount: BigNumber;
      fyTokenAddress: Address;
      poolAddress: Address;
      seriesEntityId: string;
      seriesEntityIsMature: boolean;
      isEthBase: boolean;
    }) => {
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      return await lendCloseHelper({
        account,
        fyTokenAmount,
        fyTokenAddress,
        poolAddress,
        seriesEntityId,
        seriesEntityIsMature,
        isEthBase,
        signer,
        chainId,
      });
    },
    [account, chainId, signer]
  );

  return { lend, borrow, lendClose, borrowClose };
};

export default useYieldProtocol;
