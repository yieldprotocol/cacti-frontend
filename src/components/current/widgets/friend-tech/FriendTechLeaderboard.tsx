import { HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import useLeaderboardData, { LeaderboardUserItem } from './useLeaderboardData';

const FriendTechLeaderboard = () => {
  const { data } = useLeaderboardData();
  // get the first 10 users from the leaderboard
  const sliced = data?.slice(0, 10);

  return (
    <>
      <HeaderResponse text="Friend.Tech Leaderboard" />
      <ResponseGrid className="grid gap-1">
        {sliced?.map((user) => (
          <LeaderboardItem key={user.address} user={user} />
        ))}
      </ResponseGrid>
    </>
  );
};

const LeaderboardItem = ({ user }: { user: LeaderboardUserItem }) => {
  return (
    <SingleLineResponse className="flex justify-between">
      <ResponseTitle>@{user.username}</ResponseTitle>
      <ResponseTitle>{user.price} ETH</ResponseTitle>
    </SingleLineResponse>
  );
};

export default FriendTechLeaderboard;
