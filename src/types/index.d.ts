import { Address } from 'wagmi';
import { Order } from '@/types/seaport';

export interface Token {
  address: Address;
  symbol: string;
  decimals: number;
  logoURI: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  slug?: string;
  category?: string;
  twitter?: string;
  parentProtocol?: string;
}

export { Order };
