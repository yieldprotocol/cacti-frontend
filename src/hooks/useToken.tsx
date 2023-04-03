import { ethers } from 'ethers';
import { useChainId } from 'wagmi';
import { Token } from '@/types';
import { findTokenByAddress, findTokenBySymbol } from '@/utils';

const useToken = (tokenSymbol?: string, tokenAddress?: string) => {
  const chainId = useChainId();

  const getTokenIsETH = (tokenSymbol?: string, tokenAddress?: string) =>
    tokenSymbol === 'ETH' || tokenAddress === ethers.constants.AddressZero;

  const getToken = (tokenSymbol?: string, tokenAddress?: string) => {
    if (getTokenIsETH(tokenSymbol, tokenAddress))
      return { address: ethers.constants.AddressZero, symbol: 'ETH', decimals: 18 };
    if (tokenSymbol) return findTokenBySymbol(tokenSymbol, chainId) as Token;
    if (tokenAddress) return findTokenByAddress(tokenAddress, chainId) as Token;
    return undefined;
  };

  return {
    data: getToken(tokenSymbol, tokenAddress),
    isETH: getTokenIsETH(tokenSymbol, tokenAddress),
    getToken,
    getTokenIsETH,
  };
};

export default useToken;
