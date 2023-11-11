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
import { Icon } from '@iconify/vue';
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

function getIssuer(denom: string) {
  return denom.split('-')[1];
}

function getDenomPretty(denom: string) {
  return denom.split('-')[0];
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
  <div>
    <bg-gradient-blur variant="big supply"></bg-gradient-blur>
    <div class="overflow-auto mx-auto max-w-screen-lg">
      <h1 class="text-2xl md:!text-4xl font-bold mb-6 p-4">Supply</h1>
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl">
        <table class="table table-compact table-zebra text-base">
          <thead>
            <tr>
              <td>Token</td>
              <td class="text-right">Amount</td>
              <td>Issuer</td>
              <td></td>
            </tr>
          </thead>
          <template v-for="item in list" :key="item.denom">
            <tr
              v-if="item.denom === 'umark' || item.denom === 'beer'"
              class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <td class="uppercase">
                {{ getFormattedDenom(item.denom) }}
              </td>
              <td class="text-right">
                {{ getFormattedAmount(item.denom, item.amount) }}
              </td>
              <td>Mchain</td>
              <td></td>
            </tr>
          </template>
          <template v-for="item in list" :key="item.denom">
            <tr
              v-if="item.denom != 'umark' && item.denom != 'beer'"
              class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <td class="uppercase">
                {{ getDenomPretty(getFormattedDenom(item.denom)) }}
              </td>
              <td class="text-right">
                {{ getFormattedAmount(item.denom, item.amount) }}
              </td>
              <td>{{ getIssuer(item.denom) }}</td>
              <td class="text-right">
                <RouterLink
                  :to="`/${chain}/smarttoken/${item.denom}`"
                  class="btn btn-ghost btn-circle btn-sm mx-1"
                >
                  <Icon
                    icon="mdi:info-circle"
                    class="text-2xl text-gray-500 dark:text-gray-400"
                  />
                </RouterLink>
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
