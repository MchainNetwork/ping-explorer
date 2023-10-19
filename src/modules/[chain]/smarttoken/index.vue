<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useFormatter, useSmartTokenStore, useTxDialog, useWalletStore } from '@/stores';
import { PageRequest, type Pagination, type SmartTokenDenom } from '@/types';
import { onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
const props = defineProps(['chain']);

const format = useFormatter();
const smartTokenStore = useSmartTokenStore()
const walletStore = useWalletStore();
const dialog = useTxDialog();

const list = ref([] as SmartTokenDenom[])

const pageRequest = ref(new PageRequest())
const pageResponse = ref({} as Pagination)

function updateState() {
  walletStore.loadMyAsset()
}

onMounted(() => {
  pageload(1)
});

function pageload(p: number) {
  pageRequest.value.setPage(p)
  smartTokenStore.fetchSmartTokens().then(x => {
    console.log(x)
    list.value = x.smarttokens
    pageResponse.value = x.pagination
  });
}

</script>
<template>
    <div class="overflow-auto">

        <div class="flex justify-between items-center m-4">
          <h2 class="text-xl font-bold text-base">Smart Tokens</h2>
          <div>
            <label 
              for="issue" 
              class="btn btn-primary btn-sm rounded-full text-white" 
              @click="dialog.open('issue', {}, updateState)">
                {{ $t('issue') }}
            </label>
            <label 
              for="mint" 
              class="btn btn-primary btn-sm ml-2 rounded-full text-white" 
              @click="dialog.open('mint', {}, updateState)">
                {{ $t('mint') }}
            </label>
          </div>
        </div>

        <table class="table table-compact text-xl">
            <thead>
                <tr>
                    <td>Denom</td>
                    <td>Name</td>
                    <td>Symbol</td>
                </tr>
            </thead>
            <tr :key="item.denom" v-for="item in list">
                <td class="truncate"><RouterLink :to="'/mchain/smarttoken/'+encodeURIComponent(item.denom)" class="hover:underline">{{ item.denom }}</RouterLink></td>
                <td>{{ item.meta_data.name }}</td>
                <td width="10%" class="uppercase">{{ item.meta_data.symbol }}</td>
            </tr>
        </table>
        <PaginationBar :limit="pageRequest.limit" :total="pageResponse.total" :callback="pageload" />
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

