import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import type { Coin } from '@/types';

export const useSmartTokenStore = defineStore('smartTokenStore', {
  state: () => {
    return {
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
    }
  },
});
