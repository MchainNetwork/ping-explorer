<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import MdEditor from 'md-editor-v3';
//@ts-ignore
import ObjectElement from '@/components/dynamic/ObjectElement.vue';
import {
  useBaseStore,
  useFormatter,
  useGovStore,
  useStakingStore,
  useTxDialog,
} from '@/stores';
import {
  PageRequest,
  type GovProposal,
  type GovVote,
  type ProposalDeposit,
  type Pagination,
} from '@/types';
import { ref, reactive } from 'vue';
//@ts-ignore
import Countdown from '@/components/Countdown.vue';
//@ts-ignore
import PaginationBar from '@/components/PaginationBar.vue';
import { fromBech32, toHex } from '@cosmjs/encoding';
import { Icon } from '@iconify/vue';

const props = defineProps(['proposal_id', 'chain']);
const proposal = ref({} as GovProposal);
const format = useFormatter();
const store = useGovStore();
const dialog = useTxDialog();
const stakingStore = useStakingStore();

const isLoading = ref(true);

store.fetchProposal(props.proposal_id).then((res) => {
  isLoading.value = false;
  const proposalDetail = reactive(res.proposal);
  // when status under the voting, final_tally_result are no data, should request fetchTally
  if (res.proposal?.status === 'PROPOSAL_STATUS_VOTING_PERIOD') {
    store.fetchTally(props.proposal_id).then((tallRes) => {
      proposalDetail.final_tally_result = tallRes?.tally;
    });
  }
  proposal.value = proposalDetail;
});

const color = computed(() => {
  if (proposal.value.status === 'PROPOSAL_STATUS_PASSED') {
    return 'success';
  } else if (proposal.value.status === 'PROPOSAL_STATUS_REJECTED') {
    return 'error';
  }
  return '';
});
const status = computed(() => {
  if (proposal.value.status) {
    return proposal.value.status.replace('PROPOSAL_STATUS_', '');
  }
  return '';
});

const deposits = ref([] as ProposalDeposit[]);
store
  .fetchProposalDeposits(props.proposal_id)
  .then((x) => (deposits.value = x.deposits));

const bondDenom = 'umark';

const totalDeposited = computed(() => {
  if (Array.isArray(deposits.value) && deposits.value.length > 0) {
    return deposits.value.reduce(
      (total, deposit) => {
        const validAmounts = deposit.amount.filter(
          (coin) => coin.denom === bondDenom
        );
        const depositTotal = validAmounts.reduce(
          (sum, coin) => sum + parseInt(coin.amount),
          0
        );
        return {
          amount: depositTotal.toString(),
          denom: bondDenom,
        };
      },
      { amount: '0', denom: bondDenom }
    );
  }
  return { amount: '0', denom: bondDenom };
});

const votes = ref({} as GovVote[]);
const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

store.fetchProposalVotes(props.proposal_id).then((x) => {
  votes.value = x.votes;
  pageResponse.value = x.pagination;
});

function shortTime(v: string) {
  if (v) {
    return format.toDay(v, 'from');
  }
  return '';
}

const votingCountdown = computed((): number => {
  const now = new Date();
  const end = new Date(proposal.value.voting_end_time);
  return end.getTime() - now.getTime();
});

const upgradeCountdown = computed((): number => {
  const height = Number(proposal.value.content?.plan?.height || 0);
  if (height > 0) {
    const base = useBaseStore();
    const current = Number(base.latest?.block?.header?.height || 0);
    return (height - current) * 6 * 1000;
  }
  const now = new Date();
  const end = new Date(proposal.value.content?.plan?.time || '');
  return end.getTime() - now.getTime();
});

const total = computed(() => {
  const tally = proposal.value.final_tally_result;
  let sum = 0;
  if (tally) {
    sum += Number(tally.abstain || 0);
    sum += Number(tally.yes || 0);
    sum += Number(tally.no || 0);
    sum += Number(tally.no_with_veto || 0);
  }
  return sum;
});

const turnout = computed(() => {
  if (total.value > 0) {
    const bonded = stakingStore.pool?.bonded_tokens || '1';
    return format.percent(total.value / Number(bonded));
  }
  return 0;
});

const yes = computed(() => {
  if (total.value > 0) {
    const yes = proposal.value?.final_tally_result?.yes || 0;
    return format.percent(Number(yes) / total.value);
  }
  return 0;
});

const no = computed(() => {
  if (total.value > 0) {
    const value = proposal.value?.final_tally_result?.no || 0;
    return format.percent(Number(value) / total.value);
  }
  return 0;
});

const veto = computed(() => {
  if (total.value > 0) {
    const value = proposal.value?.final_tally_result?.no_with_veto || 0;
    return format.percent(Number(value) / total.value);
  }
  return 0;
});

const abstain = computed(() => {
  if (total.value > 0) {
    const value = proposal.value?.final_tally_result?.abstain || 0;
    return format.percent(Number(value) / total.value);
  }
  return 0;
});
const processList = computed(() => {
  return [
    { name: 'Turnout', value: turnout.value, class: 'bg-info' },
    { name: 'Yes', value: yes.value, class: 'bg-success' },
    { name: 'No', value: no.value, class: 'bg-error' },
    { name: 'No With Veto', value: veto.value, class: 'bg-red-800' },
    { name: 'Abstain', value: abstain.value, class: 'bg-warning' },
  ];
});

function showValidatorName(voter: string) {
  const { data } = fromBech32(voter);
  const hex = toHex(data);
  const v = stakingStore.validators.find(
    (x) => toHex(fromBech32(x.operator_address).data) === hex
  );
  return v ? v.description.moniker : voter;
}

function pageload(p: number) {
  pageRequest.value.setPage(p);
  store.fetchProposalVotes(props.proposal_id, pageRequest.value).then((x) => {
    votes.value = x.votes;
    pageResponse.value = x.pagination;
  });
}
</script>

<template>
  <div>
    <bg-gradient-blur variant="big gov-proposal"></bg-gradient-blur>
    <div class="relative mx-auto max-w-screen-lg" v-if="!isLoading">
      <div class="flex justify-between items-center justify-center">
        <div class="flex items-center mb-2 flex-1">
          <RouterLink
            :to="`/${chain}/gov`"
            class="btn btn-ghost btn-circle btn-sm mx-1"
          >
            <Icon
              icon="uil:angle-left"
              class="text-3xl text-gray-500 dark:text-gray-400"
            />
          </RouterLink>
          <h1 class="text-4xl font-bold p-4">
            {{ $t('gov.proposal') }} #{{ proposal_id }}
          </h1>
        </div>
        <h2
          class="font-bold mr-4"
          v-if="proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
        >
          {{ $t('gov.total_deposited') }}:
          {{ format.formatToken(totalDeposited) }}
        </h2>
        <div class="pr-4">
          <label
            v-if="proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
            for="gov_deposit"
            class="btn btn-primary btn-sm"
            @click="dialog.open('gov_deposit', { proposal_id })"
          >
            {{ $t('gov.btn_deposit') }}
          </label>

          <label
            v-if="proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD'"
            for="gov_vote"
            class="btn btn-primary btn-sm"
            @click="dialog.open('gov_vote', { proposal_id })"
          >
            {{ $t('gov.btn_vote') }}
          </label>
        </div>
      </div>

      <div class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-8">
        <h2
          class="card-title mb-4 flex flex-col md:!justify-between md:!flex-row"
        >
          <div
            class="badge badge-ghost"
            :class="
              color === 'success'
                ? 'text-yes'
                : color === 'error'
                ? 'text-no'
                : 'text-info'
            "
          >
            {{ $t(`gov.proposal_statuses.PROPOSAL_STATUS_${status}`) }}
          </div>
        </h2>
        <div class="">
          <ObjectElement :value="proposal.content" />
        </div>
        <div v-if="proposal.summary && !proposal.content?.description">
          <MdEditor
            :model-value="format.multiLine(proposal.summary)"
            previewOnly
            class="md-editor-recover"
          ></MdEditor>
        </div>
      </div>
      <!-- grid lg:!!grid-cols-3 auto-rows-max-->
      <!-- flex-col lg:!!flex-row flex -->

      <div class="gap-4 mb-8 grid md:!grid-cols-2 auto-rows-max">
        <!-- flex-1 -->

        <div>
          <h2 class="card-title px-4 mb-4">{{ $t('gov.tally') }}</h2>
          <div
            class="bg-base-100 p-8 rounded-3xl"
            v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
          >
            <div class="mb-1" v-for="(item, index) of processList" :key="index">
              <label class="block text-sm mb-1">{{ item.name }}</label>
              <div class="h-5 w-full relative">
                <div
                  class="absolute inset-x-0 inset-y-0 w-full opacity-10 rounded-sm"
                  :class="`${item.class}`"
                ></div>
                <div
                  class="absolute inset-x-0 inset-y-0 rounded-sm"
                  :class="`${item.class}`"
                  :style="`width: ${
                    item.value === '-' || item.value === 'NaN%'
                      ? '0%'
                      : item.value
                  }`"
                ></div>
                <p
                  class="absolute inset-x-0 inset-y-0 text-center text-sm text-[#666] dark:text-white font-semibold flex items-center justify-center"
                >
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="card-title px-4 mb-4">{{ $t('gov.timeline') }}</h2>
          <div class="bg-base-100 p-4 rounded-3xl lg:!!col-span-2">
            <div class="p-4">
              <div class="flex items-center mb-8">
                <div class="flex-1">
                  <span class="opacity-70">{{ $t('gov.submit_at') }}:</span>
                  {{ format.toLocaleDate(proposal.submit_time) }}
                </div>
                <div class="text-sm">{{ shortTime(proposal.submit_time) }}</div>
              </div>
              <div class="flex items-center mb-8">
                <div class="flex-1">
                  <span class="opacity-70"> {{ $t('gov.deposit_end') }}:</span>
                  {{
                    format.toLocaleDate(
                      proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
                        ? proposal.deposit_end_time
                        : proposal.voting_start_time
                    )
                  }}
                </div>
                <div class="text-sm">
                  {{
                    shortTime(
                      proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
                        ? proposal.deposit_end_time
                        : proposal.voting_start_time
                    )
                  }}
                </div>
              </div>
              <div
                class="mb-8"
                v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
              >
                <div class="flex items-center">
                  <div class="text-base flex-1 text-main">
                    <span class="opacity-70"
                      >{{ $t('gov.vote_start_from') }}:</span
                    >
                    {{ format.toLocaleDate(proposal.voting_start_time) }}
                  </div>
                  <div class="text-sm">
                    {{ shortTime(proposal.voting_start_time) }}
                  </div>
                </div>
                <div class="pl-5 text-sm mt-2">
                  <Countdown :time="votingCountdown" />
                </div>
              </div>
              <div v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                <div class="flex items-center mb-1">
                  <div class="text-base flex-1 text-main">
                    <span class="opacity-70"> {{ $t('gov.vote_end') }}:</span>
                    {{ format.toLocaleDate(proposal.voting_end_time) }}
                  </div>
                  <div class="text-sm">
                    {{ shortTime(proposal.voting_end_time) }}
                  </div>
                </div>
                <div class="pl-5 text-sm">
                  {{ $t('gov.current_status') }}:
                  {{ $t(`gov.proposal_statuses.${proposal.status}`) }}
                </div>
              </div>

              <div
                class="mt-4"
                v-if="
                  proposal?.content?.['@type']?.endsWith(
                    'SoftwareUpgradeProposal'
                  )
                "
              >
                <div class="flex items-center">
                  <div class="w-2 h-2 rounded-full bg-warning mr-3"></div>
                  <div class="text-base flex-1 text-main">
                    <span class="opacity-70"
                      >{{ $t('gov.upgrade_plan') }}:</span
                    >
                    <span
                      v-if="Number(proposal.content?.plan?.height || '0') > 0"
                    >
                      (EST)</span
                    >
                    <span v-else>
                      {{ format.toLocaleDate(proposal.content?.plan?.time) }}
                    </span>
                  </div>
                  <div class="text-sm">
                    {{ shortTime(proposal.voting_end_time) }}
                  </div>
                </div>
                <div class="pl-5 text-sm mt-2">
                  <Countdown :time="upgradeCountdown" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2
        class="card-title px-4 mb-4"
        v-if="proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
      >
        {{ $t('gov.deposits') }}
      </h2>
      <div
        v-if="proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
        class="bg-base-100 p-4 rounded-3xl mb-8"
      >
        <div class="overflow-x-auto">
          <table class="table w-full table-zebra">
            <thead>
              <tr>
                <th>{{ $t('gov.depositor') }}</th>
                <th class="text-right">{{ $t('gov.amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="depositItem in deposits" :key="depositItem.depositor">
                <td class="py-2 text-sm">
                  {{ depositItem.depositor }}
                </td>
                <td class="py-2 text-sm text-right">
                  {{ format.formatToken(depositItem.amount[0]) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2
        class="card-title px-4 mb-4"
        v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
      >
        {{ $t('gov.votes') }}
      </h2>
      <div
        class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-4"
        v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'"
      >
        <div class="overflow-x-auto" v-if="votes.length > 0">
          <table class="table w-full table-zebra">
            <thead v-if="votes.length != 0">
              <tr>
                <th>{{ $t('gov.voter') }}</th>
                <th>{{ $t('gov.voted') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of votes" :key="index">
                <td class="py-2 text-sm">
                  {{ showValidatorName(item.voter) }}
                </td>
                <td
                  v-if="item.option"
                  class="py-2 text-sm"
                  :class="{
                    'text-yes': item.option === 'VOTE_OPTION_YES',
                    'text-gray-400': item.option === 'VOTE_OPTION_ABSTAIN',
                  }"
                >
                  {{ String(item.option).replace('VOTE_OPTION_', '') }}
                </td>
                <td v-if="item.options" class="py-2 text-sm">
                  {{
                    item.options
                      .map(
                        (x) =>
                          `${x.option.replace(
                            'VOTE_OPTION_',
                            ''
                          )}:${format.percent(x.weight)}`
                      )
                      .join(', ')
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationBar
            v-if="
              pageResponse.total && parseInt(pageResponse.total) > votes.length
            "
            :limit="pageRequest.limit"
            :total="pageResponse.total"
            :callback="pageload"
          />
        </div>
        <div v-else class="text-center p-8">
          <div class="mb-4">{{ $t('gov.no_votes_message') }}</div>
          <label
            for="gov_vote"
            class="btn btn-primary btn-sm mx-auto"
            @click="dialog.open('gov_vote', { proposal_id })"
          >
            {{ $t('gov.btn_vote') }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
