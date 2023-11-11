<script lang="ts" setup>
import { useGovStore, useTxDialog } from '@/stores';
//@ts-ignore
import ProposalListItem from '@/components/ProposalListItem.vue';
import { ref, onMounted } from 'vue';
//@ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
import { PageRequest } from '@/types';
import { Icon } from '@iconify/vue';

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
  <div>
    <bg-gradient-blur variant="big gov"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold mb-4 p-4">
          {{ $t('gov.governance') }}
        </h1>
        <div class="pr-4">
          <label
            for="gov_submit_proposal"
            class="btn btn-primary btn-sm"
            @click="dialog.open('gov_submit_proposal', {}, updateState)"
          >
            {{ $t('gov.submit_proposal') }}
          </label>
        </div>
      </div>
      <div class="tabs mb-8 text-center">
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': tab === '1' }"
          @click="changeTab('1')"
          >{{ $t('gov.deposit_period') }}</a
        >
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': tab === '2' }"
          @click="changeTab('2')"
          >{{ $t('gov.voting') }}</a
        >
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': tab === '3' }"
          @click="changeTab('3')"
          >{{ $t('gov.passed') }}</a
        >
        <a
          class="tab tab-bordered"
          :class="{ 'tab-active': tab === '4' }"
          @click="changeTab('4')"
          >{{ $t('gov.rejected') }}</a
        >
      </div>
      <div
        class="text-center py-20"
        v-if="!store?.proposals[tab]?.proposals?.length"
      >
        <Icon
          icon="uil:file-landscape-alt"
          class="text-5xl text-gray-500 dark:text-gray-400 inline-block mb-8"
        />
        <div>{{ $t('gov.no_proposal_found') }}</div>
      </div>
      <ProposalListItem v-else :proposals="store?.proposals[tab]" />

      <PaginationBar
        :total="store?.proposals[tab]?.pagination?.total"
        :limit="pageRequest.limit"
        :callback="page"
      />
    </div>
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
