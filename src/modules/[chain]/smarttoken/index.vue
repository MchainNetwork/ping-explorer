<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useBlockchain, useFormatter, useSmartTokenStore } from '@/stores';
import { PageRequest, type AuthAccount, type Pagination, type Coin, type PaginatedSmartTokens } from '@/types';
import { onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
const props = defineProps(['chain']);

const format = useFormatter();
const chainStore = useBlockchain()
const smartTokenStore = useSmartTokenStore()

const list = ref([] as Coin[])

function showType(v: string) {
    return v.replace("/cosmos.auth.v1beta1.", "")
}

function shortAddress(address: string) {
  if(address.length > 4) {
    return `${address.substring(address.length -4)}`
  }
  return ""
}

const pageRequest = ref(new PageRequest())
const pageResponse = ref({} as Pagination)

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
        <table class="table table-compact text-xl">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Symbol</td>
                    <td>Max Supply</td>
                    <td>Minter</td>
                    <td>Denom</td>
                </tr>
            </thead>
            <tr :key="item.denom" v-for="item in list">
                <td>{{ item.meta_data.name  }}</td>
                <td width="10%" class="uppercase">{{ item.meta_data.symbol  }}</td>
                <td>{{ item.max_supply }}</td>
                <td class="truncate"><RouterLink :to="'/mchain/account/'+item.minter" :title="item.minter" class="hover:underline">{{ shortAddress(item.minter) }}</RouterLink></td>
                <td class="truncate">{{ item.denom  }}</td>
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

