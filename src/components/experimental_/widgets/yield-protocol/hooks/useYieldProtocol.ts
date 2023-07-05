import { useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, PayableOverrides } from 'ethers';
import { Address, useAccount } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import borrowHelper from '../actions/borrow/helpers';
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
      if (!signer) {
        console.error('Signer not found');
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
        signer,
        chainId,
        maxAmountToBorrow,
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

  return { lend, borrow };
};

export default useYieldProtocol;
