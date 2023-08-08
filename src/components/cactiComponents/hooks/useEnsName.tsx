import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { fetchEnsName } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';

const useEnsName = () => {
  const chainId = useChainId();
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ['ensName', chainId, address],
    queryFn: async () =>
      address &&
      (await fetchEnsName({
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

export default useEnsName;
