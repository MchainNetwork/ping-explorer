<script lang="ts" setup>
import {
  useBaseStore,
  useBlockchain,
  useFormatter,
  useMintStore,
  useStakingStore,
  useTxDialog,
  useWalletStore,
  useParamStore,
} from '@/stores';
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import type { Key, SlashingParam, Validator } from '@/types';
import { formatSeconds } from '@/libs/utils';
import IdentityIcon from '@/components/IdentityIcon.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const props = defineProps(['chain']);

const staking = useStakingStore();
const base = useBaseStore();
const format = useFormatter();
const dialog = useTxDialog();
const chainStore = useBlockchain();
const mintStore = useMintStore();
const walletStore = useWalletStore();
const paramStore = useParamStore();

const bondDenom = 'umark';
const bondedTokens = ref(<number>0);
const totalSupply = ref<number>(0);
const inflation = ref<number>(0);

const searchQuery = ref('');

const bondedTokensRatio = computed(() => {
  return bondedTokens.value / totalSupply.value;
});

// APR Calculation
const stakingAPR = computed(() => {
  if (bondedTokensRatio.value === 0 || isNaN(bondedTokensRatio.value)) {
    return 0;
  }
  return inflation.value / bondedTokensRatio.value;
});

function walletStateChange() {
  walletStore.loadMyAsset();
}

const cache = JSON.parse(localStorage.getItem('avatars') || '{}');
const avatars = ref(cache || {});
const latest = ref({} as Record<string, number>);
const yesterday = ref({} as Record<string, number>);
const tab = ref('active');
const unbondList = ref([] as Validator[]);
const slashing = ref({} as SlashingParam);

onMounted(() => {
  walletStore.loadMyAsset();

  paramStore.getMintingInflation().then((res) => {
    inflation.value = Number(res.inflation);
  });
  chainStore.rpc?.getStakingPool().then((res) => {
    bondedTokens.value = Number(res?.pool?.bonded_tokens);
  });
  chainStore.rpc?.getBankSupplyByDenom('umark').then((res) => {
    totalSupply.value = Number(res.amount.amount);
  });
  staking.fetchInacitveValdiators().then((res) => {
    unbondList.value = res;
  });
  chainStore.rpc.getSlashingParams().then((res) => {
    slashing.value = res.params;
  });
});

function formatString(str: string) {
  if (str.length <= 10) {
    return str;
  }
  return str.substring(0, 5) + '...' + str.substring(str.length - 5);
}

async function fetchChange() {
  let page = 0;

  let height = Number(base.latest?.block?.header?.height || 0);
  if (height > 14400) {
    height -= 14400;
  } else {
    height = 1;
  }
  // voting power in 24h ago
  while (page < staking.validators.length && height > 0) {
    await base.fetchValidatorByHeight(height, page).then((x) => {
      x.validators.forEach((v) => {
        yesterday.value[v.pub_key.key] = Number(v.voting_power);
      });
    });
    page += 100;
  }

  page = 0;
  // voting power for now
  while (page < staking.validators.length) {
    await base.fetchLatestValidators(page).then((x) => {
      x.validators.forEach((v) => {
        latest.value[v.pub_key.key] = Number(v.voting_power);
      });
    });
    page += 100;
  }
}

const changes = computed(() => {
  const changes = {} as Record<string, number>;
  Object.keys(latest.value).forEach((k) => {
    const l = latest.value[k] || 0;
    const y = yesterday.value[k] || 0;
    changes[k] = l - y;
  });
  return changes;
});

const change24 = (key: Key) => {
  const txt = key.key;
  // const n: number = latest.value[txt];
  // const o: number = yesterday.value[txt];
  // // console.log( txt, n, o)
  // return n > 0 && o > 0 ? n - o : 0;
  return changes.value[txt];
};

const change24Text = (key?: Key) => {
  if (!key) return '';
  const v = change24(key);
  return v && v !== 0 ? format.showChanges(v) : '';
};

const change24Color = (key?: Key) => {
  if (!key) return '';
  const v = change24(key);
  if (v > 0) return 'text-success';
  if (v < 0) return 'text-error';
};

const calculateRank = function (position: number) {
  let sum = 0;
  for (let i = 0; i < position; i++) {
    sum += Number(staking.validators[i]?.delegator_shares);
  }
  const percent = sum / staking.totalPower;

  switch (true) {
    case tab.value === 'active' && percent < 0.33:
      return 'error';
    case tab.value === 'active' && percent < 0.67:
      return 'warning';
    default:
      return 'primary';
  }
};

function isFeatured(
  endpoints: string[],
  who?: { website?: string; moniker: string }
) {
  if (!endpoints || !who) return false;
  return (
    endpoints.findIndex(
      (x) =>
        (who.website &&
          who.website
            ?.substring(0, who.website?.lastIndexOf('.'))
            .endsWith(x)) ||
        who?.moniker?.toLowerCase().search(x.toLowerCase()) > -1
    ) > -1
  );
}

const list = computed(() => {
  if (tab.value === 'active') {
    return staking.validators.map((x, i) => ({
      v: x,
      rank: calculateRank(i),
      logo: logo(x.description.identity),
    }));
  } else if (tab.value === 'featured') {
    const endpoint = chainStore.current?.endpoints?.rest?.map(
      (x) => x.provider
    );
    if (endpoint) {
      endpoint.push('ping');
      return staking.validators
        .filter((x) => isFeatured(endpoint, x.description))
        .map((x, i) => ({
          v: x,
          rank: 'primary',
          logo: logo(x.description.identity),
        }));
    }
    return [];
  }
  return unbondList.value.map((x, i) => ({
    v: x,
    rank: 'primary',
    logo: logo(x.description.identity),
  }));
});

const loadAvatars = () => {
  // fetch avatar from keybase
  let promise = Promise.resolve();
  staking.validators.forEach((item) => {
    promise = promise.then(
      () =>
        new Promise((resolve) => {
          const identity = item.description?.identity;
          if (identity && !avatars.value[identity]) {
            staking.keybase(identity).then((d) => {
              if (Array.isArray(d.them) && d.them.length > 0) {
                const uri = String(d.them[0]?.pictures?.primary?.url).replace(
                  'https://s3.amazonaws.com/keybase_processed_uploads/',
                  ''
                );
                if (uri) {
                  avatars.value[identity] = uri;
                  localStorage.setItem(
                    'avatars',
                    JSON.stringify(avatars.value)
                  );
                }
              }
              resolve();
            });
          } else {
            resolve();
          }
        })
    );
  });
};

const logo = (identity?: string) => {
  if (!identity || !avatars.value[identity]) return '';
  const url = avatars.value[identity] || '';
  return url.startsWith('http')
    ? url
    : `https://s3.amazonaws.com/keybase_processed_uploads/${url}`;
};

fetchChange();
loadAvatars();

const filteredList = computed(() => {
  if (!searchQuery.value) {
    return list.value;
  }
  return list.value.filter((item) =>
    item.v.description.moniker
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});
</script>
<template>
  <div>
    <bg-gradient-blur variant="big staking"></bg-gradient-blur>
    <div class="relative overflow-hidden mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:!text-4xl font-bold mb-4 p-4">
          {{ $t('staking.your_staking_overview') }}
        </h1>
        <div class="pr-4"></div>
      </div>

      <div
        class="bg-base-100 rounded-3xl mb-8 p-8 text-center"
        v-if="!walletStore?.currentAddress"
      >
        <p class="mb-4 text-lg">
          {{ $t('staking.view_and_manage_your_staking') }}
        </p>
        <label
          for="PingConnectWallet"
          class="btn btn-md btn-primary text-white rounded-full"
        >
          <span class="ml-1 block">{{ $t('staking.connect_wallet') }}</span>
        </label>
        <Teleport to="body">
          <ping-connect-wallet
            :chain-id="base.currentChainId"
            :hd-path="chainStore.defaultHDPath"
            :addr-prefix="chainStore.current?.bech32Prefix || 'm'"
            :locale="locale"
            @connect="walletStateChange"
            @keplr-config="walletStore.suggestChain()"
          />
        </Teleport>
      </div>

      <div
        class="bg-base-100 rounded-3xl mb-8"
        v-if="walletStore.currentAddress"
      >
        <div
          class="grid grid-cols-2 md:!grid-cols-4 auto-cols-auto gap-4 px-4 py-6"
        >
          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">{{ $t('staking.your_delegations') }}</div>
            <div class="text-lg font-semibold text-main">
              {{ walletStore.delegations.length }}
            </div>
            <div class="text-sm"></div>
          </div>

          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">
              {{ $t('staking.your_staked_amount') }}
            </div>
            <div class="text-lg font-semibold text-main">
              {{ format.formatToken(walletStore.stakingAmount) }}
            </div>
            <div class="text-sm">
              ${{ format.tokenValue(walletStore.stakingAmount) }}
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">
              {{ $t('staking.claimable_rewards') }}
            </div>
            <div class="text-lg font-semibold text-main">
              {{ format.formatToken(walletStore.rewardAmount) }}
            </div>
            <div class="text-sm">
              ${{ format.tokenValue(walletStore.rewardAmount) }}
              <label
                v-if="walletStore?.rewardAmount?.amount > 0"
                for="staking_withdraw"
                class="btn btn-primary btn-xs rounded-full text-white ml-1"
                @click="
                  dialog.open('staking.staking_withdraw', {}, walletStateChange)
                "
                >{{ $t('account.btn_withdraw') }}</label
              >
            </div>
          </div>

          <!--
        <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
          <div class="text-sm mb-1">{{ $t('index.unbonding') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.unbondingAmount) }}
          </div>
          <div class="text-sm">
            ${{ format.tokenValue(walletStore.unbondingAmount) }}
          </div>
        </div>
        -->

          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">
              {{ $t('staking.available_balance') }}
            </div>
            <div class="text-lg font-semibold text-main">
              {{ format.formatToken(walletStore.balanceOfStakingToken) }}
            </div>
            <div class="text-sm">
              ${{ format.tokenValue(walletStore.balanceOfStakingToken) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:!text-4xl font-bold mb-4 p-4">
          {{ $t('staking.staking') }}
        </h1>
        <div class="pr-4">
          <RouterLink
            :to="`/${chain}/staking/calculator`"
            class="btn btn-primary btn-sm rounded-full text-white"
          >
            <Icon icon="uil:calculator-alt" class="text-2xl"></Icon>
            <span class="hidden md:!inline-block">
              {{ $t('staking.staking_calculator') }}
            </span>
          </RouterLink>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl mb-8">
        <div
          class="grid grid-cols-2 md:!grid-cols-4 auto-cols-auto gap-4 px-4 py-6 text-center"
        >
          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">{{ $t('staking.total_staked') }}</div>
            <div class="text-lg font-semibold text-main">
              {{
                format.formatToken2({
                  amount: String(bondedTokens),
                  denom: bondDenom,
                })
              }}
            </div>
          </div>
          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">{{ $t('staking.staking_apr') }}</div>
            <div class="text-lg font-semibold text-main">
              {{ stakingAPR.toFixed(2) }}%
            </div>
          </div>
          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">{{ $t('staking.total_validators') }}</div>
            <div class="text-lg font-semibold text-main">{{ list.length }}</div>
          </div>
          <div class="bg-gray-100 dark:bg-[#1e3b47] rounded-3xl px-4 py-3">
            <div class="text-sm mb-1">{{ $t('staking.inflation') }}</div>
            <div class="text-lg font-semibold text-main">
              {{ (inflation * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>

      <!--
    <div class="bg-base-100 rounded-lg grid sm:grid-cols-1 md:grid-cols-4 p-4">
      <div class="flex">
        <span>
          <div class="font-bold">{{ format.percent(mintStore.inflation) }}</div>
          <div class="text-xs">{{ $t('staking.inflation') }}</div>
        </span>
      </div>
      <div class="flex">
        <span>
          <div class="font-bold">
            {{ formatSeconds(staking.params?.unbonding_time) }}
          </div>
          <div class="text-xs">{{ $t('staking.unbonding_time') }}</div>
        </span>
      </div>
      <div class="flex">
        <span>
          <div class="font-bold">
            {{ format.percent(slashing.slash_fraction_double_sign) }}
          </div>
          <div class="text-xs">{{ $t('staking.double_sign_slashing') }}</div>
        </span>
      </div>
      <div class="flex">
        <span>
          <div class="font-bold">
            {{ format.percent(slashing.slash_fraction_downtime) }}
          </div>
          <div class="text-xs">{{ $t('staking.downtime_slashing') }}</div>
        </span>
      </div>
    </div>
    -->

      <div class="mb-8">
        <div class="flex items-center justify-between px-4 py-2">
          <h1 class="text-xl md:!text-2xl font-bold flex-1">
            {{ $t('staking.validators') }}
          </h1>
        </div>

        <div class="bg-base-100 p-4 mt-4 pb-4 pt-2 rounded-3xl">
          <div class="flex items-center justify-between">
            <div class="py-2 mr-2 relative">
              <Icon
                icon="uil:search"
                class="text-xl text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"
              ></Icon>
              <input
                type="text"
                v-model="searchQuery"
                :placeholder="$t('staking.search_validator')"
                class="input input-sm input-bordered border border-gray-300 w-full"
              />
            </div>

            <div class="tabs tabs-boxed tabs-neutral">
              <!--
          <a
            class="tab tab-sm text-gray-400"
            :class="{ 'tab-active': tab === 'featured' }"
            @click="tab = 'featured'"
            >{{ $t('staking.popular') }}</a
          >
          -->
              <a
                class="tab tab-sm px-2"
                :class="{ 'tab-active': tab === 'active' }"
                @click="tab = 'active'"
                >{{ $t('staking.active') }}</a
              >
              <a
                class="tab tab-sm px-2"
                :class="{ 'tab-active': tab === 'inactive' }"
                @click="tab = 'inactive'"
                >{{ $t('staking.inactive') }}</a
              >
            </div>

            <!--
        <div class="text-lg font-semibold pr-4">
          {{ list.length }}/{{ staking.params.max_validators }}
        </div>
        -->
          </div>
          <div class="overflow-x-auto">
            <table class="table staking-table w-full">
              <thead>
                <tr>
                  <!--
                <th
                  scope="col"
                  class="uppercase"
                  style="width: 3rem; position: relative"
                >
                  {{ $t('staking.rank') }}
                </th>
                -->
                  <th scope="col" class="uppercase">
                    {{ $t('staking.validator') }}
                  </th>
                  <th scope="col" class="text-right uppercase">
                    {{ $t('staking.staked_amount') }}
                  </th>
                  <th scope="col" class="text-right uppercase">
                    {{ $t('staking.voting_power') }}
                  </th>
                  <!--
                <th scope="col" class="text-right uppercase">
                  {{ $t('staking.24h_changes') }}
                </th>
                -->
                  <th scope="col" class="text-right uppercase">
                    {{ $t('staking.commission') }}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{ v, logo } in filteredList"
                  :key="v.operator_address"
                  class="hover:bg-gray-100 dark:hover:bg-[#1e3b47]"
                >
                  <!--
                <td>
                  <div
                    class="text-xs truncate relative px-2 py-1 rounded-full w-fit"
                    :class="`text-${rank}`"
                  >
                    <span
                      class="inset-x-0 inset-y-0 opacity-10 absolute"
                      :class="`bg-${rank}`"
                    ></span>
                    {{ i + 1 }}
                  </div>
                </td>
                -->
                  <td>
                    <div
                      class="ml-1 flex items-center overflow-hidden"
                      style="max-width: 300px"
                    >
                      <div
                        class="avatar mr-4 relative w-8 h-8 rounded-full overflow-hidden"
                      >
                        <div class="w-8 h-8 rounded-full" v-if="logo">
                          <img :src="logo" class="object-contain" />
                        </div>
                        <IdentityIcon
                          v-else
                          size="lg"
                          :address="v.operator_address"
                        />
                      </div>

                      <div class="flex flex-col">
                        <span
                          class="text-sm text-primary whitespace-nowrap overflow-hidden"
                        >
                          <RouterLink
                            :to="{
                              name: 'chain-staking-validator',
                              params: {
                                validator: v.operator_address,
                              },
                            }"
                            class="font-bold text-base"
                          >
                            {{ v.description?.moniker }}
                          </RouterLink>
                        </span>
                        <span class="text-xs">
                          {{ formatString(v.operator_address) }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="text-right">
                    {{
                      format.formatToken(
                        {
                          amount: parseInt(v.tokens).toString(),
                          denom: staking.params.bond_denom,
                        },
                        true,
                        '0,0'
                      )
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      format.calculatePercent(
                        v.delegator_shares,
                        staking.totalPower
                      )
                    }}
                  </td>
                  <!--
                <td
                  class="text-right text-xs"
                  :class="change24Color(v.consensus_pubkey)"
                >
                  {{ change24Text(v.consensus_pubkey) }}
                </td>
                -->
                  <td class="text-right">
                    {{
                      format.formatCommissionRate(
                        v.commission?.commission_rates?.rate
                      )
                    }}
                  </td>
                  <td class="text-right">
                    <div
                      v-if="v.jailed"
                      class="badge badge-error gap-2 text-white"
                    >
                      {{ $t('staking.jailed') }}
                    </div>
                    <label
                      v-if="!v.jailed && walletStore.currentAddress"
                      for="staking_delegate"
                      class="btn btn-xs btn-primary rounded-full capitalize text-white mr-1"
                      @click="
                        dialog.open('staking_delegate', {
                          validator_address: v.operator_address,
                        })
                      "
                      >{{ $t('account.btn_delegate') }}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!--
        <div class="divider"></div>
        <div class="flex flex-row items-center">
          <div
            class="text-xs truncate relative py-2 px-4 rounded-md w-fit text-error mr-2"
          >
            <span
              class="inset-x-0 inset-y-0 opacity-10 absolute bg-error"
            ></span>
            {{ $t('staking.top') }} 33%
          </div>
          <div
            class="text-xs truncate relative py-2 px-4 rounded-md w-fit text-warning"
          >
            <span
              class="inset-x-0 inset-y-0 opacity-10 absolute bg-warning"
            ></span>
            {{ $t('staking.top') }} 67%
          </div>
          <div class="text-xs hidden md:!block pl-2">
            {{ $t('staking.description') }}
          </div>
        </div>
        --></div>
      </div>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      i18n: 'staking',
      order: 4
    }
  }
</route>

<style>
.staking-table.table :where(th, td) {
  padding: 8px 5px;
  background: transparent;
}
</style>
