<script lang="ts" setup>
import {
  useBlockchain,
  useFormatter,
  useStakingStore,
  useTxDialog,
} from '@/stores';
// @ts-ignore
import DynamicComponent from '@/components/dynamic/DynamicComponent.vue';
import DonutChart from '@/components/charts/DonutChart.vue';
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

import type {
  AuthAccount,
  Delegation,
  TxResponse,
  DelegatorRewards,
  UnbondingResponses,
  MnsNames,
} from '@/types';
import type { Coin } from '@cosmjs/amino';
//@ts-ignore
import Countdown from '@/components/Countdown.vue';

const props = defineProps(['address', 'chain']);

const blockchain = useBlockchain();
const stakingStore = useStakingStore();
const dialog = useTxDialog();
const format = useFormatter();
const account = ref({} as AuthAccount);
const txs = ref({} as TxResponse[]);
const txsRecipient = ref({} as TxResponse[]);
const delegations = ref([] as Delegation[]);
const rewards = ref({} as DelegatorRewards);
const balances = ref([] as Coin[]);
const unbonding = ref([] as UnbondingResponses[]);
const unbondingTotal = ref(0);
const domains = ref([] as MnsNames[]);
const chart = {};

onMounted(() => {
  loadAccount(props.address);
});

const totalAmountByCategory = computed(() => {
  let sumDel = 0;
  delegations.value?.forEach((x) => {
    sumDel += Number(x.balance.amount);
  });
  let sumRew = 0;
  rewards.value?.total?.forEach((x) => {
    sumRew += Number(x.amount);
  });
  let sumBal = 0;
  balances.value?.forEach((x) => {
    sumBal += Number(x.amount);
  });
  let sumUn = 0;
  unbonding.value?.forEach((x) => {
    x.entries?.forEach((y) => {
      sumUn += Number(y.balance);
    });
  });
  return [sumBal, sumDel, sumRew, sumUn];
});

const labels = ['Balance', 'Delegation', 'Reward', 'Unbonding'];

const totalAmount = computed(() => {
  return totalAmountByCategory.value.reduce((p, c) => c + p, 0);
});

const totalValue = computed(() => {
  let value = 0;
  delegations.value?.forEach((x) => {
    value += format.tokenValueNumber(x.balance);
  });
  rewards.value?.total?.forEach((x) => {
    value += format.tokenValueNumber(x);
  });
  balances.value?.forEach((x) => {
    value += format.tokenValueNumber(x);
  });
  unbonding.value?.forEach((x) => {
    x.entries?.forEach((y) => {
      value += format.tokenValueNumber({
        amount: y.balance,
        denom: stakingStore.params.bond_denom,
      });
    });
  });
  return format.formatNumber(value, '0,0.00');
});

function loadAccount(address: string) {
  blockchain.rpc.getAuthAccount(address).then((x) => {
    account.value = x.account;
  });
  blockchain.rpc.getTxsBySender(address).then((x) => {
    txs.value = x.tx_responses;
  });
  blockchain.rpc.getTxsByRecipient(address).then((x) => {
    txsRecipient.value = x.tx_responses;
  });
  blockchain.rpc.getDistributionDelegatorRewards(address).then((x) => {
    rewards.value = x;
  });
  blockchain.rpc.getStakingDelegations(address).then((x) => {
    delegations.value = x.delegation_responses;
  });
  blockchain.rpc.getBankBalances(address).then((x) => {
    balances.value = x.balances;
  });
  blockchain.rpc.getStakingDelegatorUnbonding(address).then((x) => {
    unbonding.value = x.unbonding_responses;
    x.unbonding_responses?.forEach((y) => {
      y.entries.forEach((z) => {
        unbondingTotal.value += Number(z.balance);
      });
    });
  });
  blockchain.rpc.getMnsListOwnedNames(address).then((x: any) => {
    console.log(x);
    domains.value = x.names;
  });
}

function updateEvent() {
  loadAccount(props.address);
}
</script>
<template>
  <div>
    <bg-gradient-blur variant="big home"></bg-gradient-blur>
    <div v-if="account" class="relative mx-auto max-w-screen-lg pb-20">
      <div class="flex justify-between items-center my-4 mb-6">
        <a @click="$router.go(-1)" class="btn btn-ghost btn-circle btn-sm mx-1">
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </a>
        <div class="flex gap-4 ml-4 flex-1">
          <IdentityIcon size="md" :address="address" />
          <div class="truncate">
            <h2 class="text-xl flex font-bold text-base">
              {{ $t('account.address') }}
            </h2>
            <span class="text-gray-500">{{ address }}</span>
          </div>
        </div>
        <div>
          <label
            for="bank_send"
            class="btn btn-primary btn-sm rounded-full mr-2"
            @click="dialog.open('bank_send', {}, updateEvent)"
            >{{ $t('account.btn_send') }}</label
          >
          <label
            for="ibc_transfer"
            class="btn btn-primary btn-sm rounded-full"
            @click="
              dialog.open(
                'ibc_transfer',
                {
                  chain_name: blockchain.current?.prettyName,
                },
                updateEvent
              )
            "
            >{{ $t('account.btn_transfer') }}</label
          >
        </div>
      </div>

      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <div class="md:flex">
          <!-- list-->
          <div class="md:w-3/4">
            <!--balances  -->
            <h4 class="text-lg font-bold p-4">{{ $t('account.assets') }}</h4>

            <div
              class="flex items-center px-4 mb-2"
              v-for="(balanceItem, index) in balances.filter(
                (b) => b.denom === 'umark'
              )"
              :key="index"
            >
              <img src="/coins/umark.svg" class="h-8 w-8 mr-4" />
              <div class="text-sm font-semibold">
                {{ format.formatToken(balanceItem) }}
              </div>
              <!--
              <label
                for="bank_send"
                class="btn btn-primary btn-sm mx-2"
                @click="
                  dialog.open(
                    'bank_send',
                    { denom: balanceItem.denom },
                    updateEvent
                  )
                "
              >
                {{ $t('account.btn_send') }}
              </label>
              -->
            </div>
            <div
              class="flex items-center px-4 py-2 mb-2"
              v-for="(balanceItem, index) in balances.filter(
                (b) => b.denom === 'beer'
              )"
              :key="index"
            >
              <img src="/coins/beer.svg" class="h-8 w-8 mr-4" />
              <div class="text-sm font-semibold">
                {{ format.formatToken(balanceItem) }}
              </div>
            </div>
            <div class="overflow-x-auto">
              <div
                class="flex items-center px-4 py-2 mb-2"
                v-for="(balanceItem, index) in balances.filter(
                  (b) => b.denom != 'beer' && b.denom != 'umark'
                )"
                :key="index"
              >
                <div class="text-sm font-semibold whitespace-nowrap">
                  {{ balanceItem.amount }} {{ balanceItem.denom }}
                </div>
              </div>
            </div>
          </div>
          <div class="md:w-1/4">
            <!--delegations  -->
            <h4 class="text-lg font-bold p-4">
              {{ $t('account.delegations') }}
            </h4>
            <div
              class="flex items-center px-4 mb-4"
              v-for="(delegationItem, index) in delegations"
              :key="index"
            >
              <img src="/coins/umark.svg" class="h-8 w-8 mr-4" />
              <div class="text-sm font-semibold">
                {{ format.formatToken(delegationItem?.balance) }}
              </div>
            </div>
            <!-- rewards.total -->
            <template v-if="rewards.total">
              <h4 class="text-lg font-bold p-4">{{ $t('account.rewards') }}</h4>
              <div
                class="flex items-center px-4 mb-4"
                v-for="(rewardItem, index) in rewards.total"
                :key="index"
              >
                <img
                  :src="`/coins/${rewardItem.denom}.svg`"
                  class="h-8 w-8 mr-4"
                />
                <div class="text-sm font-semibold">
                  {{ format.formatToken(rewardItem) }}
                </div>
              </div>
            </template>
            <template v-if="unbondingTotal">
              <h4 class="text-lg font-bold p-4">
                {{ $t('account.unbonding_delegations') }}
              </h4>
              <div class="flex items-center px-4 mb-4">
                <img src="/coins/umark.svg" class="h-8 w-8 mr-4" />

                <div class="text-sm font-semibold">
                  {{
                    format.formatToken({
                      amount: String(unbondingTotal),
                      denom: stakingStore.params.bond_denom,
                    })
                  }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Delegations -->
      <div class="flex items-center justify-between mb-2">
        <h2 class="card-title p-4 mb-2">{{ $t('account.delegations') }}</h2>
        <div class="flex justify-end mb-2 pr-5">
          <label
            for="staking_delegate"
            class="btn btn-primary btn-sm rounded-full mr-2"
            @click="dialog.open('staking_delegate', {}, updateEvent)"
            >{{ $t('account.btn_delegate') }}</label
          >
          <label
            for="staking_withdraw"
            class="btn btn-primary btn-sm rounded-full"
            @click="dialog.open('staking_withdraw', {}, updateEvent)"
            >{{ $t('account.btn_withdraw') }}</label
          >
        </div>
      </div>

      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <div class="overflow-x-auto">
          <table class="table w-full text-sm table-zebra">
            <thead>
              <tr>
                <th class="py-3">{{ $t('account.validator') }}</th>
                <th class="py-3">{{ $t('account.delegation') }}</th>
                <th class="py-3">{{ $t('account.rewards') }}</th>
                <th class="py-3"></th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-if="delegations.length === 0">
                <td colspan="10">
                  <div class="text-center">
                    {{ $t('account.no_delegations') }}
                  </div>
                </td>
              </tr>
              <tr v-for="(v, index) in delegations" :key="index">
                <td class="text-caption text-primary py-3">
                  <RouterLink
                    :to="`/${chain}/staking/${v.delegation.validator_address}`"
                    >{{
                      format.validatorFromBech32(
                        v.delegation.validator_address
                      ) || v.delegation.validator_address
                    }}</RouterLink
                  >
                </td>
                <td class="py-3">
                  {{ format.formatToken(v.balance, true, '0,0.[000000]') }}
                </td>
                <td class="py-3">
                  {{
                    format.formatTokens(
                      rewards?.rewards?.find(
                        (x) =>
                          x.validator_address === v.delegation.validator_address
                      )?.reward
                    )
                  }}
                </td>
                <td class="py-3">
                  <div v-if="v.balance" class="flex justify-end">
                    <label
                      for="staking_delegate"
                      class="btn btn-primary btn-xs mr-2"
                      @click="
                        dialog.open(
                          'staking_delegate',
                          {
                            validator_address: v.delegation.validator_address,
                          },
                          updateEvent
                        )
                      "
                      >{{ $t('account.btn_delegate') }}</label
                    >
                    <label
                      for="staking_redelegate"
                      class="btn btn-primary btn-xs mr-2"
                      @click="
                        dialog.open(
                          'staking_redelegate',
                          {
                            validator_address: v.delegation.validator_address,
                          },
                          updateEvent
                        )
                      "
                      >{{ $t('account.btn_redelegate') }}</label
                    >
                    <label
                      for="staking_unbond"
                      class="btn btn-primary btn-xs"
                      @click="
                        dialog.open(
                          'staking_unbond',
                          {
                            validator_address: v.delegation.validator_address,
                          },
                          updateEvent
                        )
                      "
                      >{{ $t('account.btn_unbond') }}</label
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Unbonding Delegations -->
      <h2 class="card-title p-4 mb-4" v-if="unbonding && unbonding.length > 0">
        {{ $t('account.unbonding_delegations') }}
      </h2>
      <div
        class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4"
        v-if="unbonding && unbonding.length > 0"
      >
        <div class="overflow-x-auto">
          <table class="table text-sm w-full">
            <thead>
              <tr>
                <th class="py-3">{{ $t('account.creation_height') }}</th>
                <th class="py-3">{{ $t('account.initial_balance') }}</th>
                <th class="py-3">{{ $t('account.balance') }}</th>
                <th class="py-3">{{ $t('account.completion_time') }}</th>
              </tr>
            </thead>
            <tbody class="text-sm" v-for="(v, index) in unbonding" :key="index">
              <tr>
                <td
                  class="text-caption text-primary py-3 bg-slate-200"
                  colspan="10"
                >
                  <RouterLink
                    :to="`/${chain}/staking/${v.validator_address}`"
                    >{{ v.validator_address }}</RouterLink
                  >
                </td>
              </tr>
              <tr :key="index" v-for="(entry, index) in v.entries">
                <td class="py-3">{{ entry.creation_height }}</td>
                <td class="py-3">
                  {{
                    format.formatToken(
                      {
                        amount: entry.initial_balance,
                        denom: stakingStore.params.bond_denom,
                      },
                      true,
                      '0,0.[00]'
                    )
                  }}
                </td>
                <td class="py-3">
                  {{
                    format.formatToken(
                      {
                        amount: entry.balance,
                        denom: stakingStore.params.bond_denom,
                      },
                      true,
                      '0,0.[00]'
                    )
                  }}
                </td>
                <td class="py-3">
                  <Countdown
                    :time="
                      new Date(entry.completion_time).getTime() -
                      new Date().getTime()
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Domains -->
      <h2 class="card-title p-4 mb-4">{{ $t('account.domains') }}</h2>
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <div class="overflow-x-auto">
          <table class="table w-full text-sm">
            <thead>
              <tr>
                <th class="py-3">
                  {{ $t('account.name') }}
                </th>
                <td>{{ $t('account.expire') }}</td>
                <td>{{ $t('account.subdomains') }}</td>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-if="domains.length === 0">
                <td colspan="10">
                  <div class="text-center">
                    {{ $t('account.no_domains') }}
                  </div>
                </td>
              </tr>
              <tr v-for="(v, index) in domains" :key="index">
                <td class="text-sm py-3">
                  <RouterLink
                    :to="`/${chain}/mns/${v.name}.${v.tld}`"
                    class="text-primary"
                    >{{ v.name }}.{{ v.tld }}</RouterLink
                  >
                </td>
                <td class="py-3">
                  {{ format.toDay(v.expires, 'from') }}
                </td>
                <td>
                  {{ v.subdomains.length }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Transactions -->
      <h2 class="card-title p-4 mb-4">{{ $t('account.transactions') }}</h2>
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <div class="overflow-x-auto">
          <table class="table w-full text-sm">
            <thead>
              <tr>
                <th class="py-3">{{ $t('account.messages') }}</th>
                <th class="py-3">{{ $t('account.hash') }}</th>
                <th class="py-3">{{ $t('account.height') }}</th>
                <th class="py-3">{{ $t('staking.status') }}</th>
                <th class="py-3 text-right">{{ $t('account.time') }}</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-if="txs.length === 0">
                <td colspan="10">
                  <div class="text-center">
                    {{ $t('account.no_transactions') }}
                  </div>
                </td>
              </tr>
              <tr v-for="(v, index) in txs" :key="index">
                <td class="py-3" style="max-width: 130px">
                  <span
                    class="badge badge-success badge-sm bg-green-100 text-green-800 mr-2"
                  >
                    {{ format.messages(v.tx.body.messages) }}
                  </span>
                </td>
                <td class="truncate py-3" style="max-width: 200px">
                  <RouterLink
                    :to="`/${chain}/tx/${v.txhash}`"
                    class="text-primary font-bold"
                  >
                    {{ v.txhash }}
                  </RouterLink>
                </td>
                <td class="text-sm py-3">
                  <RouterLink
                    :to="`/${chain}/block/${v.height}`"
                    class="text-primary font-bold"
                  >
                    #{{ v.height }}
                  </RouterLink>
                </td>
                <td class="text-sm py-3">
                  <div
                    class="font-bold"
                    :class="`text-${v.code === 0 ? 'green-500' : 'error'}`"
                  >
                    {{ v.code === 0 ? 'Success' : 'Failed' }}
                  </div>
                </td>
                <td class="py-3 text-right">
                  <span
                    class="text-xs"
                    :title="format.toLocaleDate(v.timestamp)"
                  >
                    {{ format.toDay(v.timestamp, 'from') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Account -->
      <!--
      <h2 class="card-title p-4 mb-4">{{ $t('account.acc') }}</h2>
      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4">
        <DynamicComponent :value="account" />
      </div>
      -->
    </div>
    <div v-else class="text-no text-sm">{{ $t('account.error') }}</div>
  </div>
</template>
