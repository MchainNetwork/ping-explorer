import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import type { Coin, SmartToken } from '@/types';

export const useSmartTokenStore = defineStore('smartTokenStore', {
  state: () => {
    return {
      smarttoken: {} as SmartToken,
      smarttokens: [] as SmartToken[],
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
    async fetchSmartTokens(authority?: string) {
      return await this.blockchain.rpc?.getSmartTokenSmartTokens(authority);
    },
    async getSmartTokens(authority?: string) {
      const response = await this.blockchain.rpc?.getSmartTokenSmartTokens(authority);
      if (response?.smarttokens) this.smarttokens = response.smarttokens;
      return this.smarttokens;
    }
  },
});
