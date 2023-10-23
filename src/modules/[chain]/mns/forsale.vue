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
} from '@/types';
import { onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['chain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();

const list = ref([] as MnsForsale[]);

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
  mnsStore.fetchMnsForsale().then((x: any) => {
    list.value = x.forsale;
    pageResponse.value = x.pagination;
  });
}
</script>
<template>
  <div class="overflow-auto">
    <div class="flex justify-between items-center m-4 mb-6">
      <h2 class="text-xl md:text-5xl font-bold text-base">For Sale</h2>
      <div></div>
    </div>

    <div class="bg-base-100 p-4 rounded-xl">
      <table class="table table-compact text-lg">
        <thead>
          <tr>
            <td>Domain</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tr
          :key="item.name"
          v-for="item in list"
          class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
          <td class="text-right">
            <label
              for="mns_buy"
              class="btn btn-primary btn-sm rounded-full text-white"
              @click="dialog.open('mns_buy', { name: item.name }, updateState)"
            >
              Buy
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
