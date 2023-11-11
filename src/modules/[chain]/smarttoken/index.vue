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
import { Icon } from '@iconify/vue';

//@ts-ignore
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
  <div>
    <bg-gradient-blur variant="big smarttoken"></bg-gradient-blur>
    <div class="relative overflow-auto mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-xl md:!text-4xl font-bold p-4">Smart Tokens</h1>
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

      <div class="bg-base-100 p-4 rounded-3xl">
        <div class="overflow-x-auto">
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
              class="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <td class="flex no-wrap" width="80%">
                <IdentityIcon
                  :text="item.symbol"
                  size="sm"
                  :address="item.denom"
                />
                <div class="tooltip" :data-tip="item.denom">
                  <RouterLink
                    :to="'/mchain/smarttoken/' + item.denom"
                    class="hover:underline ml-4"
                  >
                    {{ format.shortTokenDenom(item.denom) }}
                  </RouterLink>
                </div>
              </td>
              <td width="10%" class="uppercase">{{ item.symbol }}</td>
              <td>{{ item.name }}</td>
              <td class="text-right">
                <RouterLink
                  :to="'/mchain/smarttoken/' + item.denom"
                  class="btn btn-ghost btn-circle btn-sm mx-1"
                >
                  <Icon
                    icon="uil:info-circle"
                    class="text-2xl text-gray-500 dark:text-gray-400"
                  />
                </RouterLink>
              </td>
            </tr>
          </table>
        </div>
        <PaginationBar
          v-if="
            pageResponse.total && parseInt(pageResponse.total) > list.length
          "
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
      i18n: 'smart_tokens',
      order: 2
    }
  }
</route>
