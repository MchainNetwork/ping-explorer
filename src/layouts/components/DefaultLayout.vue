<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// Components
import newFooter from '@/layouts/components/NavFooter.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import NavbarSearch from '@/layouts/components/NavbarSearch.vue';
import ChainProfile from '@/layouts/components/ChainProfile.vue';

import { useDashboard } from '@/stores/useDashboard';
import { useBlockchain } from '@/stores';

import NavBarI18n from './NavBarI18n.vue';
import NavBarWallet from './NavBarWallet.vue';

import menu from '../../menu.json';

import type {
  NavGroup,
  NavLink,
  NavSectionTitle,
  VerticalNavItems,
} from '../types';

const dashboard = useDashboard();
dashboard.initial();
const blockchain = useBlockchain();
blockchain.randomSetupEndpoint();

const current = ref(''); // the current chain
const temp = ref('');
blockchain.$subscribe((m, s) => {
  if (current.value === s.chainName && temp.value != s.endpoint.address) {
    temp.value = s.endpoint.address;
    blockchain.initial();
  }
  if (current.value != s.chainName) {
    current.value = s.chainName;
    blockchain.randomSetupEndpoint();
  }
});

const sidebarShow = ref(false);
const sidebarOpen = ref(true);

const changeOpen = (index: Number) => {
  if (index === 0) {
    sidebarOpen.value = !sidebarOpen.value;
  }
};

function isNavGroup(nav: VerticalNavItems | any): nav is NavGroup {
  return (<NavGroup>nav).children !== undefined;
}
function isNavLink(nav: VerticalNavItems | any): nav is NavLink {
  return (<NavLink>nav).to !== undefined;
}
function isNavTitle(nav: VerticalNavItems | any): nav is NavSectionTitle {
  return (<NavSectionTitle>nav).heading !== undefined;
}
function selected(route: any, nav: NavLink) {
  const b =
    route.path === nav.to?.path ||
    (route.path.startsWith(nav.to?.path) &&
      nav.title.indexOf('dashboard') === -1);
  return b;
}
</script>

<template>
  <div class="bg-gray-100 dark:bg-[#17191c]">
    <!-- sidebar -->
    <div
      class="w-64 fixed z-50 left-0 top-0 bottom-0 overflow-auto bg-base-100 border-r border-gray-100 dark:border-gray-800 shadow-lg"
      :class="{ block: sidebarShow, 'hidden xl:!block': !sidebarShow }"
    >
      <div class="flex justify-between mt-1 pl-6 py-4 mb-10">
        <RouterLink to="/" class="flex items-center">
          <img class="w-10 h-10 ml-2" src="../../assets/mchain.svg" />
          <h1
            class="flex-1 ml-3 text-lg md:text-2xl font-semibold dark:text-white"
          >
            Mchain
          </h1>
        </RouterLink>
        <div
          class="pr-4 cursor-pointer xl:!hidden"
          @click="sidebarShow = false"
        >
          <Icon icon="mdi-close" class="text-2xl" />
        </div>
      </div>
      <div v-for="(item, index) of menu" :key="index" class="px-2">
        <div
          v-if="isNavGroup(item)"
          :tabindex="index"
          class="collapse"
          :class="{
            'collapse-arrow': item?.children?.length > 0,
            'collapse-open': index === 0 && sidebarOpen,
            'collapse-close': index === 0 && !sidebarOpen,
          }"
        >
          <input
            type="checkbox"
            class="cursor-pointer !h-10 block"
            @click="changeOpen(index)"
          />
          <div
            class="collapse-title !py-0 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#373f59] rounded-full"
          >
            <div
              class="text-base font-semibold flex-1 text-gray-700 dark:text-gray-200 pl-6 whitespace-nowrap hover:bg-gray-100 dark:hover:bg-[#373f59]"
            >
              {{ $t(item?.title) }}
            </div>
          </div>
          <div class="collapse-content px-0">
            <div
              :key="key"
              v-for="(el, key) of item?.children"
              class="menu bg-base-100 w-full !p-0"
            >
              <RouterLink
                v-if="isNavLink(el)"
                @click="sidebarShow = false"
                class="hover:bg-gray-100 dark:hover:bg-[#1e3b47] rounded-full cursor-pointer px-4 py-2 flex items-center"
                :class="{
                  'bg-gray-200 dark:bg-[#1e3b47]': selected($route, el),
                }"
                :to="el.to"
              >
                <div
                  class="text-base text-gray-500 dark:text-gray-300 pl-6"
                  :class="{
                    ' text-black dark:text-white': selected($route, el),
                  }"
                >
                  {{ $t(el?.title) }}
                </div>
              </RouterLink>
            </div>
          </div>
        </div>

        <RouterLink
          v-if="isNavLink(item)"
          :to="item.to"
          @click="sidebarShow = false"
          class="cursor-pointer px-4 flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#1e3b47] rounded-full"
          :class="{
            'bg-gray-200 dark:bg-[#1e3b47]': selected($route, item),
          }"
        >
          <div
            class="text-base font-semibold capitalize flex-1 text-gray-700 dark:text-gray-200 pl-6 whitespace-nowrap"
          >
            {{ $t(item?.title) }}
          </div>
        </RouterLink>
        <div
          v-if="isNavTitle(item)"
          class="px-4 text-sm text-gray-400 pb-2 uppercase"
        >
          {{ item?.heading }}
        </div>
      </div>
    </div>
    <div class="xl:!ml-64">
      <!-- header -->
      <div
        class="flex items-center py-3 bg-base-100 px-6 sticky top-0 z-10 shadow-sm"
      >
        <div
          class="text-2xl pr-3 cursor-pointer xl:!hidden"
          @click="sidebarShow = true"
        >
          <Icon icon="mdi-menu" />
        </div>

        <ChainProfile />

        <div class="flex-1 w-0"></div>

        <!-- <NavSearchBar />-->
        <NavbarSearch class="!inline-block" />
        <NavBarI18n class="hidden md:!inline-block" />
        <NavbarThemeSwitcher class="!inline-block" />
        <NavBarWallet />
      </div>

      <!-- 👉 Pages -->
      <div style="min-height: calc(100vh - 72px)" class="p-4">
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>

      <newFooter />
    </div>
  </div>
</template>
