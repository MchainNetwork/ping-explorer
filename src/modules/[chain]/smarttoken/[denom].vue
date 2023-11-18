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
const tokenInfo = ref({} as any);
const supply = ref({} as any);
const subunit = ref('');
const whitelist = ref([] as any);
const frozen = ref({} as any);
const denomOwners = ref([] as any);

const additionalData = ref({} as any);

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

const hasMintingFeature = computed(() =>
  tokenInfo.value.features.includes(TokenFeature_name[0])
);
const hasBurningFeature = computed(() =>
  tokenInfo.value.features.includes(TokenFeature_name[1])
);
const hasWhitelistFeature = computed(() =>
  tokenInfo.value.features.includes(TokenFeature_name[4])
);
const hasFreezingFeature = computed(() =>
  tokenInfo.value.features.includes(TokenFeature_name[5])
);

const isCurrentMinter = computed(
  () => tokenInfo.value.minter === walletStore.currentAddress
);

const isCurrentAuthority = computed(
  () => tokenInfo.value.authority === walletStore.currentAddress
);

const hasAdditionalData = computed(
  () => additionalData.value && Object.keys(additionalData.value).length > 0
);

function updateState() {
  walletStore.loadMyAsset();
  pageload();
}

const isLoadingWhitelist = ref(false);
const isLoadingFrozen = ref(false);
const isLoadingOwners = ref(false);

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

      isLoadingOwners.value = true;
      blockchain.rpc
        ?.getBankDenomOwners(denom)
        .then((x) => {
          denomOwners.value = x.denom_owners;
        })
        .finally(() => {
          isLoadingOwners.value = false;
        });

      if (hasWhitelistFeature.value) {
        isLoadingWhitelist.value = true;
        blockchain.rpc
          .getSmartTokenWhitelistByDenom(denom)
          .then((x) => {
            whitelist.value = x.addresses;
          })
          .finally(() => {
            isLoadingWhitelist.value = false;
          });
      }
      if (hasFreezingFeature.value) {
        isLoadingFrozen.value = true;
        blockchain.rpc
          .getSmartTokenFrozenByDenom(denom)
          .then((x) => {
            frozen.value = x.addresses;
          })
          .finally(() => {
            isLoadingFrozen.value = false;
          });
      }
    });
  }
}

onMounted(() => {
  pageload();
});
</script>

<template>
  <div>
    <bg-gradient-blur variant="big smarttoken"></bg-gradient-blur>
    <div
      class="relative overflow-auto mx-auto max-w-screen-lg"
      v-if="tokenInfo.symbol"
    >
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
        <div class="flex" v-if="isCurrentMinter || isCurrentAuthority">
          <details class="dropdown dropdown-bottom dropdown-end dropdown-hover">
            <summary class="btn btn-ghost btn-circle btn-sm mx-1">
              <Icon
                icon="mdi-cog"
                class="text-2xl text-gray-500 dark:text-gray-400"
              />
            </summary>
            <ul
              class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
            >
              <li :class="{ disabled: !hasMintingFeature || !isCurrentMinter }">
                <label
                  for="smarttoken_mint"
                  @click="
                    hasMintingFeature &&
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
              <li :class="{ disabled: !hasBurningFeature || !isCurrentMinter }">
                <label
                  for="smarttoken_burn"
                  @click="
                    hasBurningFeature &&
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
              <li
                :class="{ disabled: !hasMintingFeature || !isCurrentAuthority }"
              >
                <label
                  for="smarttoken_set_minter"
                  @click="
                    hasMintingFeature &&
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
              <li :class="{ disabled: !isCurrentAuthority }">
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
              <li :class="{ disabled: !isCurrentAuthority }">
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
              <li
                :class="{ disabled: !hasMintingFeature || !isCurrentAuthority }"
              >
                <label
                  for="smarttoken_disable_mint"
                  class="mb-2"
                  @click="
                    hasMintingFeature &&
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
              <li
                :class="{
                  disabled: !hasWhitelistFeature || !isCurrentAuthority,
                }"
              >
                <label
                  for="smarttoken_add_to_whitelist_batch"
                  class="mb-2"
                  @click="
                    hasWhitelistFeature &&
                      dialog.open(
                        'smarttoken_add_to_whitelist_batch',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.add_to_whitelist') }}
                </label>
              </li>
              <li
                :class="{
                  disabled:
                    !hasWhitelistFeature ||
                    !whitelist.length ||
                    !isCurrentAuthority,
                }"
              >
                <label
                  for="smarttoken_remove_from_whitelist_batch"
                  class="mb-2"
                  @click="
                    hasWhitelistFeature &&
                      dialog.open(
                        'smarttoken_remove_from_whitelist_batch',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.remove_from_whitelist') }}
                </label>
              </li>
              <li
                :class="{
                  disabled: !hasFreezingFeature || !isCurrentAuthority,
                }"
              >
                <label
                  for="smarttoken_freeze_batch"
                  class="mb-2"
                  @click="
                    hasFreezingFeature &&
                      dialog.open(
                        'smarttoken_freeze_batch',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.freeze') }}
                </label>
              </li>
              <li
                :class="{
                  disabled:
                    !hasFreezingFeature ||
                    !frozen.length ||
                    !isCurrentAuthority,
                }"
              >
                <label
                  for="smarttoken_unfreeze_batch"
                  class="mb-2"
                  @click="
                    hasFreezingFeature &&
                      dialog.open(
                        'smarttoken_unfreeze_batch',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.unfreeze') }}
                </label>
              </li>
              <li
                :class="{
                  disabled: !hasFreezingFeature || !isCurrentAuthority,
                }"
              >
                <label
                  v-if="tokenInfo.global_freeze"
                  for="smarttoken_global_unfreeze"
                  class="mb-2"
                  @click="
                    hasFreezingFeature &&
                      dialog.open(
                        'smarttoken_global_unfreeze',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.global_unfreeze') }}
                </label>
                <label
                  v-else
                  for="smarttoken_global_freeze"
                  class="mb-2"
                  @click="
                    hasFreezingFeature &&
                      dialog.open(
                        'smarttoken_global_freeze',
                        { denom: tokenInfo.denom },
                        updateState
                      )
                  "
                >
                  {{ $t('smarttoken.global_freeze') }}
                </label>
              </li>
            </ul>
          </details>
        </div>
      </div>

      <div
        class="alert alert-warning dark:bg-amber-600 mb-6 rounded-3xl"
        v-if="tokenInfo.global_freeze"
      >
        <Icon icon="uil:file-lock-alt" class="mr-2 text-3xl" />
        <span>{{ $t('smarttoken.global_freeze_explain') }}</span>
      </div>

      <div class="bg-base-100 p-6 rounded-3xl mb-6">
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
                  <td class="whitespace-nowrap">{{ tokenInfo.denom }}</td>
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

                <tr>
                  <td width="30%">
                    <strong>{{ $t('smarttoken.send_stake_rate') }}</strong>
                  </td>
                  <td>
                    {{
                      format.calculatePercent(
                        tokenInfo.send_stake_rate * 100,
                        100
                      ) || '-'
                    }}
                  </td>
                </tr>

                <tr>
                  <td width="30%">
                    <strong>{{ $t('smarttoken.send_community_rate') }}</strong>
                  </td>
                  <td>
                    {{
                      format.calculatePercent(
                        tokenInfo.send_community_rate * 100,
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

      <!-- whitelist -->
      <div class="bg-base-100 p-6 rounded-3xl mb-6" v-if="hasWhitelistFeature">
        <div class="mb-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl px-2 font-semibold mb-4">
              {{ $t('smarttoken.whitelist') }}
            </h2>
            <label
              for="smarttoken_add_to_whitelist_batch"
              class="btn btn-sm btn-primary"
              @click="
                hasWhitelistFeature &&
                  dialog.open(
                    'smarttoken_add_to_whitelist_batch',
                    { denom: tokenInfo.denom },
                    updateState
                  )
              "
            >
              {{ $t('smarttoken.add_to_whitelist') }}
            </label>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full" v-if="!isLoadingWhitelist">
              <tbody>
                <tr v-for="(address, index) in whitelist" :key="index">
                  <td>
                    <RouterLink
                      :to="`/${chain}/account/${address}`"
                      class="flex items-center text-primary hover:underline"
                    >
                      <IdentityIcon size="sm" :address="address" />
                      <span class="pl-2">{{ address }}</span>
                    </RouterLink>
                  </td>
                  <td class="text-right whitespace-nowrap">
                    <label
                      for="smarttoken_remove_from_whitelist"
                      class="mb-2 text-primary hover:underline cursor-pointer"
                      @click="
                        dialog.open(
                          'smarttoken_remove_from_whitelist',
                          { denom: tokenInfo.denom, address },
                          updateState
                        )
                      "
                    >
                      {{ $t('smarttoken.remove_from_whitelist') }}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- frozen -->
      <div class="bg-base-100 p-6 rounded-3xl mb-6" v-if="hasFreezingFeature">
        <div class="mb-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl px-2 font-semibold mb-4">
              {{ $t('smarttoken.frozen_addresses') }}
            </h2>
            <label
              for="smarttoken_freeze_batch"
              class="btn btn-sm btn-primary"
              @click="
                hasWhitelistFeature &&
                  dialog.open(
                    'smarttoken_freeze_batch',
                    { denom: tokenInfo.denom },
                    updateState
                  )
              "
            >
              {{ $t('smarttoken.freeze') }}
            </label>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full" v-if="!isLoadingFrozen">
              <tbody>
                <tr v-for="(address, index) in frozen" :key="index">
                  <td>
                    <RouterLink
                      :to="`/${chain}/account/${address}`"
                      class="flex items-center text-primary hover:underline"
                    >
                      <IdentityIcon size="sm" :address="address" />
                      <span class="pl-2">{{ address }}</span>
                    </RouterLink>
                  </td>
                  <td class="text-right">
                    <label
                      for="smarttoken_unfreeze"
                      class="mb-2 text-primary hover:underline cursor-pointer"
                      @click="
                        dialog.open(
                          'smarttoken_unfreeze',
                          { denom: tokenInfo.denom, address },
                          updateState
                        )
                      "
                    >
                      {{ $t('smarttoken.unfreeze') }}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- accounts -->
      <div class="bg-base-100 p-6 rounded-3xl mb-6">
        <div class="mb-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl px-2 font-semibold mb-4">
              {{ $t('module.account') }}
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full" v-if="!isLoadingOwners">
              <tbody>
                <tr v-for="(item, index) in denomOwners" :key="index">
                  <td>
                    <RouterLink
                      :to="`/${chain}/account/${item.address}`"
                      class="flex items-center text-primary hover:underline"
                    >
                      <IdentityIcon size="sm" :address="item.address" />
                      <span class="pl-2">{{ item.address }}</span>
                    </RouterLink>
                  </td>
                  <td class="text-right whitespace-nowrap uppercase">
                    {{ item.balance.amount / 10 ** tokenInfo.decimals }}
                    {{ tokenInfo.symbol }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
