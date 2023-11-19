<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useBlockchain, useFormatter } from '@/stores';
import { useIndexModule } from '../indexStore';

import { useRouter } from 'vue-router';
const props = defineProps(['chain']);

// @ts-ignores
import { Icon } from '@iconify/vue';
import CardStatisticsVertical from '@/components/CardStatisticsVertical.vue';

//@ts-ignore
import { PageRequest } from '@/types';
import type { TxResponse } from '@/types';

const base = useBaseStore();
const store = useIndexModule();
const format = useFormatter();
const blockchain = useBlockchain();
const vueRouters = useRouter();

const coinInfo = computed(() => {
  return store.coinInfo;
});

const blocks = computed(() => {
  const recents = base.recents;
  return recents
    .sort(
      (a, b) => Number(b.block.header.height) - Number(a.block.header.height)
    )
    .slice(0, 10);
});

const txs = ref({} as TxResponse[]);
const pageRequest = ref(new PageRequest());
const isFocused = ref(false);

let searchQuery = ref('');
let errorMessage = ref('');

function confirm() {
  errorMessage.value = '';
  const key = searchQuery.value;
  if (!key) {
    errorMessage.value = 'Please enter a value!';
    return;
  }
  const height = /^\d+$/;
  const txhash = /^[A-Z\d]{64}$/;
  const addr = /^[a-z\d]+1[a-z\d]{38,58}$/;
  const smartTokenDenom = /^[a-z0-9]{0,20}\-m[a-z0-9]{39}$/;
  const mnsName = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/;

  const current = blockchain?.current?.chainName || '';
  const routeParams = vueRouters?.currentRoute?.value;

  if (!Object.values(routeParams?.params).includes(key)) {
    if (height.test(key)) {
      vueRouters.push({ path: `/${current}/block/${key}` });
    } else if (txhash.test(key)) {
      vueRouters.push({ path: `/${current}/tx/${key}` });

      //     this.$router.push({ name: 'transaction', params: { chain: c.chain_name, hash: key } })
    } else if (addr.test(key)) {
      vueRouters.push({ path: `/${current}/account/${key}` });
    } else if (smartTokenDenom.test(key)) {
      vueRouters.push({ path: `/${current}/smarttoken/${key}` });
    } else if (mnsName.test(key)) {
      vueRouters.push({ path: `/${current}/mns/${key}` });
    } else {
      errorMessage.value = 'The input not recognized';
    }
  }
}

let intervalId: number | NodeJS.Timer | undefined;

function loadTxs() {
  blockchain.rpc
    .getTxs(
      '?&pagination.reverse=true&events=message.action=%27%27',
      {},
      pageRequest.value
    )
    .then((x) => {
      txs.value = x.tx_responses?.reverse().slice(0, 10);
    });
}

onMounted(() => {
  store.loadDashboard();
  loadTxs();
  intervalId = setInterval(loadTxs, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
<template>
  <div>
    <bg-gradient-blur variant="big explorer"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <div class="flex items-center justify-between mb-2 flex-1">
        <h1 class="text-4xl font-bold p-4">{{ $t('module.explorer') }}</h1>

        <div class="flex items-center">
          <RouterLink
            class="btn text-primary btn-sm mx-2"
            :to="`/${chain}/explorer/holders`"
          >
            <Icon icon="uil:wallet" class="text-lg text-primary" />
            {{ $t('smarttoken.holders') }}
          </RouterLink>

          <RouterLink class="btn text-primary btn-sm" :to="`/${chain}/params`">
            <Icon icon="uil:wrench" class="text-lg text-primary" />
            {{ $t('module.parameters') }}
          </RouterLink>
        </div>
      </div>

      <div class="search-hero mb-8">
        <div class="input-group shadow-lg rounded-full flex">
          <input
            class="input flex-1 w-full"
            v-model="searchQuery"
            :placeholder="isFocused ? '' : $t('block.search_placeholder')"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @keyup.enter="confirm"
          />
          <button class="btn btn-primary rounded-full btn-md" @click="confirm">
            <Icon icon="uil:search" class="text-lg" />
          </button>
        </div>
        <div
          class="mt-2 mb-4 text-center text-sm text-error"
          v-show="errorMessage"
        >
          {{ errorMessage }}
        </div>
      </div>

      <div class="px-4 pt-4 pb-4 card-title">
        {{ $t('index.mchain_stats') }}
      </div>
      <div class="grid grid-cols-2 gap-4 md:!grid-cols-3 lg:!grid-cols-6 mb-8">
        <div v-for="(item, key) in store.stats" :key="key">
          <CardStatisticsVertical class="shadow-lg" v-bind="item" />
        </div>
      </div>

      <div class="md:flex flex-row gap-4">
        <div class="blocks md:w-1/3">
          <div class="flex justify-between p-4">
            <h2 class="card-title">{{ $t('module.blocks') }}</h2>
            <RouterLink
              :to="`/${chain}/block/`"
              class="btn btn-xs btn-outline btn-neutral"
            >
              {{ $t('module.view_all') }}
            </RouterLink>
          </div>
          <div class="bg-base-100 shadow-lg pb-4 rounded-3xl mb-4">
            <div class="overflow-x-auto">
              <table class="table table-zebra table-md w-full text-sm">
                <thead>
                  <tr>
                    <th class="py-3">
                      {{ $t('account.height') }}/{{ $t('account.time') }}
                    </th>
                    <th class="py-3 text-right">
                      {{ $t('account.validator') }}/txs
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr v-for="(item, index) in blocks" :key="index">
                    <td class="truncate py-2" style="max-width: 200px">
                      <RouterLink
                        :to="`/${chain}/block/${item.block.header.height}`"
                        class="text-sm font-bold text-primary hover:underline"
                      >
                        #{{ item.block.header.height }}
                      </RouterLink>
                      <div class="text-xs">
                        {{ format.toDay(item.block?.header?.time, 'from') }}
                      </div>
                    </td>
                    <td class="py-2 h-14 text-right">
                      <div class="text-sm font-bold">
                        {{
                          format.validator(item.block?.header?.proposer_address)
                        }}
                      </div>
                      <div class="text-xs">
                        {{ item.block?.data?.txs.length }} txs
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="transactions md:w-2/3">
          <div class="flex justify-between p-4">
            <h2 class="card-title">{{ $t('account.transactions') }}</h2>
            <RouterLink :to="`/${chain}/tx/`" class="btn btn-xs btn-outline">
              {{ $t('module.view_all') }}
            </RouterLink>
          </div>
          <!-- Transactions -->
          <div class="bg-base-100 shadow-lg pb-4 rounded-3xl mb-4">
            <div class="overflow-x-auto">
              <table class="table table-zebra table-lg w-full">
                <thead>
                  <tr>
                    <th class="py-3">{{ $t('account.hash') }}</th>
                    <th class="py-3">{{ $t('account.message') }}</th>
                    <th class="py-3">{{ $t('account.height') }}</th>
                    <th class="py-3 text-right">{{ $t('account.time') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, index) in txs" :key="index">
                    <td class="truncate py-2 h-14" style="max-width: 200px">
                      <RouterLink
                        :to="`/${chain}/tx/${v.txhash}`"
                        class="text-sm text-primary font-bold"
                      >
                        {{ v.txhash }}
                      </RouterLink>
                    </td>
                    <td class="flex items-center pt-4">
                      <span
                        class="badge badge-success badge-sm bg-green-100 text-green-800 mr-2"
                      >
                        {{ format.messages(v.tx.body.messages) }}
                      </span>
                    </td>
                    <td class="text-sm py-2">
                      <RouterLink
                        :to="`/${chain}/block/${v.height}`"
                        class="text-primary font-bold"
                        >#{{ v.height }}</RouterLink
                      >
                    </td>
                    <td class="py-3 text-xs text-right whitespace-nowrap">
                      {{ format.toDay(v.timestamp, 'from') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      i18n: 'explorer',
      order: 5,
    }
  }
</route>
