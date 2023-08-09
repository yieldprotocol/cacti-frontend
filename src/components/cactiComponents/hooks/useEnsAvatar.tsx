import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { fetchEnsAvatar } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';

const useEnsAvatar = () => {
  const chainId = useChainId();
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ['ensAvatar', chainId, address],
    queryFn: async () =>
      address &&
      (await fetchEnsAvatar({
        address,
        chainId,
      })),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    data,
    ...rest,
  };
};

export default useEnsAvatar;
