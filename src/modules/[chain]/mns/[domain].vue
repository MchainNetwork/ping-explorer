<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useSmartTokenStore,
  useTxDialog,
  useWalletStore,
  useMnsStore,
  useBaseStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type MnsForsale,
  type MnsBids,
} from '@/types';
import { onMounted } from 'vue';
import IdentityIcon from '@/components/IdentityIcon.vue';
import { Icon } from '@iconify/vue';

const props = defineProps(['domain', 'chain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();
const baseStore = useBaseStore();

const domainInfo = ref({} as MnsNames);
const forSale = ref({} as MnsForsale);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const isLoading = ref(true);

let domainName: string = props.domain;

const isDomainRegistered = computed(() => !!domainInfo.value.name);

const blocksPerYear = 5057308;

const calculateTimeRemaining = (itemExpires: number, currentHeight: number) => {
  const blocksRemaining = itemExpires - currentHeight;
  const timeRemainingInSec = (blocksRemaining / blocksPerYear) * 31557600;
  const timeRemainingInMs = timeRemainingInSec * 1000;
  return parseFloat(timeRemainingInMs.toFixed(0));
};

const calculateExpiryTime = (itemExpires: number, currentHeight: number) => {
  const timeRemaining = calculateTimeRemaining(itemExpires, currentHeight);
  const date = new Date();
  date.setTime(date.getTime() + timeRemaining);
  return date.getTime();
};

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
      <div class="flex justify-between items-center m-4 ml-0 mb-6">
        <RouterLink
          :to="`/${chain}/mns`"
          class="btn btn-ghost btn-circle btn-sm mx-1"
        >
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </RouterLink>
        <h2 class="text-xl md:!text-4xl font-bold flex-1 ml-2">
          {{ domainName }}
        </h2>
        <div v-if="isDomainRegistered">
          <label
            for="mns_bid"
            class="btn btn-primary btn-sm"
            @click="dialog.open('mns_bid', { name: domainName }, updateState)"
            v-if="domainInfo.value != walletStore.currentAddress"
          >
            Place A Bid
          </label>
          <label
            for="mns_add_record"
            class="btn btn-primary btn-sm"
            @click="
              dialog.open('mns_add_record', { name: domainName }, updateState)
            "
            v-if="domainInfo.value === walletStore.currentAddress"
          >
            Add Subdomain
          </label>
          <label
            v-if="domainInfo.value == walletStore.currentAddress"
            for="mns_update"
            class="btn btn-primary ml-4 btn-sm"
            @click="
              dialog.open(
                'mns_update',
                { name: domainName, data: domainInfo.data },
                updateState
              )
            "
          >
            Update
          </label>
          <label
            v-if="domainInfo.value == walletStore.currentAddress"
            for="mns_list"
            class="btn btn-primary ml-4 btn-sm"
            @click="dialog.open('mns_list', { name: domainName }, updateState)"
          >
            Sell
          </label>
          <label
            for="mns_transfer"
            class="btn btn-primary ml-4 btn-sm"
            @click="
              dialog.open('mns_transfer', { name: domainName }, updateState)
            "
            v-if="domainInfo.value === walletStore.currentAddress"
          >
            Transfer Domain
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
        <label
          for="mns_register"
          class="btn btn-success btn-sm rounded-full text-white"
          @click="
            dialog.open('mns_register', { name: domainName }, updateState)
          "
        >
          Register Now!
        </label>
      </div>

      <div
        v-if="isDomainRegistered && forSale && forSale.price"
        class="bg-base-100 p-8 text-4xl rounded-xl mb-4 text-center border border-success border-dashed"
        :class="
          domainInfo.value != walletStore.currentAddress
            ? 'border-success'
            : 'border-error'
        "
      >
        <h3 class="text-lg font-bold text-gray-500 dark:text-white mb-2">
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
            v-if="domainInfo.value != walletStore.currentAddress"
            for="mns_buy"
            class="btn btn-success btn-sm rounded-full text-white dark:text-black"
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

          <label
            v-if="domainInfo.value === walletStore.currentAddress"
            for="mns_delist"
            class="btn btn-error btn-sm rounded-full text-white dark:text-black"
            @click="
              dialog.open(
                'mns_delist',
                {
                  name: domainName,
                },
                updateState
              )
            "
          >
            Delist Domain
          </label>
        </div>
      </div>

      <div v-if="isDomainRegistered" class="bg-base-100 p-4 rounded-xl mb-4">
        <h3 class="text-lg font-bold mb-2">Domain Information</h3>
        <ul class="mb-4">
          <li><strong>Name:</strong> {{ domainInfo.name }}</li>
          <li><strong>TLD:</strong> {{ domainInfo.tld }}</li>
          <li>
            <strong>Expires:</strong>
            {{
              format.toDay(
                calculateExpiryTime(
                  domainInfo.expires,
                  Number(baseStore.latest?.block?.header?.height) || 0
                ),
                'date'
              )
            }}
          </li>
          <li><strong>Value:</strong> {{ domainInfo.value }}</li>
          <li><strong>Data:</strong> {{ domainInfo.data }}</li>
        </ul>
      </div>

      <div
        v-if="domainInfo.subdomains && domainInfo.subdomains.length"
        class="bg-base-100 p-4 rounded-xl"
      >
        <h3 class="text-lg font-bold mb-2">Subdomains</h3>

        <table class="table table-compact table-zebra text-base">
          <thead>
            <tr>
              <th>Subdomain</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(subdomain, index) in domainInfo.subdomains"
              :key="index"
            >
              <td>{{ subdomain.name }}</td>
              <td>{{ subdomain.value }}</td>
              <td class="text-right">
                <label
                  v-if="domainInfo.value == walletStore.currentAddress"
                  for="mns_update"
                  class="btn btn-success btn-xs rounded-full"
                  @click="
                    dialog.open(
                      'mns_update',
                      { name: subdomain.name },
                      updateState
                    )
                  "
                >
                  Update
                </label>
                <label
                  v-if="domainInfo.value == walletStore.currentAddress"
                  for="mns_del_record"
                  class="btn btn-success ml-2 btn-xs rounded-full"
                  @click="
                    dialog.open(
                      'mns_del_record',
                      { name: subdomain.name },
                      updateState
                    )
                  "
                >
                  Delete
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
