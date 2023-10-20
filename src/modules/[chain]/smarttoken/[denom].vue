<script setup lang="ts">
import {
  useBlockchain,
  useFormatter,
  useSmartTokenStore,
  useWalletStore,
  useTxDialog,
} from '@/stores';
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['denom']);

const walletStore = useWalletStore();
const smartTokenStore = useSmartTokenStore();
const blockchain = useBlockchain();
const dialog = useTxDialog();

let denom: string = props.denom;
let tokenInfo = ref({} as any);
let supply = ref({} as any);
let subunit = ref('');

let additionalData = ref({} as any);

const hasMetaData = computed(
  () => tokenInfo.value && tokenInfo.value.meta_data
);

const isCurrentMinter = computed(
  () =>
    hasMetaData.value && tokenInfo.value.minter === walletStore.currentAddress
);

const hasAdditionalData = computed(
  () => additionalData.value && Object.keys(additionalData.value).length > 0
);

function updateState() {
  walletStore.loadMyAsset();
  pageload();
}

function pageload() {
  if (denom) {
    smartTokenStore.fetchSmartToken(denom).then((res: any) => {
      tokenInfo.value = res?.smarttoken;
      subunit.value = denom.split('-')[0];
      if (res?.smarttoken?.meta_data?.uri) {
        fetch(res.smarttoken.meta_data.uri)
          .then((response) => response.json())
          .then((data) => {
            additionalData.value = data;
          })
          .catch((error) => console.error('Error fetching data:', error));
      }

      blockchain.rpc.getBankSupplyByDenom(denom).then((x) => {
        supply.value = x.amount;
      });
    });
  }
}

onMounted(() => {
  pageload();
});
</script>

<template>
  <div class="overflow-auto" v-if="hasMetaData">
    <div class="flex justify-between items-center m-4 mb-6">
      <div class="flex gap-4">
        <IdentityIcon size="medium" :address="tokenInfo.denom" />
        <div>
          <h2 class="text-xl flex font-bold text-base">
            {{ tokenInfo.meta_data.name }} ({{
              tokenInfo.meta_data.symbol.toUpperCase()
            }})
          </h2>
          <span class="truncate text-gray-500">{{ tokenInfo.denom }}</span>
        </div>
      </div>
      <div class="flex" v-if="isCurrentMinter">
        <label
          for="mint"
          class="btn btn-primary btn-sm rounded-full text-white"
          @click="dialog.open('mint', {}, updateState)"
        >
          {{ $t('mint') }}
        </label>
        <label
          for="burn"
          class="btn btn-primary btn-sm rounded-full text-white mx-2"
          @click="dialog.open('burn', {}, updateState)"
        >
          {{ $t('burn') }}
        </label>

        <div class="relative group">
          <button class="btn btn-primary btn-sm rounded-full text-white">
            <Icon icon="mdi-cog" class="text-white" />
          </button>

          <div
            class="menu absolute bg-base-100 rounded-xl shadow top-10 right-0 ml-12 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <label
              for="set_minter"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="dialog.open('set_minter', {}, updateState)"
            >
              {{ $t('set_minter') }}
            </label>
            <label
              for="set_authority"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="dialog.open('set_authority', {}, updateState)"
            >
              {{ $t('set_authority') }}
            </label>
            <label
              for="set_uri"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="dialog.open('set_uri', {}, updateState)"
            >
              {{ $t('set_uri') }}
            </label>
            <label
              for="disable_mint"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="dialog.open('disable_mint', {}, updateState)"
            >
              {{ $t('disable_mint') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-base-100 p-6 rounded-xl">
      <h1 class="text-2xl font-bold mb-4"></h1>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Smart Token Details</h2>
        <div class="flex flex-col">
          <p><strong>Denom:</strong> {{ tokenInfo.denom }}</p>
          <p>
            <strong>Current Supply:</strong> {{ supply?.amount }} {{ subunit }}
          </p>
          <p>
            <strong>Max Supply:</strong> {{ tokenInfo.max_supply }}
            {{ subunit }}
          </p>
          <p><strong>Minter:</strong> {{ tokenInfo.minter }}</p>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Meta Data</h2>
        <div class="flex flex-col">
          <p><strong>Name:</strong> {{ tokenInfo.meta_data.name }}</p>
          <p><strong>Symbol:</strong> {{ tokenInfo.meta_data.symbol }}</p>
          <p>
            <strong>Decimals:</strong>
            {{ tokenInfo.meta_data.decimals }}
          </p>
          <p>
            <strong>Authority:</strong>
            {{ tokenInfo.meta_data.authority }}
          </p>
          <p><strong>URI:</strong> {{ tokenInfo.meta_data.uri }}</p>
        </div>
      </div>

      <div v-if="hasMetaData" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">URI Data</h2>
        <pre
          class="bg-gray-100 dark:bg-[#384059] text-base p-4 rounded overflow-x-auto"
        ><code>{{ JSON.stringify(additionalData, null, 2) }}</code></pre>
      </div>
    </div>
  </div>
</template>

