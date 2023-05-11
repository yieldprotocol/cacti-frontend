import { Order } from '@/types/seaport';

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  logoURI: string;
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
