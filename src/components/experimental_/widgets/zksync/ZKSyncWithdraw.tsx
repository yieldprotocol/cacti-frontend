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

// Implementation based on example in doc: https://era.zksync.io/docs/dev/how-to/send-message-l2-l1.html#example
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
      let zkSyncJsonRpcProvider;
      let l1ChainId;
      if (process.env.NODE_ENV === 'production') {
        if (chain?.id !== zkSyncMain.id) {
          await switchNetworkAsync?.(zkSyncMain.id);
        }
        l1ChainId = mainnet.id;

        bridgeToken = findTokenBySymbol(tokenSymbol, zkSyncMain.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncMain.rpcUrls.default.http[0]);
      } else {
        if (chain?.id !== zkSyncTestnet.id) {
          await switchNetworkAsync?.(zkSyncTestnet.id);
        }
        l1ChainId = goerli.id;
        bridgeToken = findTokenBySymbol(tokenSymbol, isETH ? mainnet.id : zkSyncTestnet.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncTestnet.rpcUrls.default.http[0]);
      }

      if (!bridgeToken) {
        throw new Error(`Token ${tokenSymbol} not supported`);
      }

      const zkSyncWalletProvider = new zksync.Web3Provider(browserWallet);

      const zkSyncSigner = zkSyncWalletProvider.getSigner();

      const inputCleaned = cleanValue(userAmount.toString(), bridgeToken?.decimals);
      const bridgeAmount = parseUnits(inputCleaned!, bridgeToken?.decimals);

      let bridgeAddress;
      if (!isETH) {
        const bridges = await zkSyncJsonRpcProvider.getDefaultBridgeAddresses();
        bridgeAddress = bridges.erc20L2;
      }

      setLabel('Processing withdrawal...');

      const withdrawHandle = await zkSyncSigner.withdraw({
        to: await zkSyncSigner.getAddress(),
        token: isETH ? zksync.utils.ETH_ADDRESS : (bridgeToken?.address as `0x${string}`),
        amount: bridgeAmount,
        bridgeAddress,
      });

      setLabel(`Withraw transaction sent to zkSync.`);
      setTxHash(withdrawHandle.hash);
      setLabel(`Waiting for withdraw to be processed... (can take a few minutes)`);
      const receipt = await withdrawHandle.waitFinalize();

      // More info on the withdrawal delay: https://era.zksync.io/docs/reference/concepts/bridging/bridging-asset.html#withdrawals-to-l1
      setLabel(`Withdrawal needs to be finalized on L1, switch wallet network to L1`);
      await switchNetworkAsync?.(l1ChainId);

      console.log('receipt', receipt);

      const ethersWalletProvider = new ethers.providers.Web3Provider(browserWallet);
      const zkSyncL1Signer = zksync.L1Signer.from(
        ethersWalletProvider.getSigner(),
        zkSyncJsonRpcProvider
      );

      //await zkSyncL1Signer.finalizeWithdrawal(withdrawHandle.hash, receipt.);

      // More info on the withdrawal delay: https://era.zksync.io/docs/reference/concepts/bridging/bridging-asset.html#withdrawals-to-l1
      setLabel(`Withdrawal is waiting to be finalized on L1... (can take upto 24 hours)`);

      setIsSuccess(true);
    } catch (e: any) {
      console.log(e);
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
