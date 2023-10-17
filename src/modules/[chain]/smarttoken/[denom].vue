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

onMounted(() => {
  if (denom) {
    smartTokenStore.fetchSmartToken(denom)
    .then((res) => {
      console.log(res)
    });
  }
});
</script>

<template>
  <div>
    {{denom}}
  </div>
</template>