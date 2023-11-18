<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
  useBlockchain,
} from '@/stores';

import { PageRequest, type Pagination, type SmartTokenDenom } from '@/types';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';

//@ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['chain']);

const format = useFormatter();
const smartTokenStore = useSmartTokenStore();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const blockchain = useBlockchain();

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

  blockchain.rpc
    ?.getSmartTokenSmartTokens(undefined, pageRequest.value)
    .then((x) => {
      list.value = x.smarttokens;
      pageResponse.value = x.pagination;
    });
}
</script>
<template>
  <div>
    <bg-gradient-blur variant="big smarttoken"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl md:!text-4xl font-bold p-4">
          {{ $t('module.smart_tokens') }}
        </h1>
        <div class="pr-4">
          <label
            for="smarttoken_issue"
            class="btn btn-primary btn-sm rounded-full text-white"
            @click="dialog.open('smarttoken_issue', {}, updateState)"
          >
            {{ $t('smarttoken.issue') }}
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <RouterLink
          v-for="item in list"
          :key="item.denom"
          :to="'/mchain/smarttoken/' + item.denom"
          class="card bg-base-100 shadow-xl hover:bg-gray-100 dark:hover:bg-[#1e3b47] overflow-hidden"
        >
          <div class="card-body">
            <div class="flex items-center space-x-4">
              <IdentityIcon
                :text="item.symbol"
                size="md"
                :address="item.denom"
              />
              <div>
                <h2 class="whitespace-nowrap truncate">
                  <span class="card-title truncate inline">{{
                    item.name
                  }}</span>
                  (<span class="uppercase">{{ item.symbol }}</span
                  >)
                </h2>
                <p class="text-sm opacity-40">
                  {{ format.shortTokenDenom(item.denom) }}
                </p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

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
