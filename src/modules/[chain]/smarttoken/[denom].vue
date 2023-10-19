<script setup lang="ts">
import {
  useBlockchain,
  useFormatter,
  useSmartTokenStore,
} from '@/stores';
import { onMounted, ref } from 'vue';
import {
  type Coin,
} from '@/types';
const props = defineProps(['denom']);

const smartTokenStore = useSmartTokenStore();
const blockchain = useBlockchain();

let denom: string = props.denom;
let tokenInfo = ref({} as any);
let supply = ref({} as Coin);
let subunit = ref('');

let additionalData = ref({} as any);

onMounted(() => {
  if (denom) {
    smartTokenStore.fetchSmartToken(denom)
    .then((res) => {
      console.log(res)
      tokenInfo.value = res
      subunit.value = denom.split('-')[0]
      if (res.smarttoken.meta_data.uri) {
        fetch(res.smarttoken.meta_data.uri)
          .then(response => response.json())
          .then(data => {
            additionalData.value = data;
          })
          .catch(error => console.error('Error fetching data:', error));
      }

      blockchain.rpc.getBankSupplyByDenom(denom).then((x) => {
        supply.value = x.amount;
      });
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
          <p><strong>Current Supply:</strong> {{ supply?.amount }} {{subunit}}</p>
          <p><strong>Max Supply:</strong> {{ tokenInfo.smarttoken.max_supply }} {{subunit}}</p>
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

      <div v-if="additionalData && Object.keys(additionalData).length" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Additional Data</h2>
        <pre class="bg-gray-100 p-4 rounded"><code>{{ JSON.stringify(additionalData, null, 2) }}</code></pre>
      </div>
    </div>
  </div>
</template>

