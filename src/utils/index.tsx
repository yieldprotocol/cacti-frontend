import { utils } from 'ethers';
import projectListJson from '@/utils/ProjectList.json';
import tokenListJson from '@/utils/TokenList.json';
import { Project } from '../types';

export const shortenAddress = (address: string) => address.slice(0, 6) + '...' + address.slice(-4);
export const findTokenBySymbol = (symbol: string, chainId: number) => {
  const found = tokenListJson.tokens.find(
    (token) => token.symbol == symbol && token.chainId == chainId
  );
  if (!found) throw new Error(`No token address found for symbol ${symbol} on chainId ${chainId}`);
  return found;
};
export const findTokenByAddress = (address: string, chainId: number) => {
  return tokenListJson.tokens.find((token) => token.address == address && token.chainId == chainId);
};
export const formatToEther = (amount: string) => utils.formatEther(amount);
export const formatToWei = (amount: string) => utils.parseEther(amount).toString();

export const findProjectByName = (name: string): Project => {
  // Project/Protocol list from Defillama - https://api.llama.fi/protocols
  const found = projectListJson.find(
    (project) =>
      project.name.toLowerCase() == name.toLowerCase() ||
      project.slug.toLowerCase() == name.toLowerCase()
  );
  if (!found) throw new Error(`No project found for name ${name}`);

  return {
    id: found.slug,
    name: found.name,
  };
};

export const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={`-ml-1 mr-3 h-5 w-5 animate-spin text-black ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
