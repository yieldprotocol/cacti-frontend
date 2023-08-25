import { useQuery } from 'react-query';
import axios from 'axios';
import { Address } from 'wagmi';

export interface LeaderboardUserItem {
  address: Address;
  username: string;
  kosettoName: string;
  price: string;
}

const useLeaderboardData = () => {
  const queryFn = async () => {
    const {
      data: { leaderboard },
    } = await axios.get<{ leaderboard: LeaderboardUserItem[] }>(
      `https://prod-api.kosetto.com/leaderboard`
    );
    return leaderboard;
  };

  const { data, ...rest } = useQuery({
    queryKey: ['friend-tech/leaderboard'],
    queryFn,
    refetchOnWindowFocus: false,
  });

  return { data, ...rest };
};

export default useLeaderboardData;
