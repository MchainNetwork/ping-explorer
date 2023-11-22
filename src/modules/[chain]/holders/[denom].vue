<script setup lang="ts">
//@ts-ignore
import {
  useBlockchain,
  useFormatter,
  useWalletStore,
  useTxDialog,
} from '@/stores';
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
//@ts-ignore
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['denom', 'chain']);

const walletStore = useWalletStore();
const blockchain = useBlockchain();
const format = useFormatter();
const dialog = useTxDialog();

const denom = ref(props.denom);
const chain = ref(props.chain);

const supply = ref({} as any);
const denomOwners = ref([] as any);
const moduleAccounts = ref({} as any);
const metadata = ref({} as any);
const totalBurned = ref({} as any);

function updateState() {
  walletStore.loadMyAsset();
  pageload();
}

function calculatePercentage(
  ownerBalance: number,
  totalSupply: number
): String {
  if (totalSupply === 0) return '0.00';
  const percentage = (ownerBalance / totalSupply) * 100;
  return percentage.toFixed(4);
}

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

const isLoadingOwners = ref(false);

function pageload() {
  if (denom) {
    blockchain.rpc.getBankSupplyByDenom(denom.value).then((x) => {
      supply.value = x.amount;
    });

    blockchain.rpc.getBankDenomsMetadataByDenom(denom.value).then((x) => {
      metadata.value = x.metadata;
      metadata.value.denom_unit = metadata.value?.denom_units?.find(
        (unit: { denom: string }) => unit.denom === metadata.value.display
      );
    });

    blockchain.rpc.getAuthModuleAccounts().then((x) => {
      moduleAccounts.value = x.accounts;

      //@ts-ignore
      moduleAccounts.value = x.accounts.reduce((acc, account) => {
        acc[account.base_account.address] = account;
        return acc;
      }, {});
    });

    isLoadingOwners.value = true;
    blockchain.rpc
      ?.getBankDenomOwners(denom.value)
      .then((x) => {
        denomOwners.value = x.denom_owners;
      })
      .finally(() => {
        isLoadingOwners.value = false;
      });

    totalBurned.value = {};
    blockchain.rpc.getBurnTotalBurnedByDenom(denom.value).then((x) => {
      totalBurned.value = x.total_burned;
    });
  }
}

const sortedDenomOwners = computed(() => {
  return [...denomOwners.value].sort((a, b) => {
    return b.balance.amount - a.balance.amount;
  });
});

const maxBalance = computed(() => {
  if (sortedDenomOwners.value && sortedDenomOwners.value.length > 0) {
    return sortedDenomOwners.value[0].balance.amount;
  } else {
    return 0;
  }
});

onMounted(() => {
  pageload();
});
</script>

<template>
  <div>
    <bg-gradient-blur variant="big smarttoken"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center m-4 ml-0 mb-6">
        <RouterLink
          :to="`/${chain}/explorer`"
          class="btn btn-ghost btn-circle btn-sm mx-1"
        >
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </RouterLink>
        <h2 class="text-xl md:!text-4xl font-bold flex-1 ml-2">
          {{ $t('smarttoken.holders') }}: {{ metadata.name }} ({{
            metadata.symbol
          }})
        </h2>
        <div class="pr-4" v-if="denom === totalBurned.denom">
          <div class="tooltip" :data-tip="$t('smarttoken.total_burned')">
            🔥
            {{
              metadata.denom_unit?.exponent
                ? totalBurned.amount / 10 ** metadata.denom_unit.exponent
                : totalBurned.amount
            }}
            {{ metadata.symbol }}
          </div>
          <label
            for="burn_burn"
            class="btn bg-red-500 hover:bg-red-600 text-white btn-sm ml-2"
            @click="dialog.open('burn_burn', { denom }, updateState)"
          >
            {{ $t('smarttoken.burn') }}
          </label>
        </div>
      </div>
      <!-- holders -->
      <div class="bg-base-100 p-6 rounded-3xl mb-6">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full" v-if="!isLoadingOwners">
            <thead>
              <tr>
                <th width="1%">#</th>
                <th>{{ $t('smarttoken.address') }}</th>
                <th class="text-right">{{ $t('smarttoken.quantity') }}</th>
                <th class="text-right" style="max-width: 80px">
                  {{ $t('smarttoken.percentage') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedDenomOwners" :key="index">
                <td>{{ index + 1 }}</td>
                <td class="flex items-center">
                  <RouterLink
                    :to="`/${chain}/account/${item.address}`"
                    class="flex items-center text-primary hover:underline"
                  >
                    <IdentityIcon
                      size="sm"
                      class="mr-2"
                      :address="item.address"
                    />
                    <div
                      class="tooltip"
                      :data-tip="moduleAccounts[item.address].name"
                      v-if="moduleAccounts[item.address]"
                    >
                      <Icon
                        icon="uil:file-info-alt"
                        class="inline-block mx-1 cursor-pointer ml-2 text-lg text-gray-400 dark:text-gray-400"
                      />
                    </div>
                    <span class="pl-1 font-semibold">
                      {{ format.shortAddress(item.address) }}
                    </span>
                  </RouterLink>
                  <Icon
                    @click="copyAdress(item.address)"
                    icon="uil:copy"
                    class="inline-block cursor-pointer ml-2 text-lg text-gray-400 dark:text-gray-400"
                  />
                </td>
                <td class="text-right whitespace-nowrap uppercase">
                  {{
                    metadata.denom_unit?.exponent
                      ? item.balance.amount / 10 ** metadata.denom_unit.exponent
                      : item.balance.amount
                  }}
                  {{ metadata.symbol }}
                </td>
                <td class="text-right whitespace-nowrap uppercase">
                  <div>
                    {{
                      calculatePercentage(item.balance.amount, supply?.amount)
                    }}%
                  </div>
                  <div
                    class="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700"
                  >
                    <div
                      class="bg-primary h-1 rounded-full"
                      :style="{
                        width:
                          calculatePercentage(item.balance.amount, maxBalance) +
                          '%',
                      }"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
</template>
