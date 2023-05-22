import { BigNumber, ethers } from 'ethers';
import { useAccount, useBalance as useBalanceWagmi, useContractRead } from 'wagmi';
import erc1155ABI from '@/abi/erc1155ABI.json';

/**
 * @description gets the balance of a an account for a token address, or if no address is specified, get's eth balance
 * @param address
 */
const useBalance = (address?: string, erc1155TokenId?: string) => {
  const { address: account } = useAccount();

  // erc20 or eth if zero or no address is specified
  const { data, isLoading } = useBalanceWagmi({
    address: account,
    token:
      address === ethers.constants.AddressZero || !address ? undefined : (address as `0x${string}`),
  });

  // erc1155
  const { data: erc1155Bal, isLoading: erc1155BBalLoading } = useContractRead({
    address: address as `0x${string}`,
    abi: erc1155ABI,
    functionName: 'balanceOf',
    args: [account, erc1155TokenId],
    enabled: !!erc1155TokenId,
  });

  return {
    data: erc1155TokenId ? (erc1155Bal as BigNumber) : data?.value,
    isLoading: erc1155TokenId ? erc1155BBalLoading : isLoading,
  };
};

export default useBalance;
