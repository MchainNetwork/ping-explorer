<script lang="ts" setup>
import { useParamStore } from '@/stores';
import { ref, onMounted } from 'vue';
import CardParameter from '@/components/CardParameter.vue';
import { Icon } from '@iconify/vue';
import ArrayObjectElement from '@/components/dynamic/ArrayObjectElement.vue';
const store = useParamStore();
const chain = ref(store.chain);
onMounted(() => {
  // fetch the data
  store.initial();
});
</script>
<template>
  <div class="overflow-hidden mx-auto max-w-screen-lg">
    <div class="flex items-center mb-2 flex-1">
      <a @click="$router.go(-1)" class="btn btn-ghost btn-circle btn-sm mx-1">
        <Icon
          icon="uil:angle-left"
          class="text-3xl text-gray-500 dark:text-gray-400"
        />
      </a>
      <h1 class="text-4xl font-bold p-4">{{ $t('module.parameters') }}</h1>
    </div>

    <!-- Chain ID -->
    <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl">
      <div class="text-base mb-3 text-main">{{ chain.title }}</div>
      <div class="grid grid-cols-2 md:!grid-cols-4 gap-4">
        <div
          v-for="(item, index) of chain.items"
          :key="index"
          class="rounded-xl bg-gray-100 dark:bg-[#1e3b47] px-4 py-2"
        >
          <div class="text-xs mb-2 text-gray-600 dark:text-gray-400">
            {{ $t(item.subtitle) }}
          </div>
          <div class="text-base text-main">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <!-- minting Parameters  -->
    <CardParameter :cardItem="store.mint" />
    <!-- Staking Parameters  -->
    <CardParameter :cardItem="store.staking" />
    <!-- Smart Token Parameters  -->
    <CardParameter :cardItem="store.smarttoken" />
    <!-- MNS Parameters -->
    <CardParameter :cardItem="store.mns" />
    <!-- Bmint Parameters -->
    <CardParameter :cardItem="store.bmint" />
    <!-- Governance Parameters -->
    <CardParameter :cardItem="store.gov" />
    <!-- Distribution Parameters -->
    <CardParameter :cardItem="store.distribution" />
    <!-- Slashing Parameters -->
    <CardParameter :cardItem="store.slashing" />
    <!-- Application Version -->
    <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl mt-6">
      <div class="text-base mb-3 text-main">{{ store.appVersion?.title }}</div>
      <ArrayObjectElement :value="store.appVersion?.items" :thead="false" />
    </div>

    <!-- Node Information -->
    <div class="bg-base-100 px-4 pt-3 pb-4 rounded-xl mt-6">
      <div class="text-base mb-3 text-main">{{ store.nodeVersion?.title }}</div>
      <ArrayObjectElement :value="store.nodeVersion?.items" :thead="false" />
    </div>
  </div>
</template>

<route>
{
  meta: {
    i18n: 'parameters',
    order: 7
  }
}
</route>
