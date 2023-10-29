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
    title: 'Bonded Tokens',
    value: computed(
      () => `${bondedTokens.value.toFixed(0)} ${bondDenomSymbol}`
    ),
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
          class="input rounded-full text-center text-2xl w-full max-w-xs !input-bordered"
          placeholder="1000000"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="p-2">Your Investment = ${{ investment.toFixed(2) }}</div>
        <div class="form-control p-2">
          <label class="label cursor-pointer">
            <span class="label-text mr-2">Compound Weekly</span>
            <input type="checkbox" class="checkbox" v-model="compoundWeekly" />
          </label>
        </div>
      </div>
      <div class="bg-base-300 px-4 py-8 rounded-3xl">
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-600">Staking APR</p>
          <p class="text-xl font-bold text-green-600">
            {{ finalStakingAPR.toFixed(2) }}%
          </p>
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-center">
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

    <div class="bg-base-100 p-8 rounded-3xl">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Disclaimer:</h2>
      <p class="text-sm text-gray-600">
        The information provided by this Staking Rewards Calculator is for
        general informational purposes only. All information on the site is
        provided in good faith, however, we make no representation or warranty
        of any kind, express or implied, regarding the accuracy, adequacy,
        validity, reliability, availability, or completeness of any information
        on the site.
      </p>
      <p class="mt-4 text-sm text-gray-600">
        The results generated by this calculator are based on the current
        parameters of the blockchain and the input values provided by the user.
        These may not reflect real-world conditions or future market behaviors.
        The calculated rewards are estimates and should not be considered as
        financial advice, investment guidance, or an encouragement to engage in
        staking or any other financial activities.
      </p>
      <p class="mt-4 text-sm text-gray-600">
        Market conditions, token value fluctuations, staking policies, and other
        factors can significantly affect the actual staking rewards. Users are
        advised to conduct their own research and consult with financial experts
        before making any investment decisions.
      </p>
      <p class="mt-4 text-sm text-gray-600">
        By using this calculator, you acknowledge that neither the developers
        nor any associated parties will be responsible for any losses, damages,
        or implications resulting from the use of, or reliance on, the
        information provided by this calculator. The use of this calculator is
        solely at your own risk.
      </p>
    </div>
  </div>
</template>
