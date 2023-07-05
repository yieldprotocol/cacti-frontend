import { useCallback, useState } from 'react';
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

export enum ZKSyncDepositState {
  SWITCH_WALLET_TO_L1,
  CONFIRM_L1_TX,
  WAIT_FOR_L2_INCLUSION,
  DONE,
}

const stateToLabel = {
  [ZKSyncDepositState.SWITCH_WALLET_TO_L1]: (env: string) => {
    if (env === 'production') {
      return 'Switch wallet network to Ethereum Mainnet';
    } else {
      return 'Switch wallet network to Goerli';
    }
  },
  [ZKSyncDepositState.CONFIRM_L1_TX]: 'Confirm transaction in your wallet',
  [ZKSyncDepositState.WAIT_FOR_L2_INCLUSION]:
    'Waiting for deposit to be included in zkSync... (can take a few minutes)',
  [ZKSyncDepositState.DONE]: 'Deposit successful',
};

// Implementation based on example in doc: https://era.zksync.io/docs/reference/concepts/bridging/bridging-asset.html#deposits-to-l2
const ZKSyncDeposit = ({ tokenSymbol, userAmount }: ZKSyncProps) => {
  const defaultLabel = `Bridge ${userAmount} ${tokenSymbol.toUpperCase()} to zkSync`;

  const [label, setLabel] = useState(defaultLabel);
  const [txHash, setTxHash] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();

  const handleZKSyncDeposit = useCallback(async () => {
    try {
      setDisabled(true);
      const isETH = tokenSymbol.toUpperCase() === 'ETH';
      const browserWallet = window.ethereum as ethers.providers.ExternalProvider;

      let bridgeToken;
      let zkSyncJsonRpcProvider;

      // --- Step 1: Check and request user to change wallet network to Goerli/Mainnet depending on env --- //
      if (process.env.NODE_ENV === 'production') {
        if (chain?.id !== mainnet.id) {
          await switchNetworkAsync?.(mainnet.id);
        }
        bridgeToken = findTokenBySymbol(tokenSymbol, mainnet.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncMain.rpcUrls.default.http[0]);
      } else {
        if (chain?.id !== goerli.id) {
          await switchNetworkAsync?.(goerli.id);
        }
        bridgeToken = findTokenBySymbol(tokenSymbol, isETH ? mainnet.id : goerli.id);
        zkSyncJsonRpcProvider = new zksync.Provider(zkSyncTestnet.rpcUrls.default.http[0]);
      }

      setLabel(stateToLabel[ZKSyncDepositState.SWITCH_WALLET_TO_L1](process.env.NODE_ENV));

      if (!bridgeToken) {
        throw new Error(`Token ${tokenSymbol} not supported`);
      }

      // --- Step 2: Initiate bridge to zkSync --- //

      const browserWalletProvider = new ethers.providers.Web3Provider(browserWallet);

      const ethSigner = browserWalletProvider.getSigner();
      const zkSyncSigner = zksync.L1Signer.from(ethSigner, zkSyncJsonRpcProvider);

      const inputCleaned = cleanValue(userAmount.toString(), bridgeToken?.decimals);
      const bridgeAmount = parseUnits(inputCleaned!, bridgeToken?.decimals);

      setLabel(stateToLabel[ZKSyncDepositState.CONFIRM_L1_TX]);

      const depositHandle = await zkSyncSigner.deposit({
        to: await ethSigner.getAddress(),
        token: isETH ? zksync.utils.ETH_ADDRESS : (bridgeToken?.address as `0x${string}`),
        amount: bridgeAmount,
        approveERC20: isETH ? false : true,
      });

      setLabel(stateToLabel[ZKSyncDepositState.WAIT_FOR_L2_INCLUSION]);

      setTxHash(depositHandle.hash);
      await depositHandle.wait();

      setLabel(stateToLabel[ZKSyncDepositState.DONE]);

      setIsSuccess(true);
    } catch (e: any) {
      setLabel(defaultLabel);
      setError(e.message);
    } finally {
      setDisabled(false);
    }
  }, [chain?.id, defaultLabel, switchNetworkAsync, tokenSymbol, userAmount]);

  return (
    <ConnectFirst>
      <HeaderResponse text={defaultLabel} projectName="zkSync" />
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
  );
};

export default ZKSyncDeposit;
