import { useSigner as useSignerWagmi } from 'wagmi';
import useForkTools from '@/hooks/useForkTools';

const useSigner = () => {
  const { data: wagmiSigner } = useSignerWagmi();
  const { signer: forkSigner, isFork } = useForkTools();

  return isFork ? forkSigner : wagmiSigner;
};

export default useSigner;
