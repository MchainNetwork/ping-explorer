<script setup lang="ts">
import {
  useBlockchain,
  useFormatter,
  useSmartTokenStore,
} from '@/stores';
import { onMounted, ref } from 'vue';

const props = defineProps(['denom']);

const smartTokenStore = useSmartTokenStore();
const blockchain = useBlockchain();

let denom: string = props.denom;
let tokenInfo = ref({} as any);

onMounted(() => {
  if (denom) {
    smartTokenStore.fetchSmartToken(denom)
    .then((res) => {
      console.log(res)
      tokenInfo.value = res
    });
  }
});
</script>

<template>
  <div class="min-h-screen">
    <div v-if="tokenInfo && tokenInfo.smarttoken" class="bg-base-100 p-6 rounded-xl">
      <h1 class="text-2xl font-bold mb-4">{{ tokenInfo.smarttoken.meta_data.name }}</h1>
      
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Token Details</h2>
        <div class="flex flex-col">
          <p><strong>Denom:</strong> {{ tokenInfo.smarttoken.denom }}</p>
          <p><strong>Max Supply:</strong> {{ tokenInfo.smarttoken.max_supply }}</p>
          <p><strong>Minter:</strong> {{ tokenInfo.smarttoken.minter }}</p>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Meta Data</h2>
        <div class="flex flex-col">
          <p><strong>Name:</strong> {{ tokenInfo.smarttoken.meta_data.name }}</p>
          <p><strong>Symbol:</strong> {{ tokenInfo.smarttoken.meta_data.symbol }}</p>
          <p><strong>Decimals:</strong> {{ tokenInfo.smarttoken.meta_data.decimals }}</p>
          <p><strong>URI:</strong> {{ tokenInfo.smarttoken.meta_data.uri }}</p>
          <p><strong>Authority:</strong> {{ tokenInfo.smarttoken.meta_data.authority }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

