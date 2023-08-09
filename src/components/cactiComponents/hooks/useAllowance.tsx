import { useQuery } from 'react-query';
import { Address, erc20ABI, useAccount, useContract } from 'wagmi';
import { readContract } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';

const useAllowance = ({
  tokenAddress,
  spender,
}: {
  tokenAddress: Address | undefined;
  spender: Address | undefined;
}) => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  // Get allowance amount - doesn't run if address or spender is undefined
  const { data, ...rest } = useQuery({
    queryKey: ['allowance', tokenAddress, spender, chainId],
    queryFn: async () => {
      // is eth probably?
      if (!tokenAddress) {
        console.log('🦄 ~ file: useAllowance.tsx:21 ~ queryFn: ~ tokenAddress:', tokenAddress);
        return;
      }

      if (!account) {
        console.error(`Account not found for approval`);
        return;
      }

      if (!spender) {
        console.error(`Spender not found for approval`);
        return;
      }

      return await readContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account, spender],
      });
    },
    refetchOnWindowFocus: false,
  });

  return { data, ...rest };
};

export default useAllowance;
