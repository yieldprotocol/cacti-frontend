import { useCallback, useContext, useMemo, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import axios from 'axios';
import { ethers } from 'ethers';
import useSWRImmutable from 'swr/immutable';
import { useAccount, useBalance, useProvider } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';

type ForkTools = {
  forkTimestamp: number | undefined;
  forkStartBlock: number | string | undefined;
  createNewFork: () => Promise<string>;
  fillEther: () => Promise<void>;
  provider?: JsonRpcProvider;
  signer?: ethers.Signer;
};

const useForkTools = (id?: string): ForkTools => {
  /* Get the useForkSettings the settings context */
  const { settings } = useContext(SettingsContext);
  const { isForkedEnv, forkId } = settings;

  const forkUrl = id
    ? `https://rpc.tenderly.co/fork/${id}`
    : `https://rpc.tenderly.co/fork/${forkId}`;

  /* parameters from wagmi */
  const { address: account } = useAccount();
  const { refetch } = useBalance({ address: account });
  const provider = useProvider();
  const forkProvider = useMemo(
    () => (forkUrl ? new ethers.providers.JsonRpcProvider(forkUrl) : undefined),
    [forkUrl]
  );
  const forkSigner = isForkedEnv && forkUrl ? forkProvider?.getSigner(account) : undefined;

  const createNewFork = useCallback(async (): Promise<string> => {
    const forkAPI = `http://api.tenderly.co/api/v1/account/${process.env.NEXT_PUBLIC_TENDERLY_USER}/project/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork`;
    const currentBlockNumber = await provider.getBlockNumber();
    const resp = await axios.post(
      forkAPI,
      { network_id: 1, block_number: currentBlockNumber },
      {
        headers: {
          'X-Access-Key': process.env.NEXT_PUBLIC_TENDERLY_ACCESS_KEY as string,
        },
      }
    );
    return `https://rpc.tenderly.co/fork/${resp.data.simulation_fork.id}`;
  }, [provider]);

  const getForkTimestamp = useCallback(async () => {
    if (!isForkedEnv || !provider) return;
    try {
      const { timestamp } = await provider.getBlock('latest');
      console.log('Updated Forked Blockchain time: ', new Date(timestamp * 1000));
      return timestamp;
    } catch (e) {
      console.log('Error getting latest timestamp', e);
      return undefined;
    }
  }, [provider, isForkedEnv]);

  const getForkStartBlock = useCallback(async () => {
    if (!isForkedEnv || !provider) return 'earliest';
    try {
      const num = await forkProvider?.send('tenderly_getForkBlockNumber', []);
      const sBlock = +num.toString();
      console.log('Fork start block: ', sBlock);
      return sBlock;
    } catch (e) {
      console.log('Could not get tenderly start block: ', e);
      return 'earliest';
    }
  }, [isForkedEnv, provider, forkProvider]);

  const fillEther = useCallback(async () => {
    if (!provider || !isForkedEnv) return;

    try {
      const transactionParameters = [
        [account],
        ethers.utils.hexValue(BigInt('100000000000000000000')),
      ];
      await forkProvider?.send('tenderly_addBalance', transactionParameters);
      refetch();
      console.log('Filled eth on fork');
    } catch (e) {
      console.log('Could not fill eth on Tenderly fork');
    }
  }, [provider, isForkedEnv, account, forkProvider, refetch]);

  /* keep track of forked blockchain time/ startblock */
  const { data: forkTimestamp } = useSWRImmutable(
    isForkedEnv ? ['forkTimestamp', forkUrl] : null,
    getForkTimestamp
  ); // don't run if not using forked env
  const { data: forkStartBlock } = useSWRImmutable(
    isForkedEnv ? ['forkStartBlock', forkUrl] : null,
    getForkStartBlock
  ); // don't run if not using forked env

  return {
    forkTimestamp,
    forkStartBlock,
    createNewFork,
    fillEther,
    provider: forkProvider,
    signer: forkSigner,
  };
};

export default useForkTools;
