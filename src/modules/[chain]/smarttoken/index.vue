<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
} from '@/stores';
import { PageRequest, type Pagination, type SmartTokenDenom } from '@/types';
import { onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['chain']);

const format = useFormatter();
const smartTokenStore = useSmartTokenStore();
const walletStore = useWalletStore();
const dialog = useTxDialog();

const list = ref([] as SmartTokenDenom[]);

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
  smartTokenStore.fetchSmartTokens().then((x) => {
    list.value = x.smarttokens;
    pageResponse.value = x.pagination;
  });
}
</script>
<template>
  <div class="overflow-auto mx-auto max-w-screen-lg">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold mb-6 p-4">Smart Tokens</h1>
      <div class="pr-4">
        <label
          for="issue"
          class="btn btn-primary btn-sm rounded-full text-white"
          @click="dialog.open('issue', {}, updateState)"
        >
          {{ $t('smarttoken.issue') }}
        </label>
      </div>
    </div>

    <div class="bg-base-100 p-4 rounded-xl">
      <table class="table table-compact text-base">
        <thead>
          <tr>
            <td>{{ $t('smarttoken.denom') }}</td>
            <td>{{ $t('smarttoken.symbol') }}</td>
            <td>{{ $t('smarttoken.name') }}</td>
          </tr>
        </thead>
        <tr
          :key="item.denom"
          v-for="item in list"
          class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <td class="truncate flex" width="80%">
            <IdentityIcon size="small" :address="item.denom" />
            <RouterLink
              :to="'/mchain/smarttoken/' + item.denom"
              class="hover:underline text-sm ml-2"
              >{{ item.denom }}</RouterLink
            >
          </td>
          <td width="10%" class="uppercase">{{ item.meta_data.symbol }}</td>
          <td>{{ item.meta_data.name }}</td>
          <td class="text-right">
            <label
              v-if="walletStore.currentAddress === item.minter"
              for="mint"
              class="btn btn-success btn-xs ml-2 rounded-full"
              @click="dialog.open('mint', { denom: item.denom }, updateState)"
            >
              {{ $t('smarttoken.mint') }}
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

<route>
  {
    meta: {
      i18n: 'smart_tokens',
      order: 2
    }
  }
</route>

