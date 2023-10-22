<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import {
  useFormatter,
  useTxDialog,
  useWalletStore,
  useMnsStore,
} from '@/stores';
import {
  PageRequest,
  type Pagination,
  type MnsNames,
  type PaginatedNames,
  type MnsForsale,
  type MnsBids,
  type PaginatedForsale,
} from '@/types';
import IdentityIcon from '@/components/IdentityIcon.vue';

const allowedExtension = 'mar';

const props = defineProps(['chain']);

const format = useFormatter();
const walletStore = useWalletStore();
const dialog = useTxDialog();
const mnsStore = useMnsStore();

const list = ref([] as MnsNames[]);
const listForSale = ref([] as MnsForsale[]);
const listBid = ref([] as MnsBids[]);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const domainToCheck = ref('');
const isAvailable = ref<null | boolean>(null);
const isRegistered = ref<null | boolean>(null);

const errorMessage = ref('');

const resetMessages = () => {
  errorMessage.value = '';
  isAvailable.value = null;
  isRegistered.value = null;
};

onMounted(() => {
  updateState();
  pageload(1);
});

function updateState() {
  walletStore.loadMyAsset();
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

  const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
  const [host, extension] = domainToCheck.value.split('.');

  if (!domainPattern.test(host) || extension !== allowedExtension) {
    errorMessage.value = `Please enter a valid .${allowedExtension} domain!`;
    return;
  }

  try {
    isAvailable.value = await checkDomainAvailable(domainToCheck.value);

    // Si el dominio no está disponible, establece isRegistered en true
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
  <div class="overflow-auto">
    <div class="check-domain-box bg-base-100 p-4 rounded-xl mb-6">
      <h2
        class="text-xl text-center md:text-5xl font-bold text-primary m-4 mb-6"
      >
        {{ $t('mns.title') }}
      </h2>

      <h3 class="text-lg font-bold text-center mb-4">
        {{ $t('mns.subtitle') }}
      </h3>
      <p class="text-center text-sm mb-4 w-2/6 mx-auto">
        {{ $t('mns.description') }}
      </p>
      <form
        @submit.prevent="verifyDomain"
        class="flex justify-center items-center"
      >
        <input
          v-model="domainToCheck"
          type="text"
          @input="resetMessages"
          :placeholder="$t('mns.input_placeholder')"
          class="input input-bordered focus:outline-none rounded-l-full !border !border-primary !border-r-0"
        />
        <button
          type="submit"
          class="btn btn-primary text-white border border-primary rounded-r-full"
        >
          {{ $t('mns.check_button') }}
        </button>
      </form>
      <p class="mt-4 text-center text-red-500">
        {{ errorMessage }}
      </p>
    </div>

    <div
      v-if="isAvailable"
      class="bg-green-500 dark:bg-green-800 text-center text-white p-4 mb-6 rounded-xl"
    >
      <p class="text-2xl">
        {{ $t('mns.domain_available_message', { domain: domainToCheck }) }}
      </p>
      <button
        @click="dialog.open('register', { name: domainToCheck }, updateState)"
        class="btn btn-sm text-green-800 dark:text-green-500 rounded-full mt-2"
      >
        {{ $t('mns.register_now_button') }}
      </button>
    </div>

    <div
      v-if="isRegistered"
      class="bg-red-500 dark:bg-red-800 text-center text-white p-4 mb-6 rounded-xl"
    >
      <p class="text-2xl">
        {{ $t('mns.domain_registered_message', { domain: domainToCheck }) }}
      </p>
      <button
        @click="dialog.open('nns_bid', { name: domainToCheck }, updateState)"
        class="btn btn-sm text-red-800 dark:text-white rounded-full mt-2"
      >
        {{ $t('mns.place_bid_button') }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-base-100 p-4 rounded-xl">
        <h3 class="text-lg font-bold mb-4">
          {{ $t('mns.registered_names_title') }}
        </h3>
        <table class="table table-compact text-base">
          <thead>
            <tr>
              <td>{{ $t('mns.domain_label') }}</td>
              <td>{{ $t('mns.expires_label') }}</td>
            </tr>
          </thead>
          <tr
            :key="item.name + item.tld"
            v-for="item in list"
            class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <td width="20%">
              <RouterLink
                :to="'/mchain/mns/' + item.name + '.' + item.tld"
                class="hover:underline"
              >
                {{ item.name }}.{{ item.tld }}
              </RouterLink>
            </td>
            <td>
              {{ format.toDay(item.expires, 'from') }}
            </td>
          </tr>
        </table>
        <PaginationBar
          :limit="pageRequest.limit"
          :total="pageResponse.total"
          :callback="pageload"
        />
      </div>

      <div class="bg-base-100 p-4 rounded-xl">
        <h2 class="text-lg font-bold mb-2">
          {{ $t('mns.domains_for_sale_title') }}
        </h2>
        <table class="table table-compact text-base">
          <thead>
            <tr>
              <td>{{ $t('mns.domain_label') }}</td>
              <td>{{ $t('mns.price_label') }}</td>
              <td></td>
            </tr>
          </thead>
          <tr
            :key="item.name"
            v-for="item in listForSale"
            class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <td width="20%">
              <RouterLink
                :to="'/mchain/mns/' + item.name"
                class="hover:underline"
              >
                {{ item.name }}
              </RouterLink>
            </td>
            <td>
              {{ format.formatToken2(format.parseCoin(item.price), true) }}
            </td>
            <td class="text-right">
              <button
                class="btn btn-primary btn-sm rounded-full text-white"
                @click="
                  dialog.open('nns_bid', { name: item.name }, updateState)
                "
              >
                {{ $t('mns.buy_button') }}
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div class="bg-base-100 p-4 rounded-xl">
        <h2 class="text-lg font-bold mb-2">
          {{ $t('mns.domains_in_bid_title') }}
        </h2>
        <table class="table table-compact text-base">
          <thead>
            <tr>
              <td>{{ $t('mns.domain_label') }}</td>
              <td>{{ $t('mns.bid_label') }}</td>
              <td></td>
            </tr>
          </thead>
          <tr
            :key="item.name"
            v-for="item in listBid"
            class="odd:bg-gray-100 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <td width="20%">
              <RouterLink
                :to="'/mchain/mns/' + item.name"
                class="hover:underline"
              >
                {{ item.name }}
              </RouterLink>
            </td>
            <td>
              {{ format.formatToken2(format.parseCoin(item.price), true) }}
            </td>
            <td class="text-right">
              <button
                class="btn btn-primary btn-sm rounded-full text-white"
                @click="
                  dialog.open('nns_bid', { name: item.name }, updateState)
                "
              >
                {{ $t('mns.place_bid_button') }}
              </button>
            </td>
          </tr>
        </table>
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

