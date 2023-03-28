import { useMemo } from 'react';
import { useSigner as useSignerWagmi } from 'wagmi';
import useFork from './useFork';

const useSigner = () => {
  const { data: wagmiSigner } = useSignerWagmi();
  const { signer: forkSigner, useForkEnv } = useFork();

  return useMemo(
    () => (useForkEnv ? forkSigner : wagmiSigner),
    [forkSigner, useForkEnv, wagmiSigner]
  );
};

export default useSigner;
