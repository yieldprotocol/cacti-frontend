import { useMemo } from 'react';
import { useSigner as useSignerWagmi } from 'wagmi';
import useForkTools from '@/hooks/useForkTools';

const useSigner = () => {
  const { data: wagmiSigner } = useSignerWagmi();
  const { signer: forkSigner, isFork } = useForkTools();

  return useMemo(() => (isFork ? forkSigner : wagmiSigner), [forkSigner, isFork, wagmiSigner]);
};

export default useSigner;
