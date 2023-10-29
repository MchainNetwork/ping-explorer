<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
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

const compoundWeekly = ref(false);

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
  if (bondedTokensRatio.value === 0 || isNaN(bondedTokensRatio.value)) {
    return 0;
  }
  return (inflation.value * (1 - communityTax.value)) / bondedTokensRatio.value;
});

// Final APR calculation considering validator's commission
const finalStakingAPR = computed(() => {
  return stakingAPR.value * (1 - validatorCommission.value);
});

const investment = computed(() => {
  return stake.value * tokenValueUSD.value;
});

const calculateReturns = (
  stakeValue: number,
  apr: number,
  compound: boolean
): any => {
  let annualProfitTokens;
  if (compound) {
    const timesCompounded = 52; // weekly compounding
    const aprDecimal = apr / 100; // Convert APR to decimal
    annualProfitTokens =
      stakeValue * Math.pow(1 + aprDecimal / timesCompounded, timesCompounded) -
      stakeValue;
  } else {
    annualProfitTokens = (stakeValue * apr) / 100;
  }
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
  calculateReturns(stake.value, finalStakingAPR.value, compoundWeekly.value)
);
</script>

<template>
  <div class="mx-auto max-w-screen-md" v-if="stakingAPR > 0">
    <div class="bg-base-100 p-4 my-4 rounded-3xl text-center">
      <h1 class="text-4xl font-bold mb-4 p-4">
        {{ $t('calculator.staking_rewards_calculator') }}
      </h1>
      <div class="mb-4">
        <label for="stake" class="block text-md font-bold mb-4">
          {{
            $t('calculator.enter_your_stake', {
              chain: 'Mchain',
              symbol: bondDenomSymbol,
            })
          }}
        </label>
        <input
          type="number"
          id="stake"
          v-model.number="stake"
          class="input rounded-full text-center text-2xl w-full max-w-xs !input-bordered"
          placeholder="1000000"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="p-2">
          {{ $t('calculator.your_investment') }} = ${{ investment.toFixed(2) }}
        </div>
        <div class="form-control p-2">
          <label class="label cursor-pointer">
            <span class="label-text mr-2">{{
              $t('calculator.compound_weekly')
            }}</span>
            <input type="checkbox" class="checkbox" v-model="compoundWeekly" />
          </label>
        </div>
      </div>
      <div class="bg-base-300 px-4 py-8 rounded-3xl">
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-600">
            {{ $t('calculator.staking_apr_title') }}
          </p>
          <p class="text-xl font-bold text-green-600">
            {{ finalStakingAPR.toFixed(2) }}%
          </p>
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">
              {{ $t('calculator.daily_returns') }}
            </p>
            <p class="text-xl font-bold">
              {{ returns.dailyTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.dailyUSD.toFixed(2) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">
              {{ $t('calculator.monthly_returns') }}
            </p>
            <p class="text-xl font-bold">
              {{ returns.monthlyTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.monthlyUSD.toFixed(2) }}
            </p>
          </div>
          <div class="md:col-span-2">
            <p class="text-sm font-medium text-gray-600">
              {{ $t('calculator.yearly_returns') }}
            </p>
            <p class="text-xl font-bold">
              {{ returns.annualTokens.toFixed(2) }} {{ bondDenomSymbol }}
            </p>
            <p class="text-lg text-gray-600">
              ${{ returns.annualUSD.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-4 text-xs">
        {{ $t('calculator.variable_apr_note') }}
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-center">
      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.staking_apr_title') }}</p>
          <p class="text-md">{{ Number(stakingAPR).toFixed(2) }}%</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.community_tax_title') }}</p>
          <p class="text-md">{{ (communityTax * 100).toFixed(0) }}%</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">
            {{ $t('calculator.validator_commission_title') }}
          </p>
          <p class="text-md">{{ (validatorCommission * 100).toFixed(0) }}%</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.final_staking_apr_title') }}</p>
          <p class="text-md">{{ Number(finalStakingAPR).toFixed(2) }}%</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.token_price_title') }}</p>
          <p class="text-md">$ {{ Number(tokenValueUSD).toFixed(4) }}</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.bonded_tokens_title') }}</p>
          <p class="text-md">
            {{ Number(bondedTokens).toFixed(0) }} {{ bondDenomSymbol }}
          </p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.actual_inflation_title') }}</p>
          <p class="text-md">{{ (inflation * 100).toFixed(2) }}%</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.tokens_per_block_title') }}</p>
          <p class="text-md">
            {{ Number(tokensPerBlock).toFixed(2) }} {{ bondDenomSymbol }}
          </p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.blocks_per_year_title') }}</p>
          <p class="text-md">{{ blocksPerYear }}</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-3xl">
        <div class="p-4">
          <p class="text-xs">{{ $t('calculator.total_supply_title') }}</p>
          <p class="text-md">
            {{ Number(totalSupply).toFixed(0) }} {{ bondDenomSymbol }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 p-8 rounded-3xl">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">
        {{ $t('calculator.disclaimer_title') }}
      </h2>
      <p class="text-sm text-gray-600">
        {{ $t('calculator.disclaimer_text_1') }}
      </p>
      <p class="mt-4 text-sm text-gray-600">
        {{ $t('calculator.disclaimer_text_2') }}
      </p>
      <p class="mt-4 text-sm text-gray-600">
        {{ $t('calculator.disclaimer_text_3') }}
      </p>
      <p class="mt-4 text-sm text-gray-600">
        {{ $t('calculator.disclaimer_text_4') }}
      </p>
    </div>
  </div>
</template>
