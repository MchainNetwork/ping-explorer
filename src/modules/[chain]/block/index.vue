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
  <div>
    <bg-gradient-blur variant="big explorer"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
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
        <h1 class="text-2xl md:!text-4xl font-bold p-4">
          {{ $t('module.blocks') }}
        </h1>
      </div>

      <div class="bg-base-100 shadow-lg p-4 rounded-3xl mb-4">
        <div class="overflow-x-auto">
          <table class="table table-md w-full text-sm">
            <thead>
              <tr>
                <th class="py-3">
                  {{ $t('account.height') }}
                </th>
                <th class="py-3">{{ $t('account.validator') }}</th>
                <th class="py-3">{{ $t('account.transactions') }}</th>
                <th class="py-3 text-right">
                  {{ $t('account.time') }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(item, index) in blocks"
                :key="index"
                class="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <td class="truncate py-2" style="max-width: 200px">
                  <RouterLink
                    :to="`/${chain}/block/${item.block.header.height}`"
                    class="text-sm font-bold text-primary hover:underline"
                  >
                    #{{ item.block.header.height }}
                  </RouterLink>
                </td>
                <td class="py-2">
                  <div class="text-sm font-bold">
                    {{ format.validator(item.block?.header?.proposer_address) }}
                  </div>
                </td>

                <td class="py-2 h-14" width="20%">
                  <div class="text-xs">
                    {{ item.block?.data?.txs.length }} txs
                  </div>
                </td>
                <td class="text-xs text-right" width="20%">
                  {{ format.toDay(item.block?.header?.time, 'from') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
