<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
  useMnsStore,
  useBaseStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type MnsForsale,
} from '@/types';
import { onMounted } from 'vue';
// @ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
import IdentityIcon from '@/components/IdentityIcon.vue';
import { Icon } from '@iconify/vue';

const props = defineProps(['chain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();
const baseStore = useBaseStore();

const list = ref([] as MnsNames[]);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

// TODO: mintParam.items.block_per_year
const blocksPerYear = 5057308;

const calculateTimeRemaining = (itemExpires: number, currentHeight: number) => {
  const blocksRemaining = itemExpires - currentHeight;
  const timeRemainingInSec = (blocksRemaining / blocksPerYear) * 31557600;
  const timeRemainingInMs = timeRemainingInSec * 1000;
  return parseFloat(timeRemainingInMs.toFixed(0));
};

const calculateExpiryTime = (itemExpires: number, currentHeight: number) => {
  const timeRemaining = calculateTimeRemaining(itemExpires, currentHeight);
  const date = new Date();
  date.setTime(date.getTime() + timeRemaining);
  return date.getTime();
};

function updateState() {
  walletStore.loadMyAsset();
  pageload(1);
}

onMounted(() => {
  pageload(1);
});

function pageload(p: number) {
  pageRequest.value.setPage(p);
  mnsStore.fetchMnsNames(pageRequest.value).then((x: any) => {
    list.value = x.names;
    pageResponse.value = x.pagination;
  });
}
</script>
<template>
  <div class="overflow-auto mx-auto max-w-screen-lg">
    <div class="flex justify-between items-center m-4 ml-0 mb-6">
      <RouterLink
        :to="`/${chain}/mns`"
        class="btn btn-ghost btn-circle btn-sm mx-1"
      >
        <Icon
          icon="uil:angle-left"
          class="text-3xl text-gray-500 dark:text-gray-400"
        />
      </RouterLink>
      <h2 class="text-xl md:!text-4xl font-bold flex-1 ml-2">
        {{ $t('mns.registered_names_title') }}
      </h2>
      <div></div>
    </div>
    <div class="tabs mb-4 text-center">
      <RouterLink
        class="tab tab-bordered tab-active"
        :to="`/${chain}/mns/registered`"
      >
        {{ $t('mns.registered_names_title') }}
      </RouterLink>
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/forsale`">
        {{ $t('mns.domains_for_sale_title') }}
      </RouterLink>
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/bids`">
        {{ $t('mns.domains_in_bid_title') }}
      </RouterLink>
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/owned`">
        {{ $t('mns.domains_owned_title') }}
      </RouterLink>
    </div>
    <div class="bg-base-100 p-4 rounded-3xl">
      <table class="table table-compact">
        <thead>
          <tr>
            <td>{{ $t('mns.domain_label') }}</td>
            <td>{{ $t('mns.expires_label') }}</td>
            <td></td>
          </tr>
        </thead>
        <tr
          :key="item.name"
          v-for="item in list"
          class="hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <td width="20%">
            <RouterLink
              :to="'/mchain/mns/' + item.name + '.' + item.tld"
              class="hover:underline"
            >
              {{ item.name }}.{{ item.tld }}
            </RouterLink>
          </td>
          <td>
            {{
              format.toDay(
                calculateExpiryTime(
                  item.expires,
                  Number(baseStore.latest?.block?.header?.height) || 0
                ),
                'date'
              )
            }}
          </td>
          <td class="text-right" width="10%">
            <label
              v-if="item.value != walletStore.currentAddress"
              for="mns_bid"
              class="btn btn-primary btn-xs"
              @click="
                dialog.open(
                  'mns_bid',
                  { name: item.name + '.' + item.tld },
                  updateState
                )
              "
            >
              {{ $t('mns.bid_label') }}
            </label>
            <label
              v-if="item.value == walletStore.currentAddress"
              for="mns_list"
              class="btn btn-primary btn-xs"
              @click="
                dialog.open(
                  'mns_list',
                  { name: item.name + '.' + item.tld },
                  updateState
                )
              "
            >
              Sell
            </label>
          </td>
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
