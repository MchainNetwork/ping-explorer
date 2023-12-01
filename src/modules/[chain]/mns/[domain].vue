<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import {
  useFormatter,
  useTxDialog,
  useWalletStore,
  useMnsStore,
} from '@/stores';
import type { MnsNames, MnsForsale } from '@/types';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';
import { NumberFormat } from 'vue-i18n';

const props = defineProps(['domain', 'chain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();

const domainInfo = ref({} as MnsNames);
const forSale = ref({} as MnsForsale);

const isLoading = ref(true);

let domainName: string = props.domain;

const isDomainRegistered = computed(() => !!domainInfo.value.name);

function determineCharacterSet(name: string) {
  if (/^[A-Za-z]+$/.test(name)) {
    return 'letter';
  } else if (/^[A-Za-z0-9]+$/.test(name)) {
    return 'alphanumeric';
  } else if (/[\u{1F600}-\u{1F64F}]/u.test(name)) {
    return 'emoji';
  } else {
    return 'none';
  }
}

function updateState() {
  walletStore.loadMyAsset();
  pageload();
}

onMounted(() => {
  pageload();
});

function pageload() {
  isLoading.value = true;
  mnsStore
    .fetchMnsName(domainName)
    .then((x: any) => {
      domainInfo.value = x.names;
      domainInfo.value.data = JSON.parse(x.names.data) || {};

      mnsStore.fetchMnsForsaleName(domainName).then((x: any) => {
        forSale.value = x.forsale;
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
}

interface SocialLink {
  [key: string]: string;
}

const socialLinks: SocialLink = ref({
  web: 'Web',
  email: 'Email',
  telegram: 'Telegram',
  x: 'X',
  discord: 'Discord',
  github: 'GitHub',
}).value;

const sortedBids = computed(() => {
  return domainInfo.value.bids
    ? domainInfo.value.bids.sort(
        (a, b) => Number(b.price.amount) - Number(a.price.amount)
      )
    : [];
});

let showCopyToast = ref(0);
async function copyAdress(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    showCopyToast.value = 1;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  } catch (err) {
    showCopyToast.value = 2;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  }
}
const tipMsg = computed(() => {
  return showCopyToast.value === 2
    ? { class: 'error', msg: 'Copy Error!' }
    : { class: 'success', msg: 'Copy Success!' };
});
</script>
<template>
  <div>
    <bg-gradient-blur variant="big mns-page"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <div v-if="isLoading" class="loading-indicator">
        {{ $t('mns.loading') }}
      </div>
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
          <h2 class="text-2xl md:!text-4xl font-bold flex-1 ml-2 truncate">
            <span>{{ domainName }}</span>
          </h2>

          <div v-if="isDomainRegistered">
            <label
              for="mns_bid"
              class="btn btn-primary btn-sm"
              @click="dialog.open('mns_bid', { name: domainName }, updateState)"
              v-if="domainInfo.resolver != walletStore.currentAddress"
            >
              {{ $t('mns.place_bid') }}
            </label>

            <details
              class="dropdown dropdown-hover dropdown-bottom dropdown-end"
              v-if="domainInfo.resolver == walletStore.currentAddress"
            >
              <summary class="btn btn-ghost btn-circle btn-sm mx-1">
                <Icon
                  icon="uil:cog"
                  class="text-2xl text-gray-500 dark:text-gray-400"
                />
              </summary>
              <ul
                class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
              >
                <li
                  :class="{
                    disabled: domainInfo.resolver !== walletStore.currentAddress,
                  }"
                >
                  <label
                    for="mns_add_record"
                    @click="
                      dialog.open(
                        'mns_add_record',
                        { name: domainName },
                        updateState
                      )
                    "
                  >
                    {{ $t('mns.add_subdomain') }}
                  </label>
                </li>
                <li>
                  <label
                    for="mns_update"
                    @click="
                      dialog.open(
                        'mns_update',
                        { name: domainName, data: domainInfo.data },
                        updateState
                      )
                    "
                  >
                    {{ $t('mns.update') }}
                  </label>
                </li>
                <li>
                  <label
                    for="mns_extend"
                    @click="
                      dialog.open(
                        'mns_extend',
                        { name: domainName, years: 1 },
                        updateState
                      )
                    "
                  >
                    {{ $t('mns.extend') }}
                  </label>
                </li>
                <li>
                  <label
                    v-if="domainInfo.resolver == walletStore.currentAddress"
                    for="mns_list"
                    @click="
                      dialog.open('mns_list', { name: domainName }, updateState)
                    "
                  >
                    {{ $t('mns.sell') }}
                  </label>
                </li>
                <li>
                  <label
                    for="mns_transfer"
                    @click="
                      dialog.open(
                        'mns_transfer',
                        { name: domainName },
                        updateState
                      )
                    "
                  >
                    {{ $t('mns.transfer_domain') }}
                  </label>
                </li>
              </ul>
            </details>
          </div>
        </div>

        <div
          v-if="!isDomainRegistered"
          class="bg-blue-100 p-8 text-4xl rounded-xl mb-4 text-center border border-success border-dashed"
        >
          <h3 class="text-lg font-bold text-gray-500 mb-2">
            {{ $t('mns.domain_available', { domainName }) }}
          </h3>
          <label
            for="mns_register"
            class="btn btn-sm btn-success rounded-full text-white"
            @click="
              dialog.open('mns_register', { name: domainName }, updateState)
            "
          >
            {{ $t('mns.register_now') }}
          </label>
        </div>

        <div
          v-if="isDomainRegistered && forSale && forSale.price"
          class="bg-base-100 p-8 text-4xl rounded-3xl mb-4 text-center border border-success border-dashed"
          :class="
            domainInfo.resolver != walletStore.currentAddress
              ? 'border-success'
              : 'border-error'
          "
        >
          <h3 class="text-lg font-bold text-gray-500 dark:text-white mb-2">
            {{ $t('mns.domain_for_sale', domainInfo) }}
          </h3>
          <div>
            <div>
              {{ format.formatToken2(format.parseCoin(forSale.price), true) }}
            </div>

            <label
              v-if="domainInfo.resolver != walletStore.currentAddress"
              for="mns_buy"
              class="btn btn-sm btn-success rounded-full text-white dark:text-black"
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
              {{ $t('mns.buy_domain_now') }}
            </label>

            <label
              v-if="domainInfo.resolver === walletStore.currentAddress"
              for="mns_delist"
              class="btn btn-sm btn-primary"
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
              {{ $t('mns.delist_domain') }}
            </label>
          </div>
        </div>

        <div v-if="isDomainRegistered" class="bg-base-100 p-4 rounded-3xl mb-4">
          <h3 class="text-lg font-bold px-2 mb-4">
            {{ $t('mns.domain_information') }}
          </h3>
          <div class="overflow-x-auto">
            <table class="table mb-4">
              <tr>
                <td width="20%">
                  <strong> {{ $t('mns.name') }} </strong>
                </td>
                <td>{{ domainInfo.name }}</td>
              </tr>
              <tr>
                <td>
                  <strong> {{ $t('mns.tld') }} </strong>
                </td>
                <td>{{ domainInfo.tld }}</td>
              </tr>
              <tr>
                <td>
                  <strong> {{ $t('mns.expires') }} </strong>
                </td>
                <td>
                  {{ format.toDay(domainInfo.expires, 'date') }}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Resolver</strong>
                </td>
                <td>{{ domainInfo.resolver }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-key="key"
              v-for="(name, key) in socialLinks"
              class="flex items-center p-4 bg-base-100 rounded-3xl"
            >
              <img
                :src="`/logos/${key}.svg`"
                class="h-10 dark:invert mr-3 opacity-80"
                :alt="name"
              />
              <div>
                <p class="font-medium">{{ name }}</p>
                <p v-if="domainInfo.data[key]">
                  {{ domainInfo.data[key] }}
                </p>
                <p class="text-gray-600" v-else>{{ $t('mns.not_set') }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="isDomainRegistered"
            class="bg-base-100 p-4 rounded-3xl mb-4 md:h-full"
          >
            <h3 class="text-lg font-bold px-2 mb-4">
              {{ $t('mns.properties') }}
            </h3>
            <div class="overflow-x-auto">
              <table class="table mb-4">
                <tr>
                  <td>
                    <strong>{{ $t('mns.registration_date') }}</strong>
                  </td>
                  <td>
                    {{ format.toLocaleDate(domainInfo.registration_date) }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ $t('mns.last_sale_price') }}</strong>
                  </td>
                  <td>
                    {{ format.formatToken(domainInfo.last_sale, true) }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ $t('mns.character_set') }}</strong>
                  </td>
                  <td>{{ determineCharacterSet(domainInfo.name) }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ $t('mns.length') }}</strong>
                  </td>
                  <td>{{ domainInfo.name.length }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div
          v-if="isDomainRegistered && sortedBids.length"
          class="bg-base-100 p-4 rounded-3xl mb-4"
        >
          <h3 class="text-lg font-bold px-2 mb-4">{{ $t('mns.bids') }}</h3>
          <div class="overflow-x-auto">
            <table class="table mb-4">
              <thead>
                <tr>
                  <th>{{ $t('account.address') }}</th>
                  <th>{{ $t('mns.price_label') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bid in sortedBids" :key="bid.bidder">
                  <td class="flex items-center">
                    <RouterLink
                      :to="`/${chain}/account/${bid.bidder}`"
                      class="flex items-center text-primary hover:underline"
                    >
                      <IdentityIcon size="sm" :address="bid.bidder" />
                      <span class="pl-3 font-semibold">{{
                        format.shortAddress(bid.bidder)
                      }}</span>
                    </RouterLink>
                    <Icon
                      @click="copyAdress(bid.bidder)"
                      icon="uil:copy"
                      class="inline-block cursor-pointer ml-2 text-lg text-gray-400 dark:text-gray-400"
                    />
                    <span
                      class="badge badge-neutral ml-2"
                      v-if="walletStore.currentAddress === bid.bidder"
                      >{{ $t('smarttoken.you') }}</span
                    >
                  </td>
                  <td>{{ format.formatToken2(bid.price, true) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          v-if="domainInfo.subdomains && domainInfo.subdomains.length"
          class="bg-base-100 p-4 rounded-3xl"
        >
          <h3 class="text-lg font-bold mb-2">{{ $t('mns.subdomains') }}</h3>
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra text-base">
              <thead>
                <tr>
                  <th>{{ $t('mns.subdomain') }}</th>
                  <th>{{ $t('mns.resolver') }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(subdomain, index) in domainInfo.subdomains"
                  :key="index"
                >
                  <td>{{ subdomain.name }}</td>
                  <td>{{ subdomain.resolver }}</td>
                  <td class="text-right">
                    <label
                      v-if="domainInfo.resolver == walletStore.currentAddress"
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
                      {{ $t('mns.update') }}
                    </label>
                    <label
                      v-if="domainInfo.resolver == walletStore.currentAddress"
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
                      {{ $t('mns.delete') }}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </div>

    <div class="toast" v-show="showCopyToast === 1">
      <div class="alert alert-success">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
    <div class="toast" v-show="showCopyToast === 2">
      <div class="alert alert-error">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
