<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
  useMnsStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type MnsForsale,
} from '@/types';
import { onMounted } from 'vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['domain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();

const domainInfo = ref({} as MnsNames);
const forSale = ref({} as MnsForsale);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const isLoading = ref(true);

let domainName: string = props.domain;

const isDomainRegistered = computed(() => !!domainInfo.value.name);

function updateState() {
  walletStore.loadMyAsset();
  pageload();
}

onMounted(() => {
  pageload();
});

function pageload() {
  isLoading.value = true;
  mnsStore.fetchMnsName(domainName).then((x: any) => {
    domainInfo.value = x.names;

    mnsStore
      .fetchMnsForsaleName(domainName)
      .then((x: any) => {
        forSale.value = x.forsale;
      })
      .finally(() => {
        isLoading.value = false;
      });
  });
}
</script>
<template>
  <div class="overflow-auto mx-auto max-w-screen-lg">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <template v-if="!isLoading">
      <div class="flex justify-between items-center m-4 mb-6">
        <h2 class="text-xl md:text-5xl font-bold text-base">
          {{ domainName }}
        </h2>
        <div v-if="isDomainRegistered">
          <label
            for="mns_bid"
            class="btn btn-primary btn-sm rounded-full text-white"
            @click="dialog.open('mns_bid', { name: domainName }, updateState)"
          >
            Place Bid
          </label>
        </div>
      </div>

      <div
        v-if="!isDomainRegistered"
        class="bg-blue-100 p-8 text-4xl rounded-xl mb-4 text-center border border-success border-dashed"
      >
        <h3 class="text-lg font-bold text-gray-500 mb-2">
          Domain <span class="text-base">{{ domainName }}</span> is Available!
        </h3>
        <button
          class="btn btn-success btn-sm rounded-full text-white"
          @click="
            dialog.open('register_domain', { name: domainName }, updateState)
          "
        >
          Buy Now!
        </button>
      </div>

      <div
        v-if="isDomainRegistered && forSale && forSale.price"
        class="bg-base-100 p-8 text-4xl rounded-xl mb-4 text-center border border-success border-dashed"
      >
        <h3 class="text-lg font-bold text-gray-500 mb-2">
          Domain
          <span class="text-base"
            >{{ domainInfo.name }}.{{ domainInfo.tld }}</span
          >
          is For Sale!
        </h3>
        <div>
          <div>
            {{ format.formatToken2(format.parseCoin(forSale.price), true) }}
          </div>

          <label
            for="register"
            class="btn btn-success btn-sm rounded-full text-white"
            @click="
              dialog.open(
                'mns_buy',
                {
                  name: domainName,
                },
                updateState
              )
            "
          >
            Buy Domain Now!
          </label>
        </div>
      </div>

      <div v-if="isDomainRegistered" class="bg-base-100 p-4 rounded-xl">
        <h3 class="text-lg font-bold mb-2">Domain Information</h3>
        <ul class="mb-4">
          <li><strong>Name:</strong> {{ domainInfo.name }}</li>
          <li><strong>TLD:</strong> {{ domainInfo.tld }}</li>
          <li>
            <strong>Expires:</strong>
            {{ format.toDay(domainInfo.expires, 'from') }}
          </li>
          <li><strong>Value:</strong> {{ domainInfo.value }}</li>
          <li><strong>Data:</strong> {{ domainInfo.data }}</li>
          <li><strong>Locked:</strong> {{ domainInfo.locked }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>


