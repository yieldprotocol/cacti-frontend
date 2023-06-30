import { useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, PayableOverrides } from 'ethers';
import { Address, useAccount } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import { Token } from '@/types';
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
      borrowToken,
      collateralToken,
      borrowAmount,
      collateralAmount,
      seriesEntityId,
      borrowTokenIsEth,
      collateralTokenIsEth,
    }: {
      borrowToken: Token;
      collateralToken: Token;
      borrowAmount: BigNumber;
      collateralAmount: BigNumber;
      seriesEntityId: string;
      borrowTokenIsEth: boolean;
      collateralTokenIsEth: boolean;
    }) => {
      if (!signer) {
        console.error('Signer not found');
        return undefined;
      }

      // get the ilkId for the collateral token
      const ilkId = 'blah';

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
