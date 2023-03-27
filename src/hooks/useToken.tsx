import { useCallback } from 'react';
import { useChainId } from 'wagmi';
import { Token } from '@/types';
import { findTokenBySymbol } from '@/utils';

const useToken = (tokenSymbol?: string) => {
  const chainId = useChainId();

  // using WETH address for ETH
  const getIsETH = useCallback((_tokenSymbol: string) => _tokenSymbol.toUpperCase() === 'ETH', []);
  const getToken = useCallback(
    (_tokenSymbol: string) =>
      getIsETH(_tokenSymbol)
        ? ({
            address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            symbol: 'ETH',
            decimals: 18,
          } as Token)
        : (findTokenBySymbol(_tokenSymbol, chainId) as Token),
    [chainId, getIsETH]
  );

  return {
    data: tokenSymbol ? getToken(tokenSymbol) : undefined,
    getToken,
    isETH: tokenSymbol ? getIsETH(tokenSymbol) : false,
    getIsETH,
  };
};

export default useToken;
