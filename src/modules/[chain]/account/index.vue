<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useBlockchain, useFormatter } from '@/stores';
import { PageRequest, type AuthAccount, type Pagination } from '@/types';
import { onMounted } from 'vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

// @ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
const props = defineProps(['chain']);

const chainStore = useBlockchain();

const accounts = ref([] as AuthAccount[]);
const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

onMounted(() => {
  pageload(1);
});

function pageload(p: number) {
  pageRequest.value.setPage(p);
  chainStore.rpc.getAuthAccounts(pageRequest.value).then((x) => {
    accounts.value = x.accounts;
    pageResponse.value = x.pagination;
  });
}

function showType(v: string) {
  return v.replace('/cosmos.auth.v1beta1.', '');
}
function findField(v: any, field: string) {
  if (!v || Array.isArray(v) || typeof v === 'string') return null;
  const fields = Object.keys(v);
  if (fields.includes(field)) {
    return v[field];
  }
  for (let i = 0; i < fields.length; i++) {
    const re: any = findField(v[fields[i]], field);
    if (re) return re;
  }
}
function showAddress(v: any) {
  return findField(v, 'address');
}
function showAccountNumber(v: any) {
  return findField(v, 'account_number');
}
function showSequence(v: any) {
  return findField(v, 'sequence');
}
function showPubkey(v: any) {
  return findField(v, 'pub_key');
}
</script>
<template>
  <div>
    <bg-gradient-blur variant="big home"></bg-gradient-blur>
    <div class="relative overflow-auto mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:!text-4xl font-bold mb-6 p-4">Accounts</h1>
        <div class="pr-4"></div>
      </div>

      <div class="bg-base-100 p-4 rounded-3xl">
        <div class="overflow-x-auto">
          <table class="table table-compact">
            <thead>
              <tr>
                <td>{{ $t('account.address') }}</td>
                <td width="50%">{{ $t('account.type') }}</td>
              </tr>
            </thead>
            <tr :key="index" v-for="(acc, index) in accounts">
              <td class="flex items-center">
                <IdentityIcon
                  size="sm"
                  :address="showAddress(acc)"
                  class="mr-4"
                />
                <RouterLink
                  :to="`/${chain}/account/${showAddress(acc)}`"
                  class="link link-primary hover:underline"
                >
                  {{ showAddress(acc) }}
                </RouterLink>
              </td>
              <td>{{ showType(acc['@type']) }}</td>
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
  </div>
</template>
