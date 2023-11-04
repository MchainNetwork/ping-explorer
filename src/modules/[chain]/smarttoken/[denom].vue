<script setup lang="ts">
import {
  useBlockchain,
  useFormatter,
  useSmartTokenStore,
  useWalletStore,
  useTxDialog,
  useMnsStore,
} from '@/stores';
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['denom', 'chain']);

const walletStore = useWalletStore();
const smartTokenStore = useSmartTokenStore();
const blockchain = useBlockchain();
const dialog = useTxDialog();
const mnsStore = useMnsStore();
const format = useFormatter();

let denom: string = props.denom;
let tokenInfo = ref({} as any);
let supply = ref({} as any);
let subunit = ref('');

let additionalData = ref({} as any);

const minterName = ref(false as boolean | string);
const authorityName = ref(false as boolean | string);

const TokenFeature_name = {
  0: 'minting',
  1: 'burning',
  2: 'sending',
  3: 'free_send',
  4: 'whitelist',
  5: 'freezing',
};

const isCurrentMinter = computed(
  () => tokenInfo.value.minter === walletStore.currentAddress
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
      if (res?.smarttoken?.uri) {
        fetch(res.smarttoken.uri)
          .then((response) => response.json())
          .then((data) => {
            additionalData.value = data;
          })
          .catch((error) => console.error('Error fetching data:', error));
      }
      if (res?.smarttoken?.minter) {
        mnsStore.fetchMnsReverse(res.smarttoken.minter).then((x: any) => {
          minterName.value = x.reverse?.name;
        });
      }

      mnsStore.fetchMnsReverse(res.smarttoken.authority).then((x: any) => {
        authorityName.value = x.reverse?.name;
      });

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
  <div class="overflow-auto mx-auto max-w-screen-lg" v-if="tokenInfo.symbol">
    <div class="flex justify-between items-center my-4 mb-6">
      <RouterLink
        :to="`/${chain}/smarttoken`"
        class="btn btn-ghost btn-circle btn-sm mx-1"
      >
        <Icon
          icon="uil:angle-left"
          class="text-3xl text-gray-500 dark:text-gray-400"
        />
      </RouterLink>
      <div class="flex gap-4 ml-4 flex-1">
        <IdentityIcon
          :text="tokenInfo.symbol"
          size="md"
          :address="tokenInfo.denom"
        />
        <div>
          <h2 class="text-xl flex font-bold text-base">
            {{ tokenInfo.name }} ({{ tokenInfo.symbol.toUpperCase() }})
          </h2>
          <span class="truncate text-gray-500">{{ tokenInfo.denom }}</span>
        </div>
      </div>
      <div class="flex" v-if="isCurrentMinter">
        <details class="dropdown dropdown-bottom dropdown-end">
          <summary class="btn btn-ghost btn-circle btn-sm mx-1">
            <Icon
              icon="mdi-cog"
              class="text-2xl text-gray-500 dark:text-gray-400"
            />
          </summary>
          <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
          >
            <li>
              <label
                for="smarttoken_mint"
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
            </li>
            <li>
              <label
                for="smarttoken_burn"
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
            </li>
            <li>
              <label
                for="smarttoken_set_minter"
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
            </li>
            <li>
              <label
                for="smarttoken_set_authority"
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
            </li>
            <li>
              <label
                for="smarttoken_set_uri"
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
            </li>
            <li>
              <label
                for="smarttoken_disable_mint"
                class="mb-2"
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
            </li>
          </ul>
        </details>
      </div>
    </div>

    <div class="bg-base-100 p-6 rounded-3xl">
      <!-- Token Identification Section -->
      <div class="mb-8">
        <h2 class="text-xl px-2 font-semibold mb-4">
          {{ $t('smarttoken.token_identification') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.denom') }}</strong>
                </td>
                <td>{{ tokenInfo.denom }}</td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.name') }}</strong>
                </td>
                <td>{{ tokenInfo.name }}</td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.symbol') }}</strong>
                </td>
                <td>{{ tokenInfo.symbol.toUpperCase() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Token Economics Section -->
      <div class="mb-8">
        <h2 class="text-xl px-2 font-semibold mb-4">
          {{ $t('smarttoken.token_economics') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.current_supply') }}</strong>
                </td>
                <td>{{ supply?.amount }} {{ subunit }}</td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.max_supply') }}</strong>
                </td>
                <td>
                  {{
                    tokenInfo.max_supply === '0'
                      ? $t('smarttoken.unlimited')
                      : tokenInfo.max_supply + ' ' + subunit
                  }}
                </td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.decimals') }}</strong>
                </td>
                <td>{{ tokenInfo.decimals }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Token Management Section -->
      <div class="mb-8">
        <h2 class="text-xl px-2 font-semibold mb-4">
          {{ $t('smarttoken.token_management') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.authority') }}</strong>
                </td>
                <td>{{ authorityName || tokenInfo.authority }}</td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.minter') }}</strong>
                </td>
                <td>{{ minterName || tokenInfo.minter }}</td>
              </tr>
              <tr>
                <td width="30%" class="align-top">
                  <strong>{{ $t('smarttoken.features') }}</strong>
                </td>
                <td class="p-0">
                  <table class="table table-compact w-full">
                    <tbody>
                      <tr
                        v-for="(featureName, featureId) in TokenFeature_name"
                        :key="featureId"
                      >
                        <td class="w-6 p-2">
                          <Icon
                            v-if="tokenInfo.features.includes(featureName)"
                            icon="uil:check"
                            class="text-success text-3xl"
                          ></Icon>
                          <Icon
                            v-else
                            icon="uil:times"
                            class="text-error text-3xl"
                          ></Icon>
                        </td>
                        <td class="pl-2">
                          {{ $t(`smarttoken.${featureName}`) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Token Rates Section -->
      <div class="mb-8">
        <h2 class="text-xl px-2 font-semibold mb-4">
          {{ $t('smarttoken.token_rates') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.send_burn_rate') }}</strong>
                </td>
                <td>
                  {{
                    format.calculatePercent(
                      tokenInfo.send_burn_rate * 100,
                      100
                    ) || '-'
                  }}
                </td>
              </tr>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.send_commission_rate') }}</strong>
                </td>
                <td>
                  {{
                    format.calculatePercent(
                      tokenInfo.send_commission_rate * 100,
                      100
                    ) || '-'
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div v-if="tokenInfo.uri" class="mb-4">
        <h2 class="text-xl px-2 font-semibold mb-4">
          {{ $t('smarttoken.additional_information') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>{{ $t('smarttoken.uri') }}</strong>
                </td>
                <td>{{ tokenInfo.uri ? tokenInfo.uri : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre
          class="bg-gray-100 dark:bg-[#384059] text-sm p-4 rounded-3xl overflow-x-auto"
        >
<code>{{ JSON.stringify(additionalData, null, 2) }}</code>
</pre>
      </div>
    </div>
  </div>
</template>

