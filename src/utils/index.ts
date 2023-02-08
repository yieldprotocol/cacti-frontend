import { utils } from 'ethers';
import tokenListJson from '@/utils/TokenList.json';

export const shortenAddress = (address: string) => address.slice(0, 6) + '...' + address.slice(-4);
export const findTokenBySymbol = (symbol: string, chainId: number) => {
  return tokenListJson.tokens.find((token) => token.symbol == symbol && token.chainId == chainId);
};
export const findTokenByAddress = (address: string, chainId: number) => {
  return tokenListJson.tokens.find((token) => token.address == address && token.chainId == chainId);
};
export const formatToEther = (amount: string) => utils.formatEther(amount);
export const formatToWei = (amount: string) => utils.parseEther(amount).toString();
