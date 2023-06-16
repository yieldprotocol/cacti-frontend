import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { goerli, mainnet, zkSync, zkSync as zkSyncMain, zkSyncTestnet } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import { HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { cleanValue, findTokenBySymbol } from '../../../../utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import ZKSyncActionResponse from './ZKActionResponse';
import handleZkSyncTx from './zksync-utils';

export const L1_FEE_ESTIMATION_COEF_NUMERATOR = BigNumber.from(12);
export const L1_FEE_ESTIMATION_COEF_DENOMINATOR = BigNumber.from(10);

interface ZKSyncProps {
  tokenSymbol: string;
  userAmount: string;
}

const ZKSyncDeposit = ({ tokenSymbol, userAmount }: ZKSyncProps) => {
  const [label, setLabel] = useState(`Bridge ${userAmount} ${tokenSymbol.toUpperCase()} to zkSync`);
  const [txHash, setTxHash] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleZKSyncDeposit = async () => {
    try {
      setDisabled(true);
      const isETH = tokenSymbol.toUpperCase() === 'ETH';
      const browserWallet = window.ethereum as ethers.providers.ExternalProvider;
      const browserWalletProvider = new ethers.providers.Web3Provider(browserWallet);

      let bridgeToken;
      let zkSyncProvider;
      if (process.env.NODE_ENV === 'production') {
        bridgeToken = findTokenBySymbol(tokenSymbol, 1);
        zkSyncProvider = new zksync.Provider(zkSyncMain.rpcUrls.default.http[0]);
      } else {
        bridgeToken = findTokenBySymbol(tokenSymbol, isETH ? 1 : goerli.id);
        zkSyncProvider = new zksync.Provider(zkSyncTestnet.rpcUrls.default.http[0]);
      }

      const ethSigner = browserWalletProvider.getSigner();
      const zkSyncSigner = zksync.L1Signer.from(ethSigner, zkSyncProvider);

      const inputCleaned = cleanValue(userAmount.toString(), bridgeToken?.decimals);
      const bridgeAmount = parseUnits(inputCleaned!, bridgeToken?.decimals);

      const depositHandle = await zkSyncSigner.deposit({
        to: await browserWalletProvider.getSigner().getAddress(),
        token: isETH ? zksync.utils.ETH_ADDRESS : (bridgeToken?.address as `0x${string}`),
        amount: bridgeAmount,
        approveERC20: isETH ? false : true,
      });

      setLabel(`Deposit transaction sent to zkSync.`);
      setTxHash(depositHandle.hash);
      setLabel(`Waiting for deposit to be processed in L2... (can take a few minutes))`);
      await depositHandle.wait();
      setLabel(`${tokenSymbol.toUpperCase()} available in L2`);
      setIsSuccess(true);
    } catch (e: any) {
      setLabel(`Error: ${e.message}`);
      setError(e.message);
    }
  };

  return (
    <>
      <ConnectFirst>
        <HeaderResponse text="Bridge to zkSync" />
        <SingleLineResponse tokenSymbol={tokenSymbol} value={userAmount} />
        <ZKSyncActionResponse
          label={label}
          onClick={() => handleZKSyncDeposit()}
          isSuccess={isSuccess}
          error={error}
          txHash={txHash}
          disabled={disabled}
        />
      </ConnectFirst>
    </>
  );
};

export default ZKSyncDeposit;
