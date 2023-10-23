<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useWalletStore } from '@/stores';

const walletStore = useWalletStore();

const cosmosAddress = ref(walletStore.currentAddress || '');
const responseMessage = ref('');

const isLoading = ref(false);

const showResponse = (response: any) => {
  console.log(response);
  responseMessage.value = '';
  if (response && response.status === 200) {
    cosmosAddress.value = '';
    responseMessage.value = response.data.error
      ? response.data.error
      : 'All coins are successfully sent. Check balance: ' +
        'https://testnet.hub.mchain.network/bank/balances/' +
        cosmosAddress.value;
  } else if (response && response.status === 400) {
    responseMessage.value =
      response.data && response.data.error
        ? response.data.error
        : 'Bad request. Please ensure the address and coins are valid.';
  } else if (response && response.status === 500) {
    responseMessage.value = 'Internal server error. Please try again later.';
  } else {
    responseMessage.value = 'An unexpected error occurred. Please try again.';
  }
};

async function callFaucet() {
  isLoading.value = true;

  try {
    const apiUrl = 'https://faucet-api.mchain.network/';
    const requestData = {
      address: cosmosAddress.value,
      coins: ['100000000umar'],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    showResponse(response);
  } catch (error: any) {
    showResponse(error.response);
  } finally {
    isLoading.value = false;
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
        :disabled="isLoading"
        @click="callFaucet"
        class="bg-primary text-white font-bold py-2 px-4 rounded-full"
      >
        <span v-if="isLoading">Sending...</span>
        <span v-else>Get Testnet Tokens</span>
      </button>

      <div
        v-if="responseMessage"
        :class="{
          'bg-red-200 text-red-700': responseMessage.includes('error'),
          'bg-green-200 text-green-700': !responseMessage.includes('error'),
        }"
        class="mt-8 p-4 rounded"
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
