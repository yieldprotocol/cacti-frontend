import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useAccount, useBalance as useBalanceWagmi, useContractRead } from 'wagmi';
import erc1155ABI from '@/abi/erc1155ABI.json';

/**
 * @description gets the balance of a an account for a token address, or if no address is specified, get's eth balance
 * @param address
 */
const useBalance = (
  tokenAddress?: `0x${string}`,
  compareAmount?: BigNumber,
  erc1155TokenId?: string
) => {
  const { address: account } = useAccount();

  /* erc20 or eth if zero or no address is specified */
  const { data, isLoading } = useBalanceWagmi({
    address: account,
    token: tokenAddress,
    enabled: !erc1155TokenId, // if erc1155TokenId is specified, don't get erc20 balance
  });

  /* erc1155 */
  const { data: erc1155_data, isLoading: erc1155_Loading } = useContractRead({
    address: tokenAddress,
    abi: erc1155ABI,
    functionName: 'balanceOf',
    args: [account, erc1155TokenId],
    enabled: !!erc1155TokenId, // if erc1155TokenId is specified, get erc1155 balance
  });

  const [comparisons, setComparisons] = useState<any>();

  /* keep the comparisons in sync with the balance */
  useEffect(() => {
    const data_bn = erc1155TokenId ? (erc1155_data as BigNumber) : data?.value;
    if (compareAmount && data_bn) {
      setComparisons({
        isZero: data_bn.isZero(),
        isGTEcompared: data_bn.gt(compareAmount),
        isEQcompared: data_bn.eq(compareAmount),
        isLTcompared: data_bn.lt(compareAmount),
      });
    }
  }, [data, erc1155_data]);

  return {
    data: erc1155TokenId ? (erc1155_data as BigNumber) : data?.value,
    isLoading: erc1155TokenId ? erc1155_Loading : isLoading,

    // comparisons
    isZero: comparisons?.isZero,
    isGTEcompared: comparisons?.isGTEcompared,
    isEQcompared: comparisons?.isEQcompared,
    isLTcompared: comparisons?.isLTcompared,
  };
};

export default useBalance;
