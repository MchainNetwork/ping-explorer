<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { useBlockchain, useFormatter } from '@/stores';
import type { Coin } from '@/types';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
const props = defineProps(['chain']);

const format = useFormatter();
const chainStore = useBlockchain();

const list = ref([] as Coin[]);
const metadataList = ref([] as any[]);

function pageload() {
  chainStore.rpc.getDistributionCommunityPool().then((x) => {
    list.value = x.pool;
  });
  chainStore.rpc.getBankDenomsMetadata().then((x) => {
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

onMounted(() => {
  pageload();
});
</script>
<template>
  <div>
    <bg-gradient-blur variant="supply"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <h1 class="text-2xl md:!text-4xl font-bold mb-6 p-4">
        {{ $t('index.community_pool') }}
      </h1>
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl">
        <div class="overflow-x-auto">
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
        </div>
      </div>
    </div>
  </div>
</template>

<route>
    {
      meta: {
        i18n: 'community_pool',
        order: 6
      }
    }
  </route>
