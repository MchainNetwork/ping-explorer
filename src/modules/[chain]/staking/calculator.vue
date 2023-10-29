<script setup lang="ts">
import { ref, computed } from 'vue';

// TODO: values from parameters
const inflation = ref<number>(0.0702); // 7.02%
const communityTax = ref<number>(0.02); // 2%
const bondedTokensRatio = ref<number>(0.09 / 100); // 0.09%
const validatorCommission = ref<number>(0.05); // 5% - Example
const totalSupply = 110000000; // 110M
const blocksPerYear = 5057308;

const mintDecimal = 6;
const bondDenomSymbol = 'MARK';
const tokenValueUSD = ref<number>(0.001); // Token value in USD - Example

const stake = ref<number>(1000000); // 1M - Example

const tokensPerBlock = computed(() => {
  return (inflation.value * totalSupply) / blocksPerYear;
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
    value: computed(() => `${(bondedTokensRatio.value * 100).toFixed(2)}%`),
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
]);
</script>

<template>
  <div class="mx-auto max-w-screen-md">
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
            {{ stakingAPR.toFixed(2) }}%
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Daily Returns</p>
            <p class="text-xl font-bold">
              {{ returns.dailyTokens.toFixed(2) }} {{ bondDenomSymbol
              }}<br />${{ returns.dailyUSD.toFixed(2) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Monthly Returns</p>
            <p class="text-xl font-bold">
              {{ returns.monthlyTokens.toFixed(2) }} {{ bondDenomSymbol
              }}<br />${{ returns.monthlyUSD.toFixed(2) }}
            </p>
          </div>
          <div class="col-span-2">
            <p class="text-sm font-medium text-gray-600">Yearly Returns</p>
            <p class="text-xl font-bold">
              {{ returns.annualTokens.toFixed(2) }} {{ bondDenomSymbol
              }}<br />${{ returns.annualUSD.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 my-4 text-center">
      <div
        class="bg-base-100 rounded-3xl"
        v-for="(card, index) in cardData"
        :key="index"
      >
        <div class="p-4">
          <p class="text-xs">{{ card.title }}</p>
          <p class="text-xl">{{ card.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
