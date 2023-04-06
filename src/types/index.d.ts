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
}

export { Order };
