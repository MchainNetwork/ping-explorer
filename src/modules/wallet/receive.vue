<script setup lang="ts">
import { useWalletStore } from '@/stores';
import { useQRCode } from '@vueuse/integrations/useQRCode';

const walletStore = useWalletStore();
const qrcode = useQRCode(walletStore.currentAddress, {
  width: 200,
  height: 200,
});
</script>

<template>
  <div class="bg-base-100 p-4 rounded-3xl text-center mx-auto max-w-screen-md">
    <h1 class="text-4xl font-bold mb-4 p-4">Your Wallet Address</h1>
    <div
      v-if="walletStore.currentAddress"
      class="flex items-center justify-center mb-4"
    >
      <img :src="qrcode" alt="QR Code" class="rounded-md overflow-hidden" />
    </div>
    <div class="text-main mb-4">
      {{ walletStore.currentAddress }}
    </div>
  </div>
</template>
