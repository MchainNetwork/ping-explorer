<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useBlockchain, useFormatter } from '@/stores';
import {
  PageRequest,
  type AuthAccount,
  type Pagination,
  type Coin,
} from '@/types';
import { onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
const props = defineProps(['chain']);

const format = useFormatter();
const chainStore = useBlockchain();

const list = ref([] as Coin[]);

function showType(v: string) {
  return v.replace('/cosmos.auth.v1beta1.', '');
}

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

onMounted(() => {
  pageload(1);
});

function pageload(p: number) {
  pageRequest.value.setPage(p);
  chainStore.rpc.getBankSupply(pageRequest.value).then((x) => {
    list.value = x.supply;
    pageResponse.value = x.pagination;
  });
}
</script>
<template>
  <div class="overflow-auto mx-auto max-w-screen-lg">
    <h1 class="text-4xl font-bold mb-6 p-4">Supply</h1>
    <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl">
      <table class="table table-compact table-zebra text-xl">
        <thead>
          <tr>
            <td>Token</td>
            <td class="text-right">Amount</td>
          </tr>
        </thead>
        <tr
          v-for="item in list.filter(
            (x) => x.denom == 'umark' || x.denom == 'beer'
          )"
          :key="item.denom"
        >
          <td>{{ item.denom }}</td>
          <td class="text-right">{{ item.amount }}</td>
        </tr>
        <tr
          v-for="item in list.filter(
            (x) =>
              !x.denom.startsWith('ibc/') &&
              x.denom != 'umark' &&
              x.denom != 'beer'
          )"
          :key="item.denom"
        >
          <td>
            <RouterLink
              :to="'/mchain/smarttoken/' + encodeURIComponent(item.denom)"
              >{{ item.denom }}</RouterLink
            >
          </td>
          <td class="text-right">{{ item.amount }}</td>
        </tr>
        <tr
          v-for="item in list.filter((x) => x.denom.startsWith('ibc/'))"
          :key="item.denom"
        >
          <td>{{ item.denom }}</td>
          <td class="text-right">{{ item.amount }}</td>
        </tr>
      </table>
      <PaginationBar
        :limit="pageRequest.limit"
        :total="pageResponse.total"
        :callback="pageload"
      />
    </div>
  </div>
</template>

<route>
    {
      meta: {
        i18n: 'supply',
        order: 6
      }
    }
  </route>
