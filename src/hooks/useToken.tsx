import { useChainId } from 'wagmi';
import { Token } from '@/types';
import { findTokenByAddress, findTokenBySymbol } from '@/utils';

const useToken = (tokenSymbol?: string, tokenAddress?: string) => {
  const chainId = useChainId();

  // using WETH address for ETH
  const isETH = tokenSymbol === 'ETH';

  // try to get by symbol first
  const token = tokenSymbol
    ? findTokenBySymbol(isETH ? 'WETH' : tokenSymbol, chainId)
    : findTokenByAddress(tokenAddress!, chainId);

  return {
    data: token as Token | undefined,
    isETH,
  };
};

export default useToken;
