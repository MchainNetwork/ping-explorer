<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWalletStore } from '@/stores';
import QRCodeStyling from 'qr-code-styling';

const walletStore = useWalletStore();
const qrcodeRef = ref(null);

const options = {
  data: walletStore.currentAddress,
  margin: 0,
  width: 240,
  height: 240,
  type: 'svg',
  image: '/coins/umark.svg',
  imageOptions: {
    margin: 5,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    color: '#000000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: 'transparent',
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    color: '#000000',
    type: 'dot',
  },
};

//@ts-ignore
let qrCode = new QRCodeStyling(options);

onMounted(() => {
  if (qrcodeRef.value) {
    qrCode.append(qrcodeRef.value);
  }
});
</script>

<template>
  <div>
    <bg-gradient-blur variant="big home"></bg-gradient-blur>
    <div class="relative text-center" v-if="walletStore.currentAddress">
      <h1 class="text-2xl md:!text-4xl font-bold mb-4 p-4">
        {{ $t('account.your_wallet_address') }}
      </h1>
      <div
        class="bg-base-100 dark:bg-gray-300 p-4 pt-8 rounded-3xl text-center mx-auto max-w-screen-md"
      >
        <div
          v-if="walletStore.currentAddress"
          class="flex items-center justify-center mb-4"
        >
          <div ref="qrcodeRef" class="rounded-md overflow-hidden"></div>
        </div>
        <div class="text-main mb-4 text-gray-800 break-words font-mono">
          {{ walletStore.currentAddress }}
        </div>
      </div>
    </div>
  </div>
</template>
