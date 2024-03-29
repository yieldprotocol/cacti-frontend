import { utils } from 'ethers';
import projectListJson from '@/utils/ProjectList.json';
import tokenListJson from '@/utils/TokenList.json';
import { Project, Token } from '../types';

export const shortenAddress = (address: string) => address.slice(0, 6) + '...' + address.slice(-4);

export const findTokenBySymbol = (symbol: string, chainId: number) =>
  tokenListJson.tokens.find(
    (token) => token.symbol.toUpperCase() === symbol.toUpperCase() && token.chainId === chainId
  ) as Token | undefined;
export const findTokenByAddress = (address: string, chainId: number) =>
  tokenListJson.tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase() && token.chainId === chainId
  ) as Token | undefined;
export const formatToEther = (amount: string) => utils.formatEther(amount);
export const formatToWei = (amount: string) => utils.parseEther(amount).toString();

export const findProjectByName = (name: string): Project | undefined => {
  // Project/Protocol list derived from Defillama - https://api.llama.fi/protocols
  const found = projectListJson.find(
    (project) =>
      project.name.toLowerCase() == name.toLowerCase() ||
      project.slug?.toLowerCase() == name.toLowerCase() ||
      project.id?.toLowerCase() == name.toLowerCase()
  );

  // if (!found) throw new Error(`No project found for name ${name}`);
  // if (!found.id) throw new Error(`No ID found for project ${name}`);
  if (!found || !found.id) return undefined; // We don't throw and throw error if no project found, we simply return undefined

  return {
    id: found.id,
    name: found.name,
    /* optionals */
    url: found.url,
    logo: found.logo,
    description: found.description,
    slug: found.slug,
    category: found.category,
    twitter: found.twitter,
    parentProtocol: found.parentProtocol,
  };
};

export const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={`h-4 w-4 animate-spin text-gray-100 ${className ?? ''}`}
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

/* Trunctate a string value to a certain number of 'decimal' point */
export const cleanValue = (input: string | undefined, decimals: number = 18) => {
  const re = new RegExp(`(\\d+\\.\\d{${decimals}})(\\d)`);
  if (input !== undefined) {
    const input_ = input![0] === '.' ? '0'.concat(input!) : input;
    const inpu = input_?.match(re); // inpu = truncated 'input'... get it?
    if (inpu) {
      return inpu[1];
    }
    return input?.valueOf();
  }
  return undefined;
};

/* handle Address/hash shortening */
export const abbreviateHash = (addr: string, buffer: number = 4) =>
  `${addr?.substring(0, buffer)}...${addr?.substring(addr.length - buffer)}`;

export const navigateToExternalUrl = (url: URL | string) => {
  const url_ = new URL(url);
  window.open(url_, '_blank');
};
export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
