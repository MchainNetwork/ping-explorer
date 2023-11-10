<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useFormatter } from '@/stores';
import { Icon } from '@iconify/vue';

const props = defineProps(['chain']);

const base = useBaseStore();
const format = useFormatter();

const blocks = computed(() => {
  const recents = base.recents;
  return recents.sort(
    (a, b) => Number(b.block.header.height) - Number(a.block.header.height)
  );
});
</script>
<template>
  <div class="mx-auto max-w-screen-lg">
    <div class="flex items-center mb-2 flex-1">
      <RouterLink
        :to="`/${chain}/explorer`"
        class="btn btn-ghost btn-circle btn-sm mx-1"
      >
        <Icon
          icon="uil:angle-left"
          class="text-3xl text-gray-500 dark:text-gray-400"
        />
      </RouterLink>
      <h1 class="text-4xl font-bold p-4">
        {{ $t('module.blocks') }}
      </h1>
    </div>

    <div class="grid grid-cols-1 gap-3">
      <RouterLink
        v-for="item in blocks"
        :key="item.block.header.height"
        class="flex flex-col justify-between rounded-xl p-4 bg-base-100 dark:bg-[#1e3b47] transform transition-all ease-in-out duration-500 opacity-0 translate-y-3 animate-fadeInSlideDown"
        :to="`/${chain}/block/${item.block.header.height}`"
      >
        <div class="flex justify-between">
          <h3 class="text-md font-bold sm:!text-lg">
            {{ item.block.header.height }}
          </h3>
          {{ item.block.header.last_block_id.hash }}
          <span
            class="rounded text-xs whitespace-nowrap font-medium text-green-600"
          >
            {{ format.toDay(item.block?.header?.time, 'from') }}
          </span>
        </div>
        <div class="flex justify-between tooltip" data-tip="Block Proposor">
          <div class="mt-2 hidden text-sm sm:!block truncate">
            <span>{{
              format.validator(item.block?.header?.proposer_address)
            }}</span>
          </div>
          <span class="text-right mt-1 whitespace-nowrap">
            {{ item.block?.data?.txs.length }} txs
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
<style>
.animate-fadeInSlideDown {
  animation: fadeInSlideDown 0.5s ease forwards;
}

@keyframes fadeInSlideDown {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<route>
    {
      meta: {
        i18n: 'blocks',
        order: 5
      }
    }
</route>
