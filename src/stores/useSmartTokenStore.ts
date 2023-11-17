import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import type { Coin, SmartTokenDenom, PageRequest } from '@/types';

export const useSmartTokenStore = defineStore('smartTokenStore', {
  state: () => {
    return {
      smarttoken: {} as SmartTokenDenom,
      smarttokens: [] as SmartTokenDenom[],
      params: {} as {
        issue_fee: Coin;
        mint_fee: Coin;
        burn_fee: Coin;
      },
    };
  },
  getters: {
    blockchain() {
      return useBlockchain();
    },
  },
  actions: {
    initial() {
      this.fetchParams();
    },
    async fetchParams() {
      const response = await this.blockchain.rpc?.getSmartTokenParams();
      if (response?.params) this.params = response.params;
      return this.params;
    },
    async fetchSmartTokens(authority?: string, page?: PageRequest) {
      return await this.blockchain.rpc?.getSmartTokenSmartTokens(
        authority,
        page
      );
    },
    async fetchSmartToken(denom: string) {
      return await this.blockchain.rpc?.getSmartTokenDenom(denom);
    },
  },
});
