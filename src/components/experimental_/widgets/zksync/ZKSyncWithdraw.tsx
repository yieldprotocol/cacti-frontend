import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useChainId, useNetwork, useSwitchNetwork } from 'wagmi';
import { goerli, mainnet, zkSync, zkSync as zkSyncMain, zkSyncTestnet } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import { HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { cleanValue, findTokenBySymbol } from '../../../../utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import ZKSyncActionResponse from './ZKActionResponse';

export const L1_FEE_ESTIMATION_COEF_NUMERATOR = BigNumber.from(12);
export const L1_FEE_ESTIMATION_COEF_DENOMINATOR = BigNumber.from(10);

interface ZKSyncProps {
  tokenSymbol: string;
  userAmount: string;
}

// Implementation based on example in doc: https://era.zksync.io/docs/reference/concepts/bridging/bridging-asset.html#deposits-to-l2
const ZKSyncWithdraw = ({ tokenSymbol, userAmount }: ZKSyncProps) => {
  const [label, setLabel] = useState(
    `Withdraw ${userAmount} ${tokenSymbol.toUpperCase()} from zkSync`
  );
  const [txHash, setTxHash] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();

  const handleZKSyncWithdraw = async () => {
    try {
      setDisabled(true);
      const isETH = tokenSymbol.toUpperCase() === 'ETH';
      const browserWallet = window.ethereum as ethers.providers.ExternalProvider;

      let bridgeToken;
      if (process.env.NODE_ENV === 'production') {
        if (chain?.id !== zkSyncMain.id) {
          await switchNetworkAsync?.(zkSyncMain.id);
        }
        bridgeToken = findTokenBySymbol(tokenSymbol, zkSyncMain.id);
      } else {
        if (chain?.id !== zkSyncTestnet.id) {
          await switchNetworkAsync?.(zkSyncTestnet.id);
        }
        bridgeToken = findTokenBySymbol(tokenSymbol, isETH ? 1 : zkSyncTestnet.id);
      }

      console.log('bridgeToken', bridgeToken);

      if (!bridgeToken) {
        throw new Error(`Token ${tokenSymbol} not supported`);
      }

      const zkSyncProvider = new zksync.Web3Provider(browserWallet);

      const zkSyncSigner = zkSyncProvider.getSigner();

      const inputCleaned = cleanValue(userAmount.toString(), bridgeToken?.decimals);
      const bridgeAmount = parseUnits(inputCleaned!, bridgeToken?.decimals);

      const withdrawHandle = await zkSyncSigner.withdraw({
        to: await zkSyncSigner.getAddress(),
        token: isETH ? zksync.utils.ETH_ADDRESS : (bridgeToken?.address as `0x${string}`),
        amount: bridgeAmount,
      });

      setLabel(`Withraw transaction sent to zkSync.`);
      setTxHash(withdrawHandle.hash);
      setLabel(`Waiting for withdraw to be processed... (can take a few minutes)`);
      await withdrawHandle.wait();

      // More info on the withdrawal delay: https://era.zksync.io/docs/reference/troubleshooting/withdrawal-delay.html
      setLabel(
        `Withdrawal has been processed and will need to be finalized on L1 which can take upto 24 hours`
      );

      setIsSuccess(true);
    } catch (e: any) {
      setLabel(`Error: ${e.message}`);
      setError(e.message);
    }
  };

  return (
    <>
      <ConnectFirst>
        <SingleLineResponse tokenSymbol={tokenSymbol} value={userAmount} />
        <ZKSyncActionResponse
          label={label}
          onClick={() => handleZKSyncWithdraw()}
          isSuccess={isSuccess}
          error={error}
          txHash={txHash}
          disabled={disabled}
        />
      </ConnectFirst>
    </>
  );
};

export default ZKSyncWithdraw;
