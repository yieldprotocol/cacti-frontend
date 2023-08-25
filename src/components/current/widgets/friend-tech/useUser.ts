import { useQuery } from 'react-query';
import axios from 'axios';
import { Address } from 'wagmi';

interface FriendTechUser {
  id: number;
  address: string;
  twitterUsername: string;
  twitterName: string;
  twitterPfpUrl: string;
  twitterUserId: string;
  lastOnline: number;
  holderCount: number;
  holdingCount: number;
  shareSupply: number;
  displayPrice: string;
  lifetimeFeesCollectedInWei: string;
}

// friend tech user data hook
const useUser = (userAddress: Address) => {
  const queryFn = async () => {
    const { data } = await axios.get<FriendTechUser>(
      `https://prod-api.kosetto.com/users/${userAddress}`
    );
    return data;
  };

  // use react query
  const { data, ...rest } = useQuery({
    queryKey: ['friend-tech/user', userAddress],
    queryFn,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, ...rest };
};

export default useUser;
