import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import { PageRequest,type Coin } from '@/types';

export const useMnsStore = defineStore('mnsStore', {
  state: () => {
    return {
      params: {} as {
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
      const response = await this.blockchain.rpc?.getMnsParams();
      if (response?.params) this.params = response.params;
      return this.params;
    },
    async fetchMnsNames(request?: PageRequest) {
      return await this.blockchain.rpc?.getMnsNames(request);
    },
    async fetchMnsName(index: string) {
      return await this.blockchain.rpc?.getMnsName(index);
    },
    async fetchMnsListOwnedNames(address?: string) {
      return await this.blockchain.rpc?.getMnsListOwnedNames(address);
    },
    async fetchMnsBids() {
      return await this.blockchain.rpc?.getMnsBids();
    },
    async fetchMnsBidByIndex(index: string) {
      return await this.blockchain.rpc?.getMnsBidsByIndex(index);
    },
   async fetchMnsForsale(paginationOptions: {
      key?: string,
      offset?: string,
      limit?: string,
      countTotal?: boolean,
      reverse?: boolean
    } = {}) {
      return await this.blockchain.rpc?.getMnsForsale(paginationOptions);
    },
    async fetchMnsForsaleName(name: string) {
      return await this.blockchain.rpc?.getMnsForsaleName(name);
    },
  },
});
