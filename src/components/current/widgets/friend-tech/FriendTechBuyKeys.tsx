import { BigNumber } from 'ethers';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import abi from './abi';
import useLeaderboardData from './useLeaderboardData';

interface FriendTechBuyKeysProps {
  username: string; // username of the user to buy keys for
  amount: string; // number of keys to buy
}

// TODO update wagmi to be able to use the chain id from wagmi chains
const BASE_CHAIN_ID = 8453;

const CONTRACT_ADDRESS = '0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4';

const FriendTechBuyKeys = ({ username, amount }: FriendTechBuyKeysProps) => {
  const { data } = useLeaderboardData();
  const parsedAmount = BigNumber.from(amount);
  // get the specific user data from leaderboard
  const user = data?.find((user) => user.username === username.replace('@', ''));

  // get the keys buy price
  const { data: buyPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: BASE_CHAIN_ID,
    abi,
    functionName: 'getBuyPriceAfterFee',
    args: [user?.address!, parsedAmount],
  });

  const { config, isError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'buyShares',
    args: [user?.address!, parsedAmount],
    overrides: {
      value: buyPrice,
    },
  });

  return (
    <>
      <HeaderResponse text="Buy Keys on Friend.Tech" />
      <ResponseGrid className="grid gap-1">
        <SingleLineResponse className="flex justify-between">
          <ResponseTitle>{user?.username}</ResponseTitle>
          <div className="flex">
            <ResponseTitle>Amount to Buy:</ResponseTitle>
            <ResponseTitle>{amount}</ResponseTitle>
          </div>
        </SingleLineResponse>

        <ActionResponse
          sendParams={config.request}
          txParams={undefined}
          approvalParams={undefined}
          label={
            isError
              ? `Erroring preparing: make sure you have specified the username and amount`
              : `Buy ${amount} of ${username} keys`
          }
          disabled={isError}
        />
      </ResponseGrid>
    </>
  );
};

export default FriendTechBuyKeys;
