<script lang="ts" setup>
import { useBlockchain, useFormatter } from '@/stores';
// @ts-ignore
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';
//@ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
import { PageRequest } from '@/types';

import type { TxResponse } from '@/types';

const props = defineProps(['address', 'chain']);

const txs = ref({} as TxResponse[]);
const pageRequest = ref(new PageRequest());

const blockchain = useBlockchain();
const format = useFormatter();

function loadTxs() {
  blockchain.rpc
    .getTxs(
      '?&pagination.reverse=true&events=message.action=%27%27',
      {},
      pageRequest.value
    )
    .then((x) => {
      txs.value = x.tx_responses?.reverse();
    });
}

function page(p: number) {
  pageRequest.value.setPage(p);
  loadTxs();
}

onMounted(() => {
  loadTxs();
});
</script>
<template>
  <div>
    <bg-gradient-blur variant="big tx"></bg-gradient-blur>
    <div class="relative overflow-hidden mx-auto max-w-screen-lg">
      <div class="flex items-center mb-2 flex-1">
        <RouterLink
          :to="`/${chain}/explorer`"
          class="btn btn-ghost btn-circle btn-sm mx-1"
        >
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </RouterLink>
        <h1 class="text-2xl md:!text-4xl font-bold p-4">
          {{ $t('account.transactions') }}
        </h1>
      </div>

      <!-- Transactions -->
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <div class="overflow-x-auto">
          <table class="table w-full text-sm">
            <thead>
              <tr>
                <th class="py-3">{{ $t('account.message') }}</th>
                <th class="py-3">{{ $t('account.hash') }}</th>
                <th class="py-3">{{ $t('account.height') }}</th>
                <th class="py-3">{{ $t('staking.status') }}</th>
                <th class="py-3 text-right">{{ $t('account.time') }}</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-if="txs.length === 0">
                <td colspan="10">
                  <div class="text-center">
                    {{ $t('account.no_transactions') }}
                  </div>
                </td>
              </tr>
              <tr
                v-for="(v, index) in txs"
                :key="index"
                class="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <td class="flex items-center py-3" style="max-width: 130px">
                  <span
                    class="badge badge-success badge-sm bg-green-100 text-green-800 mr-2"
                  >
                    {{ format.messages(v.tx.body.messages) }}
                  </span>
                </td>
                <td class="truncate py-3 font-bold" style="max-width: 200px">
                  <RouterLink
                    :to="`/${chain}/tx/${v.txhash}`"
                    class="text-primary"
                  >
                    {{ v.txhash }}
                  </RouterLink>
                </td>
                <td class="text-sm py-3 font-bold">
                  <RouterLink
                    :to="`/${chain}/block/${v.height}`"
                    class="text-primary"
                  >
                    #{{ v.height }}
                  </RouterLink>
                </td>
                <td class="text-sm py-3">
                  <div
                    class="font-bold"
                    :class="`text-${v.code === 0 ? 'green-500' : 'error'}`"
                  >
                    {{ v.code === 0 ? 'Success' : 'Failed' }}
                  </div>
                </td>
                <td class="py-3 text-xs text-right">
                  {{ format.toDay(v.timestamp, 'from') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
