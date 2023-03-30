import { useChainId } from 'wagmi';
import { Token } from '@/types';
import { findTokenBySymbol } from '@/utils';

const useToken = (tokenSymbol: string) => {
  const chainId = useChainId();

  // using WETH address for ETH
  const isETH = tokenSymbol === 'ETH';
  const token = findTokenBySymbol(isETH ? 'WETH' : tokenSymbol, chainId);

  return {
    data: token as Token,
    isETH,
  };
};

export default useToken;
