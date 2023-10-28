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
const metadataList = ref([] as any[]);

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
  chainStore.rpc.getBankDenomMetadata().then((x) => {
    metadataList.value = x.metadatas;
  });
}

function getDescription(denom: string) {
  const meta = metadataList.value.find(
    (m) => m.base === denom || m.display === denom
  );
  return meta ? meta.description : '';
}

function getFormattedDenom(denom: string) {
  const meta = metadataList.value.find(
    (m) => m.base === denom || m.display === denom
  );
  return meta ? meta.display : denom;
}

function getFormattedAmount(denom: string, amount: string) {
  const meta = metadataList.value.find(
    (m) => m.base === denom || m.display === denom
  );
  return meta
    ? Number(amount) /
        10 **
          meta.denom_units.find((unit: any) => unit.denom === meta.display)
            .exponent
    : amount;
}
</script>
<template>
  <div class="overflow-auto mx-auto max-w-screen-lg">
    <h1 class="text-4xl font-bold mb-6 p-4">Supply</h1>
    <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl">
      <table class="table table-compact table-zebra text-base">
        <thead>
          <tr>
            <td>Token</td>
            <td>Description</td>
            <td class="text-right">Amount</td>
          </tr>
        </thead>
        <template v-for="item in list" :key="item.denom">
          <tr v-if="item.denom === 'umark' || item.denom === 'beer'">
            <td class="uppercase">{{ getFormattedDenom(item.denom) }}</td>
            <td>{{ getDescription(item.denom) }}</td>
            <td class="text-right">
              {{ getFormattedAmount(item.denom, item.amount) }}

              <span class="ml-1 uppercase">{{
                getFormattedDenom(item.denom)
              }}</span>
            </td>
          </tr>
        </template>
        <template v-for="item in list" :key="item.denom">
          <tr v-if="item.denom != 'umark' && item.denom != 'beer'">
            <td class="uppercase">{{ getFormattedDenom(item.denom) }}</td>
            <td>{{ getDescription(item.denom) }}</td>
            <td class="text-right">
              {{ getFormattedAmount(item.denom, item.amount) }}
            </td>
          </tr>
        </template>
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
