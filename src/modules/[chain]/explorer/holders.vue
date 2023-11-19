<script setup lang="ts">
//@ts-ignore
import { useBlockchain, useFormatter, useWalletStore } from '@/stores';
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
//@ts-ignore
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['chain']);

const walletStore = useWalletStore();
const blockchain = useBlockchain();
const format = useFormatter();

const supply = ref({} as any);
const denomOwners = ref([] as any);

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

const denom = 'umark';

function pageload() {
  if (denom) {
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
    <div class="relative overflow-auto mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center m-4 ml-0 mb-6">
        <a @click="$router.go(-1)" class="btn btn-ghost btn-circle btn-sm mx-1">
          <Icon
            icon="uil:angle-left"
            class="text-3xl text-gray-500 dark:text-gray-400"
          />
        </a>
        <h2 class="text-xl md:!text-4xl font-bold flex-1 ml-2">
          {{ $t('smarttoken.holders') }}
        </h2>
        <div></div>
      </div>

      <!-- holders -->
      <div class="bg-base-100 p-6 rounded-3xl mb-6">
        <div class="mb-4">
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full" v-if="!isLoadingOwners">
              <thead>
                <tr>
                  <th>{{ $t('smarttoken.address') }}</th>
                  <th class="text-right">{{ $t('smarttoken.quantity') }}</th>
                  <th class="text-right" style="max-width: 80px">
                    {{ $t('smarttoken.percentage') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sortedDenomOwners" :key="index">
                  <td class="flex items-center">
                    <RouterLink
                      :to="`/${chain}/account/${item.address}`"
                      class="flex items-center text-primary hover:underline"
                    >
                      <IdentityIcon size="sm" :address="item.address" />
                      <span class="pl-3 font-semibold">
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
                    {{ item.balance.amount / 10 ** 6 }}
                    UMARK
                  </td>
                  <td class="text-right whitespace-nowrap uppercase">
                    <div>
                      {{
                        calculatePercentage(
                          item.balance.amount,
                          supply?.amount
                        )
                      }}%
                    </div>
                    <div
                      class="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700"
                    >
                      <div
                        class="bg-primary h-1 rounded-full"
                        :style="{
                          width:
                            calculatePercentage(
                              item.balance.amount,
                              maxBalance
                            ) + '%',
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
