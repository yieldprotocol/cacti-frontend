import { useNetwork } from 'wagmi';
import tokenListJson from '@/utils/TokenList.json';

export interface TokenListItem {
  chainId: number;
  symbol: string;
  address: string;
  decimals: number;
  name: string;
  logoURI: string;
}

export const useTokenList = () => {
  const { chain } = useNetwork();
  const chainId = chain?.id || 1; // default to mainnet if no chain id
  const tokenList = tokenListJson.tokens.filter((token) => token.chainId === chainId);
  const baseToken = chain?.nativeCurrency;
  return { tokenList: [baseToken, ...tokenList] };
};
