import { useCallback, useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { zkSyncTestnet } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import useToken from '../../../../hooks/useToken';
import { cleanValue, findTokenBySymbol } from '../../../../utils';

export const L1_FEE_ESTIMATION_COEF_NUMERATOR = BigNumber.from(12);
export const L1_FEE_ESTIMATION_COEF_DENOMINATOR = BigNumber.from(10);

const getZKSyncTx = async (token: string, userAmount: string) => {
  try {
    const bridgeToken = findTokenBySymbol(token, 1);
    const browserWallet = window.ethereum as ethers.providers.ExternalProvider;

    const ethProvider = new ethers.providers.Web3Provider(browserWallet);
    const ethSigner = ethProvider.getSigner();

    const zkSyncProvider = new zksync.Provider(zkSyncTestnet.rpcUrls.default.http[0]);

    const zkSyncSigner = zksync.L1Signer.from(ethSigner, zkSyncProvider);

    const tokenProfile = findTokenBySymbol(token, 1);

    const inputCleaned = cleanValue(userAmount.toString(), tokenProfile?.decimals);
    const bridgeAmount = parseUnits(inputCleaned!, tokenProfile?.decimals);
    const tx = await zkSyncSigner.getDepositTx({
      to: await ethSigner.getAddress(),
      token,
      amount: bridgeAmount,
    });

    const baseGasLimit = await zkSyncSigner.estimateGasRequestExecute(tx);
    const gasLimit = scaleGasLimit(baseGasLimit);

    tx.overrides ??= {};
    tx.overrides.gasLimit ??= gasLimit;

    const bridgeContracts = await zkSyncSigner.getL1BridgeContracts();
    const approval = {
      tokenAddress: bridgeToken?.address as `0x${string}`,
      approvalAmount: bridgeAmount,
      spender: bridgeContracts.erc20.address as `0x${string}`,
    };
    return { tx, approval };
  } catch (e) {
    console.error(e);
    return { tx: undefined, approval: undefined };
  }
};

function scaleGasLimit(gasLimit: BigNumber): BigNumber {
  return gasLimit.mul(L1_FEE_ESTIMATION_COEF_NUMERATOR).div(L1_FEE_ESTIMATION_COEF_DENOMINATOR);
}

export default getZKSyncTx;
