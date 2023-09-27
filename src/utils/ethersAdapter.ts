import * as React from 'react';
import { type WalletClient } from '@wagmi/core';
import { UnsignedTransaction, providers } from 'ethers';
import { TransactionRequestBase } from 'viem';
import { type PublicClient, usePublicClient, useWalletClient } from 'wagmi';

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new providers.JsonRpcProvider(transport.transports[0].value, network); // TODO figure out a better way to handle
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}

export const unsignedTxToTxRequestBase = (
  unsignedTx: UnsignedTransaction,
  from: `0x${string}`
): TransactionRequestBase => {
  return {
    data: unsignedTx.data as `0x${string}`,
    from,
    gas: BigInt(unsignedTx.gasLimit!.toString()),
    nonce: unsignedTx.nonce,
    to: unsignedTx.to as `0x${string}`,
    value: BigInt(unsignedTx.value!.toString()),
  };
};
