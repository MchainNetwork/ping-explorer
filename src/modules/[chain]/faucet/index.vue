<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useWalletStore } from '@/stores';

const walletStore = useWalletStore();

const cosmosAddress = ref(walletStore.currentAddress || '');
const responseMessage = ref('');

const isLoading = ref(false);
const isErrorMessage = ref(false);

const showResponse = (response: any) => {
  if (response && (response.status === 200 || response.status === 202)) {
    isErrorMessage.value = false;
    cosmosAddress.value = '';
    responseMessage.value = 'All coins are successfully sent.';
  }
};

async function callFaucet() {
  isLoading.value = true;
  try {
    const apiUrl = 'https://faucet-api.mchain.network/';
    const requestData = {
      address: cosmosAddress.value,
      coins: ['100000000umark'],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    showResponse(response);
  } catch (error: any) {
    console.log(error);
    isErrorMessage.value = true;
    if (error.response && error.response.data.error) {
      responseMessage.value = 'Error: ' + error.response.data.error;
    } else {
      responseMessage.value = 'Error: ' + error.message;
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto text-center p-4">
    <h2 class="text-2xl md:text-5xl font-bold text-primary mb-6">
      Mchain Testnet Faucet
    </h2>

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
          'bg-red-200 dark:bg-red-700 text-red-700 dark:text-white':
            isErrorMessage,
          'bg-green-200 dark:bg-green-700 text-green-700 dark:text-white':
            !isErrorMessage,
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
