<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  useBaseStore,
  useBlockchain,
  useFormatter,
  useTxDialog,
  useWalletStore,
  useStakingStore,
  useParamStore,
  useBankStore,
  useMintStore,
} from '@/stores';

const blockchain = useBlockchain();
const walletStore = useWalletStore();
const baseStore = useBaseStore();
const format = useFormatter();
const dialog = useTxDialog();
const stakingStore = useStakingStore();
const paramStore = useParamStore();
const bankStore = useBankStore();
const mintStore = useMintStore();

const bondedTokens = ref(<number>0);
const totalSupply = ref<number>(0);
const inflation = ref<number>(0);

const blocksPerYear = 5057308;
const mintDecimal = 6;
const bondDenomSymbol = 'MARK';

const communityTax = ref<number>(0.02); // 2%
const tokenValueUSD = ref<number>(0.001059); // Token value in USD - Example
const validatorCommission = ref<number>(0.05); // 5% - Example
const stake = ref<number>(1000000); // 1M - Example

onMounted(() => {
  paramStore.getMintingInflation().then((res) => {
    inflation.value = Number(res.inflation);
  });
  blockchain.rpc?.getStakingPool().then((res) => {
    bondedTokens.value = Number(res?.pool?.bonded_tokens) / 10 ** mintDecimal;
  });
  blockchain.rpc?.getBankSupplyByDenom('umark').then((res) => {
    totalSupply.value = Number(res.amount.amount) / 10 ** mintDecimal;
  });
});

const tokensPerBlock = computed(() => {
  return (inflation.value * totalSupply.value) / blocksPerYear;
});

const bondedTokensRatio = computed(() => {
  return bondedTokens.value / totalSupply.value;
});

// APR Calculation
const stakingAPR = computed(() => {
  return (inflation.value * (1 - communityTax.value)) / bondedTokensRatio.value;
});

// Final APR calculation considering validator's commission
const finalStakingAPR = computed(() => {
  return stakingAPR.value * (1 - validatorCommission.value);
});

const investment = computed(() => {
  return stake.value * tokenValueUSD.value;
});

const calculateReturns = (stakeValue: number, apr: number): any => {
  const annualProfitTokens = (stakeValue * apr) / 100;
  const annualProfitUSD = annualProfitTokens * tokenValueUSD.value;

  return {
    dailyTokens: annualProfitTokens / 365,
    dailyUSD: annualProfitUSD / 365,
    monthlyTokens: annualProfitTokens / 12,
    monthlyUSD: annualProfitUSD / 12,
    annualTokens: annualProfitTokens,
    annualUSD: annualProfitUSD,
  };
};

const returns = computed(() =>
  calculateReturns(stake.value, finalStakingAPR.value)
);

const cardData = ref([
  {
    title: 'Staking APR',
    value: computed(() => `${stakingAPR.value.toFixed(2)}%`),
  },
  {
    title: 'Community Tax',
    value: computed(() => `${(communityTax.value * 100).toFixed(0)}%`),
  },
  {
    title: 'Validator Commission',
    value: computed(() => `${(validatorCommission.value * 100).toFixed(0)}%`),
  },
  {
    title: 'Final Staking APR',
    value: computed(() => `${finalStakingAPR.value.toFixed(2)}%`),
  },
  {
    title: 'Token Price',
    value: computed(() => `$${tokenValueUSD.value.toFixed(4)}`),
  },

  {
    title: 'Bonded Ratio',
    value: computed(() => `${(bondedTokensRatio.value * 1000).toFixed(2)}%`),
  },
  {
    title: 'Actual Inflation',
    value: computed(() => `${(inflation.value * 100).toFixed(2)}%`),
  },
  {
    title: 'Tokens per Block',
    value: computed(
      () => `${tokensPerBlock.value.toFixed(2)} ${bondDenomSymbol}`
    ),
  },
  {
    title: 'Blocks per Year',
    value: computed(() => `${blocksPerYear}`),
  },
  {
    title: 'Total Supply',
    value: computed(() => `${totalSupply.value.toFixed(0)} ${bondDenomSymbol}`),
  },
]);
</script>

<template>
  <div class="mx-auto max-w-screen-md" v-if="finalStakingAPR">
    <div class="bg-base-100 p-4 my-4 rounded-3xl text-center">
      <h1 class="text-4xl font-bold mb-4 p-4">Staking Rewards Calculator</h1>
      <div class="mb-4">
        <label for="stake" class="block text-md font-bold mb-4"
          >Enter Your Mchain ({{ bondDenomSymbol }}) Stake</label
        >
        <input
          type="number"
          id="stake"
          v-model.number="stake"
          class="input input-bordered text-center text-2xl rounded-full w-full max-w-xs"
          placeholder="1000000"
        />
        <div class="my-2 mb-6">= ${{ investment.toFixed(2) }}</div>
      </div>
      <div class="bg-base-300 px-4 py-8 rounded-3xl">
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-600">Staking APR</p>
          <p class="text-xl font-bold text-green-600">
            {{ finalStakingAPR.toFixed(2) }}%
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Daily Returns</p>
            <p class="text-xl font-bold">
              {{ returns.dailyTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.dailyUSD.toFixed(2) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Monthly Returns</p>
            <p class="text-xl font-bold">
              {{ returns.monthlyTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.monthlyUSD.toFixed(2) }}
            </p>
          </div>
          <div class="md:col-span-2">
            <p class="text-sm font-medium text-gray-600">Yearly Returns</p>
            <p class="text-xl font-bold">
              {{ returns.annualTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.annualUSD.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4 text-center"
    >
      <div
        class="bg-base-100 rounded-3xl"
        v-for="(card, index) in cardData"
        :key="index"
      >
        <div class="p-4">
          <p class="text-xs">{{ card.title }}</p>
          <p class="text-md">{{ card.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
