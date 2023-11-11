<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
  useMnsStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type MnsForsale,
  type MnsBids,
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

const list = ref([] as MnsBids[]);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

function updateState() {
  walletStore.loadMyAsset();
  pageload(1);
}

onMounted(() => {
  pageload(1);
});

function pageload(p: number) {
  pageRequest.value.setPage(p);
  mnsStore.fetchMnsBids().then((x: any) => {
    list.value = x.bids;
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
        {{ $t('mns.domains_in_bid_title') }}
      </h2>
      <div></div>
    </div>
    <div class="tabs mb-4 text-center">
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/registered`">
        {{ $t('mns.registered_names_title') }}
      </RouterLink>
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/forsale`">
        {{ $t('mns.domains_for_sale_title') }}
      </RouterLink>
      <RouterLink
        class="tab tab-bordered tab-active"
        :to="`/${chain}/mns/bids`"
      >
        {{ $t('mns.domains_in_bid_title') }}
      </RouterLink>
      <RouterLink class="tab tab-bordered" :to="`/${chain}/mns/owned`">
        {{ $t('mns.domains_owned_title') }}
      </RouterLink>
    </div>
    <div class="bg-base-100 p-4 rounded-3xl">
      <div class="overflow-x-auto">
        <table class="table table-compact">
          <thead>
            <tr>
              <td>{{ $t('mns.domain_label') }}</td>
              <td>{{ $t('mns.bid_label') }}</td>
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
                :to="'/mchain/mns/' + item.name"
                class="hover:underline"
              >
                {{ item.name }}
              </RouterLink>
            </td>
            <td>
              {{ format.formatToken2(format.parseCoin(item.price), true) }}
            </td>
            <td class="text-right" width="10%">
              <label
                v-if="item.bidder != walletStore.currentAddress"
                for="mns_bid"
                class="btn btn-primary btn-xs"
                @click="
                  dialog.open('mns_bid', { name: item.name }, updateState)
                "
              >
                {{ $t('mns.bid_label') }}
              </label>
              <label
                v-if="item.bidder == walletStore.currentAddress"
                for="mns_cancelbid"
                class="btn btn-primary btn-xs"
                @click="
                  dialog.open(
                    'mns_cancel_bid',
                    { name: item.name },
                    updateState
                  )
                "
              >
                Cancel
              </label>
            </td>
          </tr>
        </table>
      </div>
      <PaginationBar
        :limit="pageRequest.limit"
        :total="pageResponse.total"
        :callback="pageload"
      />
    </div>
  </div>
</template>
