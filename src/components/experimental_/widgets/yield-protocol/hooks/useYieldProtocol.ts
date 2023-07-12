import { useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, PayableOverrides } from 'ethers';
import { Address, useAccount } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import borrowCloseHelper from '../actions/borrow-close/helpers';
import borrowHelper from '../actions/borrow/helpers';
import lendCloseHelper from '../actions/lend-close/helpers';
import lendHelper from '../actions/lend/helpers';

export interface ICallData {
  args: (string | BigNumberish | boolean)[];
  operation: string;
  targetContract?: Contract;
  fnName?: string;
  ignoreIf?: boolean;
  overrides?: PayableOverrides;
}

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
      borrowAmount: BigNumber;
      collateralAmount: BigNumber;
      seriesEntityId: string;
      ilkId: string;
      borrowTokenIsEth: boolean;
      collateralTokenIsEth: boolean;
      maxAmountToBorrow: BigNumber;
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
        signer,
        chainId,
        maxAmountToBorrow,
      });
    },
    [account, chainId, signer]
  );

  const borrowClose = useCallback(
    async ({
      vaultId,
    }: {
      vaultId: `0x${string}`; // not an address, but a hex string
    }) => {
      if (!account) {
        console.error('Account not found');
        return undefined;
      }
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      return await borrowCloseHelper({
        account,
        vaultId,
        signer,
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
