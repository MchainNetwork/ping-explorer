import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import { PageRequest } from '@/types';

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
    async fetchMnsNames(req?: PageRequest) {
      return await this.blockchain.rpc?.getMnsNames(req);
    },
    async fetchMnsName(index: string) {
      return await this.blockchain.rpc?.getMnsName(index);
    },
    async fetchMnsListOwnedNames(address?: string) {
      return await this.blockchain.rpc?.getMnsListOwnedNames(address);
    },
    async fetchMnsBids(req?: PageRequest) {
      return await this.blockchain.rpc?.getMnsBids(req);
    },
    async fetchMnsBidByIndex(index: string) {
      return await this.blockchain.rpc?.getMnsBidsByIndex(index);
    },
   async fetchMnsForsale(req?: PageRequest) {
      return await this.blockchain.rpc?.getMnsForsale(req);
    },
    async fetchMnsForsaleName(name: string) {
      return await this.blockchain.rpc?.getMnsForsaleName(name);
    },
  },
});
