import type { Coin, PaginatedResponse } from './common';

export interface SmartTokenParams {
  params: {
      "burn_fee": Coin,
      "issue_fee": Coin,
      "mint_fee": Coin,
  }
}

export interface SmartToken {
  denom: string,
  max_supply: string,
  minter: string,
  meta_data: {
      name: string,
      symbol: string,
      uri: string,
      authority: string
  }
}