<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useWalletStore } from '@/stores';

const walletStore = useWalletStore();

const cosmosAddress = ref(walletStore.currentAddress || '');
const responseMessage = ref('');

async function callFaucet() {
  try {
    const apiUrl = 'https://faucet-api.mchain.network'; // Replace with the actual Faucet URL
    const requestData = {
      address: cosmosAddress.value,
      coins: ['10umar'],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    responseMessage.value = 'Success: ' + JSON.stringify(response.data);
  } catch (err: any) {
    responseMessage.value = 'Error: ' + err.message;
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl mb-4">Faucet</h2>

    <div class="mb-4">
      <label for="cosmosAddress" class="block text-sm font-medium text-gray-700"
        >Mchain Address</label
      >
      <input
        type="text"
        id="cosmosAddress"
        v-model="cosmosAddress"
        class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        placeholder="Enter your Mchain address"
      />
    </div>

    <button
      @click="callFaucet"
      class="bg-primary text-white font-bold py-2 px-4 rounded"
    >
      Get Tokens
    </button>

    <div v-if="responseMessage" class="mt-4 p-4 bg-gray-100 rounded-md">
      {{ responseMessage }}
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
