import type { Coin, PaginatedResponse } from './common';

export interface MnsBidderInfo {
  bidder: string;
  price: Coin;
}

export interface MnsNames {
  name: string;
  expires: string;
  registration_date: string;
  value: string;
  data: { [key: string]: any };
  subdomains: MnsNames[];
  tld: string;
  locked: number;
  last_sale: Coin;
  for_sale: Coin;
  bids: MnsBidderInfo[];
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

export interface MnsReverses {
  address: string;
  name: string;
}

export interface PaginatedReverses extends PaginatedResponse {
  reverses: MnsReverses[];
}
