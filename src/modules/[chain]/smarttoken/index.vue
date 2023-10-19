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
    console.log(x);
    list.value = x.smarttokens;
    pageResponse.value = x.pagination;
  });
}
</script>
<template>
  <div class="overflow-auto">
    <div class="flex justify-between items-center m-4 mb-6">
      <h2 class="text-5xl font-bold text-base">Smart Tokens</h2>
      <div>
        <label
          for="issue"
          class="btn btn-primary btn-sm rounded-full text-white"
          @click="dialog.open('issue', {}, updateState)"
        >
          {{ $t('issue') }}
        </label>
        <label
          for="mint"
          class="btn btn-primary btn-sm ml-2 rounded-full text-white"
          @click="dialog.open('mint', {}, updateState)"
        >
          {{ $t('mint') }}
        </label>
      </div>
    </div>

    <div class="bg-base-100 p-4 rounded-xl">
      <table class="table table-compact text-xl">
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Name</td>
            <td>Denom</td>
          </tr>
        </thead>
        <tr
          :key="item.denom"
          v-for="item in list"
          class="odd:bg-gray-100 dark:odd:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="
            $router.push('/mchain/smarttoken/' + encodeURIComponent(item.denom))
          "
        >
          <td width="10%" class="uppercase">{{ item.meta_data.symbol }}</td>
          <td>{{ item.meta_data.name }}</td>
          <td class="truncate">
            <RouterLink
              :to="'/mchain/smarttoken/' + encodeURIComponent(item.denom)"
              class="hover:underline"
              >{{ item.denom }}</RouterLink
            >
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
      i18n: 'smarttoken',
      order: 4
    }
  }
</route>

