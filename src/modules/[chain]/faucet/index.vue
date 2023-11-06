<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useWalletStore } from '@/stores';

const walletStore = useWalletStore();

const mchainAddress = ref(walletStore.currentAddress || '');
const responseMessage = ref('');

const isLoading = ref(false);
const isErrorMessage = ref(false);

async function callFaucet() {
  if (!mchainAddress.value || !mchainAddress.value.startsWith('m')) {
    isErrorMessage.value = true;
    responseMessage.value = 'Error: Please enter an address.';
    return;
  }

  isLoading.value = true;

  try {
    const apiUrl = 'https://faucet-api.mchain.network/';
    const requestData = {
      address: mchainAddress.value,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, requestData, { headers });

    if (response && (response.status === 200 || response.status === 202)) {
      isErrorMessage.value = false;
      mchainAddress.value = '';
      responseMessage.value = 'All coins are successfully sent.';
    }
  } catch (error: any) {
    console.log(error);
    isErrorMessage.value = true;
    if (error.response) {
      switch (error.response.status) {
        case 400:
          responseMessage.value =
            'Error: Bad Request. Please check your input.';
          break;
        case 429:
          responseMessage.value = 'Error: You requested too often.';
          break;
        case 500:
          responseMessage.value =
            'Error: Server error. Please contact the admin.';
          break;
        default:
          responseMessage.value = 'Error: Unknown response from the server.';
          break;
      }
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
      {{ $t('faucet.title') }}
    </h2>

    <div class="mb-6 mx-auto" style="max-width: 600px">
      <div class="mb-6 mx-auto">
        {{ $t('faucet.description') }}
      </div>

      <div class="text-left">
        <input
          type="text"
          id="mchainAddress"
          v-model="mchainAddress"
          class="mt-1 p-2 block w-full mx-auto border border-gray-300 rounded-full mb-8"
          :placeholder="$t('faucet.input_placeholder')"
          v-focus
        />
      </div>

      <button
        :disabled="isLoading"
        @click="callFaucet"
        class="btn btn-primary btn-md text-white rounded-full"
      >
        <span v-if="isLoading">{{ $t('faucet.sending') }}</span>
        <span v-else>{{ $t('faucet.get_tokens') }}</span>
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
