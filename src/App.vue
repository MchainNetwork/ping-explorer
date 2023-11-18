<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { themeChange } from 'theme-change';
import TxDialog from './components/TxDialog.vue';

const { locale } = useI18n();

watchEffect(() => {
  const currentLang = locale.value;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
});

onMounted(() => {
  themeChange(false);
});
</script>

<template>
  <div>
    <RouterView />
    <TxDialog />
  </div>
</template>
