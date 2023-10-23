<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useWalletStore } from '@/stores';

const walletStore = useWalletStore();

const cosmosAddress = ref(walletStore.currentAddress || '');
const responseMessage = ref('');

async function callFaucet() {
  try {
    const apiUrl = 'https://faucet-api.mchain.network/';
    const requestData = {
      address: cosmosAddress.value,
      coins: ['10token'],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, requestData, { headers });

    if (response.status === 200) {
      responseMessage.value =
        'All coins are successfully sent. Check balance: ' +
        'https://testnet.hub.mchain.network/bank/balances/' +
        cosmosAddress.value;
    } else if (response.status === 400) {
      cosmosAddress.value = '';
      responseMessage.value =
        'Bad request. Please ensure the address and coins are valid.';
    } else if (response.status === 500) {
      responseMessage.value = 'Internal server error. Please try again later.';
    } else {
      responseMessage.value = 'An unexpected error occurred. Please try again.';
    }
  } catch (error: any) {
    responseMessage.value = 'Error: ' + error.message;
  }
}
</script>

<template>
  <div class="container mx-auto text-center p-4">
    <h2 class="text-5xl font-bold text-primary mb-6">Mchain Testnet Faucet</h2>

    <div class="mb-6 mx-auto" style="max-width: 600px">
      <div class="mb-6 mx-auto">
        Instantly receive Mchain testnet tokens to explore and test dApps in a
        risk-free environment. Enter your address, click the button, and get
        started!
      </div>

      <div class="text-left">
        <input
          type="text"
          id="cosmosAddress"
          v-model="cosmosAddress"
          class="mt-1 p-2 block w-full mx-auto border border-gray-300 rounded-full mb-8"
          placeholder="Enter your Mchain address"
        />
      </div>

      <button
        @click="callFaucet"
        class="bg-primary text-white font-bold py-2 px-4 rounded-full"
      >
        Get Testnet Tokens
      </button>

      <div
        v-if="responseMessage"
        class="mt-8 p-4 bg-base-300 dark:bg-base-100 rounded-full"
      >
        {{ responseMessage }}
      </div>
    </div>
  </div>
</template>

<route>
    {
      meta: {
        i18n: 'faucet',
        order: 200
      }
    }
</route>
