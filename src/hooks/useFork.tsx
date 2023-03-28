import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import useSWRImmutable from 'swr/immutable';
import { useAccount, useBalance } from 'wagmi';
import { useLocalStorage } from './useLocalStorage';

const USE_FORK_KEY = 'chatweb3-useFork';

type ForkTools = {
  useForkEnv: boolean;
  forkUrl: string;
  setForkUrl: (url: string) => void;
  setUseForkEnv: (usingFork: boolean) => void;
  forkTimestamp: number | undefined;
  forkStartBlock: number | string | undefined;
  createNewFork: () => Promise<string>;
  fillEther: () => Promise<void>;
  tenderlyForkApi: string;
  signer: ethers.Signer | undefined;
};

// handle using a fork
const useFork = (): ForkTools => {
  const FORK_URL = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const [useForkEnv, setUseForkEnv] = useLocalStorage(USE_FORK_KEY, JSON.stringify(true));
  /* Get the fork url from a simple cache, or alternatively the env */
  const [forkUrl, setForkUrl] = useState<string>(FORK_URL || '');
  const TENDERLY_FORK_API = `http://api.tenderly.co/api/v1/account/${process.env.TENDERLY_USER}/project/${process.env.TENDERLY_PROJECT}/fork`;

  /* parameters from wagmi */
  const { address: account } = useAccount();
  const { refetch } = useBalance({ address: account });

  /* build a fresh new RPC provider */
  const provider = useMemo(
    () => (useForkEnv ? new ethers.providers.JsonRpcProvider(forkUrl) : undefined),
    [forkUrl, useForkEnv]
  );

  const createNewFork = useCallback(async (): Promise<string> => {
    const currentBlockNumber = await provider?.getBlockNumber();
    const resp = await axios.post(
      TENDERLY_FORK_API,
      { network_id: 1, block_number: currentBlockNumber },
      {
        headers: {
          'X-Access-Key': process.env.TENDERLY_ACCESS_KEY as string,
        },
      }
    );
    return `https://rpc.tenderly.co/fork/${resp.data.simulation_fork.id}`;
  }, [TENDERLY_FORK_API, provider]);

  const getForkTimestamp = useCallback(async () => {
    if (!useForkEnv || !provider) return;
    try {
      const { timestamp } = await provider.getBlock('latest');
      console.log('Updated Forked Blockchain time: ', new Date(timestamp * 1000));
      return timestamp;
    } catch (e) {
      console.log('Error getting latest timestamp', e);
      return undefined;
    }
  }, [provider, useForkEnv]);

  const getForkStartBlock = useCallback(async () => {
    if (!useForkEnv || !provider) return 'earliest';
    try {
      const num = await provider.send('tenderly_getForkBlockNumber', []);
      const sBlock = +num.toString();
      console.log('Fork start block: ', sBlock);
      return sBlock;
    } catch (e) {
      console.log('Could not get tenderly start block: ', e);
      return 'earliest';
    }
  }, [provider, useForkEnv]);

  const fillEther = useCallback(async () => {
    if (!provider || !useForkEnv) return;

    try {
      const transactionParameters = [
        [account],
        ethers.utils.hexValue(BigInt('100000000000000000000')),
      ];
      await provider.send('tenderly_addBalance', transactionParameters);
      refetch();
      console.log('Filled eth on fork');
    } catch (e) {
      console.log('Could not fill eth on Tenderly fork');
    }
  }, [account, provider, refetch, useForkEnv]);

  /* keep track of forked blockchain time/ startblock */
  const { data: forkTimestamp } = useSWRImmutable(
    useForkEnv ? ['forkTimestamp', forkUrl] : null,
    getForkTimestamp
  ); // don't run if not using forked env
  const { data: forkStartBlock } = useSWRImmutable(
    useForkEnv ? ['forkStartBlock', forkUrl] : null,
    getForkStartBlock
  ); // don't run if not using forked env

  return {
    useForkEnv: useForkEnv as boolean,
    forkUrl,
    setForkUrl,
    setUseForkEnv,
    forkTimestamp,
    forkStartBlock,
    createNewFork,
    fillEther,
    tenderlyForkApi: TENDERLY_FORK_API,
    signer: provider?.getSigner(account),
  };
};

export default useFork;
