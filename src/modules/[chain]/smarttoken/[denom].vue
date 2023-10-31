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
  <div class="overflow-auto mx-auto max-w-screen-lg" v-if="hasMetaData">
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
          for="smarttoken_mint"
          class="btn btn-primary btn-sm rounded-full text-white"
          @click="
            dialog.open(
              'smarttoken_mint',
              { denom: tokenInfo.denom },
              updateState
            )
          "
        >
          {{ $t('smarttoken.mint') }}
        </label>
        <label
          for="smarttoken_burn"
          class="btn btn-primary btn-sm rounded-full text-white mx-2"
          @click="
            dialog.open(
              'smarttoken_burn',
              { denom: tokenInfo.denom },
              updateState
            )
          "
        >
          {{ $t('smarttoken.burn') }}
        </label>

        <div class="relative group">
          <button class="btn btn-ghost btn-circle btn-sm mx-1">
            <Icon
              icon="mdi-cog"
              class="text-2xl text-gray-500 dark:text-gray-400"
            />
          </button>

          <div
            class="menu absolute bg-base-100 rounded-xl shadow top-10 right-0 ml-12 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <label
              for="smarttoken_set_minter"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="
                dialog.open(
                  'smarttoken_set_minter',
                  { denom: tokenInfo.denom },
                  updateState
                )
              "
            >
              {{ $t('smarttoken.set_minter') }}
            </label>
            <label
              for="smarttoken_set_authority"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="
                dialog.open(
                  'smarttoken_set_authority',
                  { denom: tokenInfo.denom },
                  updateState
                )
              "
            >
              {{ $t('smarttoken.set_authority') }}
            </label>
            <label
              for="smarttoken_set_uri"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="
                dialog.open(
                  'smarttoken_set_uri',
                  { denom: tokenInfo.denom },
                  updateState
                )
              "
            >
              {{ $t('smarttoken.set_uri') }}
            </label>
            <label
              for="smarttoken_disable_mint"
              class="btn btn-primary btn-sm rounded-full text-white mb-2"
              @click="
                dialog.open(
                  'smarttoken_disable_mint',
                  { denom: tokenInfo.denom },
                  updateState
                )
              "
            >
              {{ $t('smarttoken.disable_mint') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-base-100 p-6 rounded-xl">
      <h1 class="text-2xl font-bold mb-4"></h1>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('smarttoken.smart_token_details') }}
        </h2>
        <div class="flex flex-col">
          <p>
            <strong>{{ $t('smarttoken.denom') }}:</strong> {{ tokenInfo.denom }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.current_supply') }}:</strong>
            {{ supply?.amount }} {{ subunit }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.max_supply') }}:</strong>
            {{ tokenInfo.max_supply }}
            {{ subunit }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.minter') }}:</strong>
            {{ tokenInfo.minter }}
          </p>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('smarttoken.meta_data') }}
        </h2>
        <div class="flex flex-col">
          <p>
            <strong>{{ $t('smarttoken.name') }}:</strong>
            {{ tokenInfo.meta_data.name }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.symbol') }}:</strong>
            {{ tokenInfo.meta_data.symbol }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.decimals') }}:</strong>
            {{ tokenInfo.meta_data.decimals }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.authority') }}:</strong>
            {{ tokenInfo.meta_data.authority }}
          </p>
          <p>
            <strong>{{ $t('smarttoken.uri') }}:</strong>
            {{ tokenInfo.meta_data.uri }}
          </p>
        </div>
      </div>

      <div v-if="hasMetaData" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('smarttoken.uri_data') }}
        </h2>
        <pre
          class="bg-gray-100 dark:bg-[#384059] text-base p-4 rounded overflow-x-auto"
        ><code>{{ JSON.stringify(additionalData, null, 2) }}</code></pre>
      </div>
    </div>
  </div>
</template>

