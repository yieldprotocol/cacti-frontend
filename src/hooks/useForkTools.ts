import axios from 'axios';
import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { useBalance, useAccount } from 'wagmi';

type ForkTools = {
  isFork: boolean;
  forkUrl: string;
  setForkUrl: (url: string) => void;
  setIsFork: (usingFork: boolean) => void;
  forkTimestamp: number | undefined;
  forkStartBlock: number | string | undefined;
  createNewFork: () => Promise<string>;
  fillEther: () => Promise<void>;
}

const useForkTools = () : ForkTools=> {

  /* Get the fork url from a simple cache, or alternatively the env */
  const [forkUrl, setForkUrl] = useState<string>(process.env.FORK_URL || '');
  const [isFork, setIsFork] = useState<boolean>(false);

  /* parameters from wagmi */
  const { address: account } = useAccount();
  const { refetch } = useBalance({ address: account });

  /* build a fresh new RPC provider */
  const provider = useMemo(
    () => (isFork ? new ethers.providers.JsonRpcProvider(forkUrl) : undefined),
    [forkUrl, isFork]
  );

  const createNewFork = useCallback(async (): Promise<string> => {
    const TENDERLY_FORK_API = `http://api.tenderly.co/api/v1/account/${process.env.TENDERLY_USER}/project/${process.env.TENDERLY_PROJECT}/fork`;
    const currentBlockNumber = await provider.getBlockNumber();
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
  }, [provider]);

  const getForkTimestamp = useCallback(async () => {
    if (!isFork || !provider) return;
    try {
      const { timestamp } = await provider.getBlock('latest');
      console.log('Updated Forked Blockchain time: ', new Date(timestamp * 1000));
      return timestamp;
    } catch (e) {
      console.log('Error getting latest timestamp', e);
      return undefined;
    }
  }, [provider, isFork]);

  const getForkStartBlock = useCallback(async () => {
    if (!isFork || !provider) return 'earliest';
    try {
      const num = await provider.send('tenderly_getForkBlockNumber', []);
      const sBlock = +num.toString();
      console.log('Fork start block: ', sBlock);
      return sBlock;
    } catch (e) {
      console.log('Could not get tenderly start block: ', e);
      return 'earliest';
    }
  }, [provider, isFork]);

  const fillEther = useCallback(async () => {
    if (!provider || !isFork) return;

    try {
      const transactionParameters = [[account], ethers.utils.hexValue(BigInt('100000000000000000000'))];
      await provider.send('tenderly_addBalance', transactionParameters);
      refetch();
      console.log('Filled eth on fork');
    } catch (e) {
      console.log('Could not fill eth on Tenderly fork');
    }
  }, [account, provider, refetch, isFork]);

  /* keep track of forked blockchain time/ startblock */
  const { data: forkTimestamp } = useSWRImmutable(isFork ? ['forkTimestamp', forkUrl] : null, getForkTimestamp); // don't run if not using forked env
  const { data: forkStartBlock } = useSWRImmutable(
    isFork ? ['forkStartBlock', forkUrl] : null,
    getForkStartBlock
  ); // don't run if not using forked env

  return {
    isFork,
    forkUrl,
    setForkUrl,
    setIsFork,
    forkTimestamp,
    forkStartBlock,
    createNewFork,
    fillEther,
  };
};

export default useForkTools;