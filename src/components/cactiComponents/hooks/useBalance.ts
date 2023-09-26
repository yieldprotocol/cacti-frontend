import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { fetchBalance, readContract } from 'wagmi/actions';
import erc1155ABI from '@/abi/erc1155ABI';
import useChainId from '@/hooks/useChainId';
import { zeroAddress } from 'viem';

/**
 * @description gets the balance of a an account for a token address, or if no address is specified, get's eth balance
 * @param address
 */
const useBalance = (
  tokenAddress?: `0x${string}`,
  compareAmount?: bigint,
  erc1155TokenId?: string
) => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ['balance', account, tokenAddress, erc1155TokenId, chainId],
    queryFn: async () => {
      if (!account) {
        console.log('Account is required to fetch balance.');
        return;
      }

      // fetch native balsance
      if (!tokenAddress || tokenAddress === zeroAddress) {
        return (
          await fetchBalance({
            address: account,
            chainId,
          })
        ).value;
      }

      if (erc1155TokenId) {
        const erc1155Bal = await readContract({
          address: tokenAddress,
          chainId,
          abi: erc1155ABI,
          functionName: 'balanceOf',
          args: [account, BigInt(erc1155TokenId) ],
        });
        return erc1155Bal;
      }

      return (
        await fetchBalance({
          address: account,
          token: tokenAddress,
          chainId,
        })
      ).value;
    },
    refetchOnWindowFocus: false,
  });

  const [comparisons, setComparisons] = useState<any>();

  /* keep the comparisons in sync with the balance */
  useEffect(() => {
    if (compareAmount && data) {
      setComparisons({
        isZero: data === BigInt(0),
        isGTEcompared: data >= compareAmount,
        isEQcompared: data === compareAmount,
        isLTcompared: data < compareAmount,
      });
    }
  }, [compareAmount, data, erc1155TokenId]);

  return {
    data,
    ...rest,

    // comparisons
    isZero: comparisons?.isZero,
    isGTEcompared: comparisons?.isGTEcompared,
    isEQcompared: comparisons?.isEQcompared,
    isLTcompared: comparisons?.isLTcompared,
  };
};

export default useBalance;
