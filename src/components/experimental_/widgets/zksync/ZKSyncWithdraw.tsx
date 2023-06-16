import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { goerli, mainnet, zkSync as zkSyncMain, zkSyncTestnet } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import { HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { cleanValue, findTokenBySymbol } from '../../../../utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import ZKSyncActionResponse from './ZKSyncActionResponse';

export const L1_FEE_ESTIMATION_COEF_NUMERATOR = BigNumber.from(12);
export const L1_FEE_ESTIMATION_COEF_DENOMINATOR = BigNumber.from(10);

interface ZKSyncProps {
  tokenSymbol: string;
  userAmount: string;
}

export enum ZKSyncWithdrawalState {
  SWITCH_WALLET_TO_L2,
  REQUEST_CONFIRM_L2_TX,
  WAIT_FOR_L2_CONFIRMATION,
  SWITCH_WALLET_TO_L1,
  REQUEST_CONFIRM_L1_TX,
  WAIT_FOR_LI_FINALIZATION,
  DONE,
}

const stateToLabel = {
  [ZKSyncWithdrawalState.SWITCH_WALLET_TO_L2]: (env: string) => {
    if (env === 'production') {
      return 'Switch wallet network to zkSync Mainnet';
    } else {
      return 'Switch wallet network to zkSync Testnet';
    }
  },
  [ZKSyncWithdrawalState.REQUEST_CONFIRM_L2_TX]: 'Confirm transaction in your wallet',
  [ZKSyncWithdrawalState.WAIT_FOR_L2_CONFIRMATION]:
    'Waiting for withrawal to be processed... (can take a few hours)',
  [ZKSyncWithdrawalState.SWITCH_WALLET_TO_L1]: (env: string) => {
    if (env === 'production') {
      return 'Switch wallet network to Ethereum Mainnet to finalize withdrawal';
    } else {
      return 'Switch wallet network to Goerli to finalize withdrawal';
    }
  },
  [ZKSyncWithdrawalState.REQUEST_CONFIRM_L1_TX]: 'Confirm transaction in your wallet',
  [ZKSyncWithdrawalState.WAIT_FOR_LI_FINALIZATION]:
    'Withdrawal is waiting to be finalized on L1... (can take a few hours)',
  [ZKSyncWithdrawalState.DONE]: 'Withdrawal successful',
};

// Implementation based on example in doc: https://era.zksync.io/docs/dev/how-to/send-message-l2-l1.html#example
const ZKSyncWithdraw = ({ tokenSymbol, userAmount }: ZKSyncProps) => {
  const defaultLabel = `Withdraw ${userAmount} ${tokenSymbol.toUpperCase()} from zkSync`;
  const [label, setLabel] = useState(defaultLabel);
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

      // --- Step 1: Check and request user to change wallet network to zkSync depending on env --- //
      let tokenProfile;
      let zkSyncJsonRpcProvider;
      let l1ChainId;
      if (process.env.NODE_ENV === 'production') {
        if (chain?.id !== zkSyncMain.id) {
          await switchNetworkAsync?.(zkSyncMain.id);
        }
        l1ChainId = mainnet.id;

        tokenProfile = findTokenBySymbol(tokenSymbol, zkSyncMain.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncMain.rpcUrls.default.http[0]);
      } else {
        if (chain?.id !== zkSyncTestnet.id) {
          await switchNetworkAsync?.(zkSyncTestnet.id);
        }
        l1ChainId = goerli.id;
        tokenProfile = findTokenBySymbol(tokenSymbol, isETH ? mainnet.id : zkSyncTestnet.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncTestnet.rpcUrls.default.http[0]);
      }
      setLabel(stateToLabel[ZKSyncWithdrawalState.SWITCH_WALLET_TO_L2](process.env.NODE_ENV));

      if (!tokenProfile) {
        throw new Error(`Token ${tokenSymbol} not supported`);
      }

      // --- Step 2: Initiate withdraw from zksync --- //

      const zkSyncWalletProvider = new zksync.Web3Provider(browserWallet);
      const zkSyncSigner = zkSyncWalletProvider.getSigner();
      const inputCleaned = cleanValue(userAmount.toString(), tokenProfile?.decimals);
      const bridgeAmount = parseUnits(inputCleaned!, tokenProfile?.decimals);

      let bridgeAddress;
      if (!isETH) {
        const bridges = await zkSyncJsonRpcProvider.getDefaultBridgeAddresses();
        bridgeAddress = bridges.erc20L2;
      }

      setLabel(stateToLabel[ZKSyncWithdrawalState.REQUEST_CONFIRM_L2_TX]);

      const withdrawHandle = await zkSyncSigner.withdraw({
        to: await zkSyncSigner.getAddress(),
        token: isETH ? zksync.utils.ETH_ADDRESS : (tokenProfile?.address as `0x${string}`),
        amount: bridgeAmount,
        bridgeAddress,
      });
      setTxHash(withdrawHandle.hash);

      setLabel(stateToLabel[ZKSyncWithdrawalState.WAIT_FOR_L2_CONFIRMATION]);

      // TODO: Currently this takes hours to process, needs some kind of UI/UX to better inform the user and possible call finalizeWithdrawal in the BE as a background job
      await withdrawHandle.waitFinalize();

      // --- Step 3: Switch wallet network to L1 to finalize tx --- //

      setLabel(stateToLabel[ZKSyncWithdrawalState.SWITCH_WALLET_TO_L1](process.env.NODE_ENV));

      await switchNetworkAsync?.(l1ChainId);

      // --- Step 4: Finalize tx on L1 --- //

      const ethersWalletProvider = new ethers.providers.Web3Provider(browserWallet);
      const zkSyncL1Signer = zksync.L1Signer.from(
        ethersWalletProvider.getSigner(),
        zkSyncJsonRpcProvider
      );

      setLabel(stateToLabel[ZKSyncWithdrawalState.REQUEST_CONFIRM_L1_TX]);

      // More info on the withdrawal delay: https://era.zksync.io/docs/reference/concepts/bridging/bridging-asset.html#withdrawals-to-l1
      const finalizeTx = await zkSyncL1Signer.finalizeWithdrawal(withdrawHandle.hash);

      setLabel(stateToLabel[ZKSyncWithdrawalState.WAIT_FOR_LI_FINALIZATION]);

      await finalizeTx.wait();

      setLabel(stateToLabel[ZKSyncWithdrawalState.DONE]);

      setIsSuccess(true);
    } catch (e: any) {
      setLabel(defaultLabel);
      console.log(e);
      setError(e.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={defaultLabel} projectName="zkSync" />
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
  );
};

export default ZKSyncWithdraw;
