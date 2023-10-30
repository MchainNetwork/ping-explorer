<script lang="ts" setup>
import { useGovStore, useTxDialog } from '@/stores';
import ProposalListItem from '@/components/ProposalListItem.vue';
import { ref, onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
import { PageRequest } from '@/types';

const tab = ref('2');
const store = useGovStore();
const dialog = useTxDialog();

const pageRequest = ref(new PageRequest());

onMounted(() => {
  store.fetchProposals('1');
  store.fetchProposals('2').then((x) => {
    if (x?.proposals?.length === 0) {
      tab.value = '3';
      store.fetchProposals('3');
    }
    store.fetchProposals('3');
    store.fetchProposals('4');
  });
});

const changeTab = (val: '1' | '2' | '3' | '4') => {
  tab.value = val;
};

function updateState() {}

function page(p: number) {
  pageRequest.value.setPage(p);
  store.fetchProposals(tab.value, pageRequest.value);
}
</script>
<template>
  <div class="mx-auto max-w-screen-lg">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold mb-4 p-4">Governance</h1>
      <div class="pr-4">
        <label
          for="submit_proposal"
          class="btn btn-primary btn-sm rounded-full text-white"
          @click="dialog.open('submit_proposal', {}, updateState)"
        >
          Submit Proposal
        </label>
      </div>
    </div>
    <div class="tabs mb-4 text-center">
      <a
        class="tab tab-lg tab-bordered text-gray-400"
        :class="{ 'tab-active': tab === '1' }"
        @click="changeTab('1')"
        >{{ $t('gov.deposit') }}</a
      >
      <a
        class="tab tab-lg tab-bordered text-gray-400"
        :class="{ 'tab-active': tab === '2' }"
        @click="changeTab('2')"
        >{{ $t('gov.voting') }}</a
      >
      <a
        class="tab tab-lg tab-bordered text-gray-400"
        :class="{ 'tab-active': tab === '3' }"
        @click="changeTab('3')"
        >{{ $t('gov.passed') }}</a
      >
      <a
        class="tab tab-lg tab-bordered text-gray-400"
        :class="{ 'tab-active': tab === '4' }"
        @click="changeTab('4')"
        >{{ $t('gov.rejected') }}</a
      >
    </div>
    <ProposalListItem :proposals="store?.proposals[tab]" />
    <div v-if="!store?.proposals[tab]?.proposals?.length">
      No proposal matching the specified criteria was found.
    </div>
    <PaginationBar
      :total="store?.proposals[tab]?.pagination?.total"
      :limit="pageRequest.limit"
      :callback="page"
    />
  </div>
</template>
<route>
  {
    meta: {
      i18n: 'governance',
      order: 5
    }
  }
</route>
