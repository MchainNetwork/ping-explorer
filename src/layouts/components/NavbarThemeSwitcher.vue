<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, onUnmounted, computed, watch } from 'vue';
import { useBaseStore } from '@/stores';

const themeMap: Record<string, string> = {
  system: 'mdi-laptop',
  light: 'mdi-weather-sunny',
  dark: 'mdi-weather-night',
};
const baseStore = useBaseStore();

// Reactive reference for system's color scheme preference
const prefersDark = computed(
  () => window.matchMedia('(prefers-color-scheme: dark)').matches
);

const theme = computed(() => baseStore.theme);

// Function to apply the theme
const applyTheme = (themeValue: 'dark' | 'light') => {
  if (themeValue === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
  document.documentElement.setAttribute('data-theme', themeValue);
  window.localStorage.setItem('theme', themeValue);
  baseStore.theme = themeValue;
};

// Function to change the mode
const changeMode = () => {
  applyTheme(theme.value === 'light' ? 'dark' : 'light');
};

// Watch for changes in system's color scheme preference
watch(prefersDark, (newVal) => {
  applyTheme(newVal ? 'dark' : 'light');
});

onMounted(() => {
  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme) {
    applyTheme(storedTheme as 'dark' | 'light');
  } else {
    // If no theme is stored, use the system preference
    applyTheme(prefersDark.value ? 'dark' : 'light');
  }
});

// Event listener for changes in system's color scheme
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  console.log(e.matches);
  applyTheme(e.matches ? 'dark' : 'light');
};
mediaQuery.addEventListener('change', handleSystemThemeChange);

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange);
});
</script>

<template>
  <div class="tooltip tooltip-bottom delay-1000">
    <button class="btn btn-ghost btn-circle btn-sm mx-1" @click="changeMode">
      <Icon
        :icon="themeMap?.[theme]"
        class="text-2xl text-gray-500 dark:text-gray-400"
      />
    </button>
  </div>
</template>
