import { useCallback, useMemo } from 'react';
import { zeroAddress } from 'viem';
import { Address } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import { Token } from '@/types';
import { findTokenByAddress, findTokenBySymbol } from '@/utils';

const useToken = (tokenSymbol?: string, tokenAddress?: Address) => {
  const chainId = useChainId();

  const getTokenIsETH = useCallback(
    (tokenSymbol?: string, tokenAddress?: string) =>
      tokenSymbol === 'ETH' || tokenAddress === zeroAddress,
    []
  );

  const getToken = useCallback(
    (tokenSymbol?: string, tokenAddress?: Address): Token | undefined => {
      if (getTokenIsETH(tokenSymbol, tokenAddress))
        return {
          address: zeroAddress,
          symbol: 'ETH',
          name: 'Ether',
          decimals: 18,
          logoURI:
            'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png',
        } as Token;
      if (tokenSymbol) return findTokenBySymbol(tokenSymbol, chainId);
      if (tokenAddress) return findTokenByAddress(tokenAddress, chainId);
      return undefined;
    },
    [chainId, getTokenIsETH]
  );

  const data = useMemo(
    () => getToken(tokenSymbol, tokenAddress),
    [getToken, tokenAddress, tokenSymbol]
  );
  const isETH = useMemo(
    () => getTokenIsETH(tokenSymbol, tokenAddress),
    [getTokenIsETH, tokenAddress, tokenSymbol]
  );

  return {
    data,
    isETH,
    getToken,
    getTokenIsETH,
  };
};

export default useToken;
