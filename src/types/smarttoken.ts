import type { Coin, PaginatedResponse } from './common';

export interface SmartTokenParams {
  params: {
      "burn_fee": Coin,
      "issue_fee": Coin,
      "mint_fee": Coin,
  }
}

export enum TokenFeature {
  minting = 0,
  burning = 1,
  sending = 2,
  free_send = 3,
  whitelist = 4,
  freezing = 5,
}

export interface SmartTokenDenom {
  denom: string;
  version: number;
  admin: string;
  name: string;
  symbol: string;
  decimals: string;
  authority: string;
  uri: string;
  minter: string;
  maxSupply: string;
  sendBurnRate: string;
  sendCommissionRate: string;
  features: TokenFeature[];
}

export interface PaginatedSmartTokens extends PaginatedResponse{
  smarttokens: SmartTokenDenom[]
}