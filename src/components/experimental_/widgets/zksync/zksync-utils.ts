import { useCallback, useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { zkSync as zkSyncMain, zkSyncTestnet } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import useToken from '../../../../hooks/useToken';
import { cleanValue, findTokenBySymbol } from '../../../../utils';

export const L1_FEE_ESTIMATION_COEF_NUMERATOR = BigNumber.from(12);
export const L1_FEE_ESTIMATION_COEF_DENOMINATOR = BigNumber.from(10);

const getZKSyncTx = async (token: string, userAmount: string) => {
  try {
    const browserWallet = window.ethereum as ethers.providers.ExternalProvider;

    const ethProvider = new ethers.providers.Web3Provider(browserWallet);
    const network = await ethProvider.getNetwork();
    const bridgeToken = findTokenBySymbol(token, network.chainId);

    const ethSigner = ethProvider.getSigner();

    // TODO: Based on dev or prod env, choose the correct zksync RPC
    const zkSyncProvider = new zksync.Provider(
      network.chainId === 1
        ? zkSyncMain.rpcUrls.default.http[0]
        : zkSyncTestnet.rpcUrls.default.http[0]
    );

    const zkSyncSigner = zksync.L1Signer.from(ethSigner, zkSyncProvider);

    const inputCleaned = cleanValue(userAmount.toString(), bridgeToken?.decimals);
    const bridgeAmount = parseUnits(inputCleaned!, bridgeToken?.decimals);

    const zkTxParams = await zkSyncSigner.getDepositTx({
      to: await ethSigner.getAddress(),
      token:
        token.toUpperCase() === 'ETH'
          ? zksync.utils.ETH_ADDRESS
          : (bridgeToken?.address as `0x${string}`),
      amount: bridgeAmount,
    });

    const tx = await zkSyncSigner.getRequestExecuteTx(zkTxParams);

    console.log('tx', tx);

    const bridgeContracts = await zkSyncSigner.getL1BridgeContracts();
    const approval = {
      tokenAddress: bridgeToken?.address as `0x${string}`,
      approvalAmount: bridgeAmount,
      spender: bridgeContracts.erc20.address as `0x${string}`,
    };
    return { tx, approval };
  } catch (e) {
    console.error('ZKSync Error', e);
    return { tx: undefined, approval: undefined };
  }
};

export default getZKSyncTx;
