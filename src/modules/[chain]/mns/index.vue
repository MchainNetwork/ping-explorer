<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import Cookies from 'js-cookie';

import {
  useFormatter,
  useTxDialog,
  useWalletStore,
  useMnsStore,
  useParamStore,
  useBaseStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type MnsForsale,
  type MnsBids,
} from '@/types';
import IdentityIcon from '@/components/IdentityIcon.vue';

const allowedExtension = 'mark';

const props = defineProps(['chain']);

// TODO: get price from coingecko
const MARK_TO_USD = 0.0001;

const displayInUSD = ref(false);

const convertMarkToUsd = (amount: string) => {
  return (
    (parseFloat(String(amount).replace('umark', '')) * MARK_TO_USD) /
    1000000
  ).toFixed(2);
};

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();
const paramStore = useParamStore();
const baseStore = useBaseStore();

const getReferrerName = () => {
  return Cookies.get('referrerName');
};

const list = ref([] as MnsNames[]);
const listForSale = ref([] as MnsForsale[]);
const listBid = ref([] as MnsBids[]);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const domainToCheck = ref('');
const isAvailable = ref<null | boolean>(null);
const isRegistered = ref<null | boolean>(null);

const errorMessage = ref('');

// TODO: mintParam.items.block_per_year
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

const resetMessages = () => {
  errorMessage.value = '';
  isAvailable.value = null;
  isRegistered.value = null;
};

onMounted(() => {
  updateState();
});

function updateState() {
  pageload(1);
}

async function pageload(p: number) {
  pageRequest.value.setPage(p);

  const [names, forSale, forBid] = await Promise.all([
    mnsStore.fetchMnsNames(),
    mnsStore.fetchMnsForsale(),
    mnsStore.fetchMnsBids(),
  ]);

  list.value = names.names;
  pageResponse.value = names.pagination;
  listForSale.value = forSale.forsale;
  listBid.value = forBid.bids;
}

async function verifyDomain() {
  resetMessages();

  const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/i;
  let [host, extension, more] = domainToCheck.value.split('.');

  if (extension === undefined) {
    extension = allowedExtension;
  }

  if (
    !domainPattern.test(host) ||
    extension !== allowedExtension ||
    more !== undefined
  ) {
    errorMessage.value = `Please enter a valid .${allowedExtension} domain!`;
    return;
  }

  domainToCheck.value = host.toLocaleLowerCase() + '.' + extension;

  try {
    isAvailable.value = await checkDomainAvailable(domainToCheck.value);
    isRegistered.value = !isAvailable.value;
  } catch {
    errorMessage.value =
      'An error occurred while checking the domain availability.';
  }
}

function checkDomainAvailable(domain: string) {
  return mnsStore
    .fetchMnsName(domain)
    .then(() => false)
    .catch(() => true);
}
</script>

<template>
  <div>
    <bg-gradient-blur variant="big mns"></bg-gradient-blur>
    <div class="relative overflow-hidden mx-auto max-w-screen-xl lg:p-10">
      <h2
        class="text-primary text-3xl text-center md:!text-5xl font-bold mx-4 mb-8"
      >
        {{ $t('mns.title') }}
      </h2>

      <div class="check-domain-box bg-base-100 p-4 rounded-3xl mb-6">
        <h3 class="text-xl font-bold text-center mb-4">
          {{ $t('mns.subtitle') }}
        </h3>
        <p class="text-center text-sm mb-6 md:w-3/6 mx-auto">
          {{ $t('mns.description') }}
        </p>

        <div class="md:w-4/6 mx-auto">
          <form
            @submit.prevent="verifyDomain"
            class="flex justify-center w-100 items-center overflow-hidden rounded-full border border-primary mb-6"
          >
            <input
              v-model="domainToCheck"
              type="text"
              @input="resetMessages"
              :placeholder="$t('mns.input_placeholder')"
              class="input focus:outline-none flex-1"
              v-focus
            />
            <button
              type="submit"
              class="btn btn-primary text-white rounded-full w-24"
            >
              {{ $t('mns.check_button') }}
            </button>
          </form>
          <p class="text-center text-red-500" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
        <div
          v-if="isAvailable"
          class="bg-green-500 dark:bg-green-800 text-center text-white p-4 rounded-xl"
        >
          <p
            class="text-2xl"
            v-html="
              $t('mns.domain_available_message', { domain: domainToCheck })
            "
          ></p>
          <label
            for="mns_register"
            @click="
              dialog.open(
                'mns_register',
                { name: domainToCheck, years: 1, referrer: getReferrerName() },
                updateState
              )
            "
            class="btn btn-sm text-green-800 dark:text-green-500 rounded-full mt-2"
          >
            {{ $t('mns.register_now_button') }}
          </label>
        </div>

        <div
          v-if="isRegistered"
          class="bg-red-500 dark:bg-red-800 text-center text-white p-4 rounded-3xl"
        >
          <p
            class="text-2xl"
            v-html="
              $t('mns.domain_registered_message', { domain: domainToCheck })
            "
          ></p>

          <label
            for="mns_bid"
            @click="
              dialog.open('mns_bid', { name: domainToCheck }, updateState)
            "
            class="btn btn-sm text-red-800 dark:text-red-500 rounded-full mt-2"
          >
            {{ $t('mns.place_bid_button') }}
          </label>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div class="form-control p-2">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              class="checkbox mr-2"
              id="displayInUSD"
              v-model="displayInUSD"
            />
            <span class="label-text mr-2">
              {{ $t('mns.display_price_in_usd') }}
            </span>
          </label>
        </div>

        <RouterLink
          :to="`/${chain}/mns/owned`"
          class="btn btn-xs btn-primary mb-4"
        >
          {{ $t('mns.your_domains') }}
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Registered -->
        <div class="bg-base-100 p-4 rounded-3xl">
          <h3 class="text-lg font-bold mb-4">
            {{ $t('mns.registered_names_title') }}
          </h3>
          <div class="flex">
            <div class="overflow-auto w-3/4">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>{{ $t('mns.domain_label') }}</td>
                    <td>{{ $t('mns.expires_label') }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.name + item.tld">
                    <td width="20%" class="h-12">
                      <div class="truncate">
                        <RouterLink
                          :to="'/mchain/mns/' + item.name + '.' + item.tld"
                          class="hover:underline"
                        >
                          {{ item.name }}.{{ item.tld }}
                        </RouterLink>
                      </div>
                    </td>
                    <td class="whitespace-nowrap">
                      {{
                        format.toDay(
                          calculateExpiryTime(
                            item.expires,
                            Number(baseStore.latest?.block?.header?.height) || 0
                          ),
                          'date'
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-1/4 shadow-left">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.name + item.tld">
                    <td class="text-right h-12">
                      <label
                        v-if="item.value != walletStore.currentAddress"
                        for="mns_bid"
                        class="btn btn-primary btn-xs w-full whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_bid',
                            { name: item.name + '.' + item.tld },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.bid_label') }}
                      </label>
                      <label
                        v-if="item.value == walletStore.currentAddress"
                        for="mns_list"
                        class="btn btn-success btn-xs w-full whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_list',
                            { name: item.name + '.' + item.tld },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.sell') }}
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <RouterLink
            v-if="list.length >= 10"
            :to="'/mchain/mns/registered'"
            class="btn btn-primary btn-xs btn-outline w-full mt-4"
          >
            {{ $t('mns.see_all') }}
          </RouterLink>
        </div>

        <!-- For Sale -->
        <div class="bg-base-100 p-4 rounded-3xl">
          <h2 class="text-lg font-bold mb-2">
            {{ $t('mns.domains_for_sale_title') }}
          </h2>

          <div class="flex">
            <div class="overflow-auto w-2/4">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>{{ $t('mns.domain_label') }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listForSale" :key="item.name">
                    <td width="20%" class="h-12">
                      <div class="truncate">
                        <RouterLink
                          :to="'/mchain/mns/' + item.name"
                          class="hover:underline"
                        >
                          {{ item.name }}
                        </RouterLink>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-2/4 shadow-left">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>{{ $t('mns.price_label') }}</td>
                    <td>&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listForSale" :key="item.name">
                    <td>
                      {{
                        displayInUSD
                          ? '$' + convertMarkToUsd(item.price)
                          : format.formatToken2(
                              format.parseCoin(item.price),
                              true
                            )
                      }}
                    </td>
                    <td class="text-right h-12">
                      <label
                        v-if="item.owner != walletStore.currentAddress"
                        for="mns_buy"
                        class="btn btn-primary btn-xs w-full whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_buy',
                            { name: item.name },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.buy_button') }}
                      </label>
                      <label
                        v-if="item.owner == walletStore.currentAddress"
                        for="mns_delist"
                        class="btn btn-success btn-xs w-full whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_delist',
                            { name: item.name },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.cancel') }}
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <RouterLink
            v-if="listForSale.length >= 10"
            :to="'/mchain/mns/forsale'"
            class="btn btn-primary btn-xs btn-outline w-full mt-4"
          >
            {{ $t('mns.see_all') }}
          </RouterLink>
        </div>

        <!-- Bids -->
        <div class="bg-base-100 p-4 rounded-3xl">
          <h2 class="text-lg font-bold mb-2">
            {{ $t('mns.domains_in_bid_title') }}
          </h2>

          <div class="flex">
            <div class="overflow-auto w-2/4">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>{{ $t('mns.domain_label') }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listBid" :key="item.name">
                    <td width="20%" class="h-12">
                      <div class="truncate">
                        <RouterLink
                          :to="'/mchain/mns/' + item.name"
                          class="hover:underline"
                        >
                          {{ item.name }}
                        </RouterLink>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-2/4 shadow-left">
              <table class="table table-xs table-zebra text-xs">
                <thead>
                  <tr>
                    <td>{{ $t('mns.bid_label') }}</td>
                    <td>&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listBid" :key="item.name">
                    <td>
                      {{
                        displayInUSD
                          ? '$' + convertMarkToUsd(item.price)
                          : format.formatToken2(
                              format.parseCoin(item.price),
                              true
                            )
                      }}
                    </td>
                    <td class="text-right h-12">
                      <label
                        v-if="item.bidder != walletStore.currentAddress"
                        for="mns_bid"
                        class="btn btn-primary btn-xs whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_bid',
                            { name: item.name },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.bid_label') }}
                      </label>
                      <label
                        v-if="item.bidder == walletStore.currentAddress"
                        for="mns_cancel_bid"
                        class="btn btn-success btn-xs whitespace-nowrap"
                        @click="
                          dialog.open(
                            'mns_cancel_bid',
                            { name: item.name },
                            updateState
                          )
                        "
                      >
                        {{ $t('mns.cancel') }}
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <RouterLink
            v-if="listBid.length >= 10"
            :to="'/mchain/mns/bids'"
            class="btn btn-primary btn-xs btn-outline w-full mt-4"
          >
            {{ $t('mns.see_all') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      i18n: 'mns',
      order: 3
    }
  }
</route>
