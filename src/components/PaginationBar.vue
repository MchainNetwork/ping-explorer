<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  total: { type: String },
  limit: { type: Number, default: 20 },
  callback: { type: Function, required: true },
});
const current = ref(1);
const showSize = 3;
const pages = computed(() => {
  const pages: { color: string; page: number }[] = [];
  const total = Number(props.total || 0);
  if (total > 0 && props.limit && total > props.limit) {
    let page = 0;
    while (true) {
      if (page * props.limit >= total) break;
      page += 1;
      if (
        total / props.limit > 10 &&
        page > showSize &&
        page < total / props.limit - showSize + 1
      ) {
        if (!(page >= current.value - 1 && page <= current.value + 1)) {
          continue;
        }
      }
      pages.push({
        color: page === current.value ? 'btn-primary' : '',
        page: page,
      });
    }
  }
  return pages;
});

const canGoPrev = computed(() => current.value > 1);
const canGoNext = computed(
  () => current.value < Math.ceil(Number(props.total) / (props.limit || 20))
);

function goToPrev() {
  if (canGoPrev.value) {
    gotoPage(current.value - 1);
  }
}

function goToNext() {
  if (canGoNext.value) {
    gotoPage(current.value + 1);
  }
}

function gotoPage(pageNum: number) {
  current.value = pageNum;
  props.callback(pageNum);
}
</script>
<template>
  <div class="my-5 text-center" v-if="pages.length">
    <div class="btn-group">
      <button class="btn" :disabled="!canGoPrev" @click="goToPrev">
        <Icon icon="uil:arrow-left" class="text-3xl" />
      </button>
      <button
        v-for="{ page, color } in pages"
        :key="page"
        class="btn bg-gray-100 text-gray-500 hover:text-white border-none dark:bg-gray-800 dark:text-white"
        :class="{
          '!btn-primary': color === 'btn-primary',
        }"
        @click="gotoPage(page)"
      >
        {{ page }}
      </button>
      <button class="btn" :disabled="!canGoNext" @click="goToNext">
        <Icon icon="uil:arrow-right" class="text-3xl" />
      </button>
    </div>
  </div>
</template>
