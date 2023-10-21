
import type { Coin, PaginatedResponse } from './common';

export interface MnsNames {
  name: string;
  expires: number;
  value: string;
  data: string;
  subdomains: MnsNames[];
  tld: string;
  locked: number;
}

export interface PaginatedNames extends PaginatedResponse {
  names: MnsNames[];
}

export interface MnsBids {
  index: string;
  name: string;
  bidder: string;
  price: string;
}

export interface PaginatedBids extends PaginatedResponse {
  bids: MnsBids[];
}

export interface MnsForsale {
  name: string;
  price: string;
  owner: string;
}

export interface PaginatedForsale extends PaginatedResponse {
  forsale: MnsForsale[];
}

export interface MnsInit {
  address: string;
  complete: boolean;
}

export interface MnsParams {
  deposit_account: string;
}


