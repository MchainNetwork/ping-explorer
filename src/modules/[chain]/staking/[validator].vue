<script setup lang="ts">
import {
  useBlockchain,
  useFormatter,
  useMintStore,
  useStakingStore,
  useTxDialog,
} from '@/stores';
import { onMounted, computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import IdentityIcon from '@/components/IdentityIcon.vue';
//@ts-ignore
import CommissionRate from '@/components/ValidatorCommissionRate.vue';
import {
  consensusPubkeyToHexAddress,
  operatorAddressToAccount,
  pubKeyToValcons,
  valoperToPrefix,
} from '@/libs';
import {
  PageRequest,
  type Coin,
  type Delegation,
  type PaginatedDelegations,
  type PaginatedTxs,
  type Validator,
} from '@/types';
//@ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';

const props = defineProps(['validator', 'chain']);

const staking = useStakingStore();
const blockchain = useBlockchain();
const format = useFormatter();
const dialog = useTxDialog();
const page = new PageRequest();

const validator: string = props.validator;

const v = ref({} as Validator);
const cache = JSON.parse(localStorage.getItem('avatars') || '{}');
const avatars = ref(cache || {});
const identity = ref('');
const rewards = ref([] as Coin[] | undefined);
const commission = ref([] as Coin[] | undefined);
const delegations = ref({} as PaginatedDelegations);
const addresses = ref(
  {} as {
    account: string;
    operAddress: string;
    hex: string;
    valCons: string;
  }
);
const selfBonded = ref({} as Delegation);

addresses.value.account = operatorAddressToAccount(validator);
// load self bond
staking
  .fetchValidatorDelegation(validator, addresses.value.account)
  .then((x) => {
    if (x) {
      selfBonded.value = x.delegation_response;
    }
  });

const txs = ref({} as PaginatedTxs);

blockchain.rpc.getTxsBySender(addresses.value.account).then((x) => {
  txs.value = x;
});

const apr = computed(() => {
  const rate = v.value.commission?.commission_rates.rate || 0;
  const inflation = useMintStore().inflation;
  if (Number(inflation)) {
    return format.percent((1 - Number(rate)) * Number(inflation));
  }
  return '-';
});

const selfRate = computed(() => {
  if (selfBonded.value.balance?.amount) {
    return format.calculatePercent(
      selfBonded.value.balance.amount,
      v.value.tokens
    );
  }
  return '-';
});
const logo = (identity?: string) => {
  if (!identity) return '';
  const url = avatars.value[identity] || '';
  return url.startsWith('http')
    ? url
    : `https://s3.amazonaws.com/keybase_processed_uploads/${url}`;
};
onMounted(() => {
  if (validator) {
    staking.fetchValidator(validator).then((res) => {
      v.value = res.validator;
      identity.value = res.validator?.description?.identity || '';
      if (identity.value && !avatars.value[identity.value]) {
        staking.keybase(identity.value).then((d) => {
          if (Array.isArray(d.them) && d.them.length > 0) {
            const uri = String(d.them[0]?.pictures?.primary?.url).replace(
              'https://s3.amazonaws.com/keybase_processed_uploads/',
              ''
            );
            if (uri) {
              avatars.value[identity.value] = uri;
              localStorage.setItem('avatars', JSON.stringify(avatars.value));
            }
          }
        });
      }
      const prefix = valoperToPrefix(v.value.operator_address) || '<Invalid>';
      addresses.value.hex = consensusPubkeyToHexAddress(
        v.value.consensus_pubkey
      );
      addresses.value.valCons = pubKeyToValcons(
        v.value.consensus_pubkey,
        prefix
      );
    });
    blockchain.rpc
      .getDistributionValidatorOutstandingRewards(validator)
      .then((res) => {
        rewards.value = res.rewards?.rewards?.sort(
          (a, b) => Number(b.amount) - Number(a.amount)
        );
        res.rewards?.rewards?.forEach((x) => {
          if (x.denom.startsWith('ibc/')) {
            format.fetchDenomTrace(x.denom);
          }
        });
      });
    blockchain.rpc.getDistributionValidatorCommission(validator).then((res) => {
      commission.value = res.commission?.commission?.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      );
      res.commission?.commission?.forEach((x) => {
        if (x.denom.startsWith('ibc/')) {
          format.fetchDenomTrace(x.denom);
        }
      });
    });

    // Disable delegations due to its bad performance
    // Comment out the following code if you want to enable it
    // pageload(1)
  }
});
let showCopyToast = ref(0);
const copyWebsite = async (url: string) => {
  if (!url) {
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
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
};
const tipMsg = computed(() => {
  return showCopyToast.value === 2
    ? { class: 'error', msg: 'Copy Error!' }
    : { class: 'success', msg: 'Copy Success!' };
});

function pageload(p: number) {
  page.setPage(p);
  blockchain.rpc
    .getStakingValidatorsDelegations(validator, page)
    .then((res) => {
      delegations.value = res;
    });
}
</script>
<template>
  <div>
    <bg-gradient-blur variant="validator"></bg-gradient-blur>
    <div class="relative overflow-hidden mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center m-4 ml-0 mb-6">
        <a @click="$router.go(-1)" class="btn btn-ghost btn-circle btn-sm mx-1">
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </a>
        <h2 class="text-xl md:!text-4xl font-bold flex-1 ml-2">Validator</h2>
        <div>
          <label
            for="staking_delegate"
            class="btn btn-primary btn-sm rounded-full w-full"
            @click="
              dialog.open('staking_delegate', {
                validator_address: v.operator_address,
              })
            "
            >{{ $t('account.btn_delegate') }}</label
          >
        </div>
      </div>
      <div class="bg-base-100 px-4 pt-3 pb-4 mb-4 rounded-3xl" v-if="v">
        <div class="flex p-4 items-center">
          <div class="overflow-hidden">
            <div class="w-24 rounded-full" v-if="identity">
              <img
                v-if="avatars[identity] !== 'undefined'"
                v-lazy="logo(identity)"
                class="object-contain"
              />
            </div>
            <IdentityIcon
              v-if="v.operator_address && !identity"
              width="24"
              height="24"
              :address="v?.operator_address || ''"
            />
          </div>
          <div class="mx-4 flex-1">
            <h4 class="font-bold text-2xl">{{ v.description?.moniker }}</h4>
            <div class="text-sm mb-4" v-if="v.description?.identity">
              {{ v.description?.identity || '-' }}
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:!flex-row pt-2 pb-1">
          <div class="flex-1">
            <div class="m-4 text-sm">
              <p class="text-sm mb-3 font-medium">
                {{ $t('staking.about_us') }}
              </p>
              <div class="card-list">
                <div class="flex items-center mb-2">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.website') }}:
                  </span>
                  <a
                    :href="v?.description?.website || '#'"
                    :class="
                      v?.description?.website
                        ? 'cursor-pointer'
                        : 'cursor-default'
                    "
                  >
                    {{ v.description?.website || '-' }}
                  </a>
                </div>
                <div class="flex items-center">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.contact') }}:
                  </span>
                  <a
                    v-if="v.description?.security_contact"
                    :href="'mailto:' + v.description.security_contact || '#'"
                    class="cursor-pointer"
                  >
                    {{ v.description?.security_contact || '-' }}
                  </a>
                </div>
              </div>
              <p class="text-sm mt-4 mb-3 font-medium">
                {{ $t('staking.validator_status') }}
              </p>
              <div class="card-list">
                <div class="flex items-center mb-2">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.status') }}: </span
                  ><span>
                    {{ String(v.status).replace('BOND_STATUS_', '') }}
                  </span>
                </div>
                <div class="flex items-center">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.jailed') }}:
                  </span>
                  <span> {{ v.jailed || '-' }} </span>
                </div>
              </div>
              <p class="text-sm mt-4 mb-3 font-medium">
                {{ $t('staking.liquid_staking') }}
              </p>
              <div class="card-list">
                <div class="flex items-center mb-2">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.validator_bond_share') }}:
                  </span>
                  <span>
                    {{
                      format.formatToken(
                        {
                          amount: v.validator_bond_shares,
                          denom: staking.params.bond_denom,
                        },
                        false
                      )
                    }}
                  </span>
                </div>
                <div class="flex items-center">
                  <span class="font-bold mr-2"
                    >{{ $t('staking.liquid_staking_shares') }}:
                  </span>
                  <span>
                    {{
                      format.formatToken(
                        {
                          amount: v.liquid_shares,
                          denom: staking.params.bond_denom,
                        },
                        false
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex flex-col mt-10">
              <div class="flex mb-2">
                <div class="ml-3 flex flex-col justify-center">
                  <h4>
                    {{
                      format.formatToken2({
                        amount: v.tokens,
                        denom: staking.params.bond_denom,
                      })
                    }}
                  </h4>
                  <span class="text-sm">{{ $t('staking.total_bonded') }}</span>
                </div>
              </div>
              <div class="flex mb-2">
                <div class="ml-3 flex flex-col justify-center">
                  <h4>
                    {{ format.formatToken(selfBonded.balance) }} ({{
                      selfRate
                    }})
                  </h4>
                  <span class="text-sm">{{ $t('staking.self_bonded') }}</span>
                </div>
              </div>

              <div class="flex mb-2">
                <div class="ml-3 flex flex-col">
                  <h4>
                    {{ v.min_self_delegation }} {{ staking.params.bond_denom }}
                  </h4>
                  <span class="text-sm">{{ $t('staking.min_self') }}</span>
                </div>
              </div>
              <div class="flex mb-2">
                <div class="ml-3 flex flex-col justify-center">
                  <h4>{{ apr }}</h4>
                  <span class="text-sm">{{ $t('staking.annual_profit') }}</span>
                </div>
              </div>

              <div class="flex mb-2">
                <div class="ml-3 flex flex-col justify-center">
                  <h4>{{ v.unbonding_height }}</h4>
                  <span class="text-sm">{{
                    $t('staking.unbonding_height')
                  }}</span>
                </div>
              </div>

              <div class="flex mb-2">
                <div class="ml-3 flex flex-col justify-center">
                  <h4
                    v-if="
                      v.unbonding_time && !v.unbonding_time.startsWith('1970')
                    "
                  >
                    {{ format.toDay(v.unbonding_time, 'from') }}
                  </h4>
                  <h4 v-else>-</h4>
                  <span class="text-sm">{{
                    $t('staking.unbonding_time')
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm px-4 pt-3 border-t" v-if="v.description?.details">
          {{ v.description?.details }}
        </div>
      </div>

      <div class="mt-3 grid grid-cols-1 md:!grid-cols-2 gap-4">
        <div class="mb-4">
          <CommissionRate :commission="v.commission"></CommissionRate>
        </div>
        <div class="bg-base-100 rounded-3xl relative overflow-auto mb-4">
          <div class="text-lg font-semibold text-main px-4 pt-4">
            {{ $t('staking.commissions_&_rewards') }}
          </div>
          <div
            class="px-4 mt-1 flex flex-col justify-between pb-4 max-h-72"
            style="height: calc(100% - 50px)"
          >
            <div class="overflow-auto flex-1">
              <div class="text-sm mb-2">{{ $t('staking.commissions') }}</div>
              <div
                v-for="(i, k) in commission"
                :key="`reward-${k}`"
                color="info"
                label
                variant="outlined"
                class="mr-1 mb-1 badge text-xs"
              >
                {{ format.formatToken2(i) }}
              </div>
              <div class="text-sm mb-2 mt-2">
                {{ $t('staking.outstanding') }} {{ $t('account.rewards') }}
              </div>
              <div
                v-for="(i, k) in rewards"
                :key="`reward-${k}`"
                class="mr-1 mb-1 badge text-xs"
              >
                {{ format.formatToken2(i) }}
              </div>
            </div>
            <div class="">
              <label
                for="staking_withdraw_commission"
                class="btn btn-primary rounded-full w-full"
                @click="
                  dialog.open('staking_withdraw_commission', {
                    validator_address: v.operator_address,
                  })
                "
                >{{ $t('account.btn_withdraw') }}</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl overflow-x-auto mb-4">
        <div class="px-4 pt-4 mb-2 text-main font-lg font-semibold">
          {{ $t('staking.addresses') }}
        </div>
        <div class="px-4 pb-4">
          <div class="mb-3">
            <div class="text-sm flex">
              {{ $t('staking.account_addr') }}
              <Icon
                icon="mdi:content-copy"
                class="ml-2 cursor-pointer"
                v-show="addresses.account"
                @click="copyWebsite(addresses.account || '')"
              />
            </div>
            <RouterLink
              class="text-xs text-primary"
              :to="`/${chain}/account/${addresses.account}`"
            >
              {{ addresses.account }}
            </RouterLink>
          </div>
          <div class="mb-3">
            <div class="text-sm flex">
              {{ $t('staking.operator_addr') }}
              <Icon
                icon="mdi:content-copy"
                class="ml-2 cursor-pointer"
                v-show="v.operator_address"
                @click="copyWebsite(v.operator_address || '')"
              />
            </div>
            <div class="text-xs">
              {{ v.operator_address }}
            </div>
          </div>
          <div class="mb-3">
            <div class="text-sm flex">
              {{ $t('staking.hex_addr') }}
              <Icon
                icon="mdi:content-copy"
                class="ml-2 cursor-pointer"
                v-show="addresses.hex"
                @click="copyWebsite(addresses.hex || '')"
              />
            </div>
            <div class="text-xs">{{ addresses.hex }}</div>
          </div>
          <div class="mb-3">
            <div class="text-sm flex">
              {{ $t('staking.signer_addr') }}
              <Icon
                icon="mdi:content-copy"
                class="ml-2 cursor-pointer"
                v-show="addresses.valCons"
                @click="copyWebsite(addresses.valCons || '')"
              />
            </div>
            <div class="text-xs">{{ addresses.valCons }}</div>
          </div>
          <div>
            <div class="text-sm flex">
              {{ $t('staking.consensus_pub_key') }}
              <Icon
                icon="mdi:content-copy"
                class="ml-2 cursor-pointer"
                v-show="v.consensus_pubkey"
                @click="copyWebsite(JSON.stringify(v.consensus_pubkey) || '')"
              />
            </div>
            <div class="text-xs">{{ v.consensus_pubkey }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="delegations.delegation_responses"
        class="mt-5 bg-base-100 rounded-3xl p-4 mb-4"
      >
        <div class="text-lg mb-4 font-semibold">
          {{ $t('account.delegations') }}
          <span class="float-right">
            {{ delegations.delegation_responses?.length || 0 }} /
            {{ delegations.pagination?.total || 0 }}
          </span>
        </div>
        <div class="rounded overflow-auto">
          <table class="table validatore-table w-full">
            <thead>
              <th class="text-left pl-4" style="position: relative; z-index: 2">
                {{ $t('account.delegator') }}
              </th>
              <th class="text-left pl-4">{{ $t('account.delegation') }}</th>
            </thead>
            <tbody>
              <tr
                :key="delegation.delegator_address"
                v-for="{
                  balance,
                  delegation,
                } in delegations.delegation_responses"
              >
                <td class="text-sm text-primary">
                  {{ delegation.delegator_address }}
                </td>
                <td class="truncate text-primary">
                  {{ format.formatToken(balance) }}
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationBar
            :total="delegations.pagination?.total"
            :limit="page.limit"
            :callback="pageload"
          />
        </div>
      </div>

      <div class="mt-5 bg-base-100 rounded-3xl p-4 mb-4">
        <div class="text-lg mb-4 font-semibold">
          {{ $t('account.transactions') }}
        </div>
        <div class="rounded overflow-auto">
          <table class="table validatore-table w-full">
            <thead>
              <th class="text-left pl-4" style="position: relative; z-index: 2">
                {{ $t('account.height') }}
              </th>
              <th class="text-left pl-4">{{ $t('account.hash') }}</th>
              <th class="text-left pl-4" width="40%">
                {{ $t('account.messages') }}
              </th>
              <th class="text-left pl-4">{{ $t('account.time') }}</th>
            </thead>
            <tbody>
              <tr v-for="(item, i) in txs.tx_responses">
                <td class="text-sm text-primary">
                  <RouterLink :to="`/${props.chain}/block/${item.height}`">{{
                    item.height
                  }}</RouterLink>
                </td>
                <td class="truncate text-primary" style="max-width: 200px">
                  <RouterLink :to="`/${props.chain}/tx/${item.txhash}`">
                    {{ item.txhash }}
                  </RouterLink>
                </td>
                <td>
                  <div class="flex items-center">
                    <span class="mr-2">{{
                      format.messages(item.tx.body.messages)
                    }}</span>
                    <Icon
                      v-if="item.code === 0"
                      icon="uil:check"
                      class="text-yes"
                    />
                    <Icon v-else icon="uil:multiply" class="text-no" />
                  </div>
                </td>
                <td width="150">{{ format.toDay(item.timestamp, 'from') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  </div>
</template>

<style>
.validatore-table.table :where(th, td) {
  padding: 0.6rem 1rem;
  font-size: 14px;
}
</style>
