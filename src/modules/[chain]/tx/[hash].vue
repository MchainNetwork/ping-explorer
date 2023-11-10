<script lang="ts" setup>
import { useBlockchain, useFormatter } from '@/stores';
import DynamicComponent from '@/components/dynamic/DynamicComponent.vue';
import { computed, ref } from '@vue/reactivity';
import type { Tx, TxResponse } from '@/types';
import { Icon } from '@iconify/vue';

import { JsonViewer } from 'vue3-json-viewer';
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import 'vue3-json-viewer/dist/index.css';

const props = defineProps(['hash', 'chain']);

const tab = ref('1');
const changeTab = (val: '1' | '2') => {
  tab.value = val;
};

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

const blockchain = useBlockchain();
const format = useFormatter();
const tx = ref(
  {} as {
    tx: Tx;
    tx_response: TxResponse;
  }
);
if (props.hash) {
  blockchain.rpc.getTx(props.hash).then((x) => (tx.value = x));
}
const messages = computed(() => {
  return tx.value.tx?.body?.messages || [];
});

const events = computed(() => {
  return tx.value.tx_response?.events || [];
});
</script>
<template>
  <div class="mx-auto max-w-screen-lg">
    <div class="flex items-center mb-2 flex-1">
      <a @click="$router.go(-1)" class="btn btn-ghost btn-circle btn-sm mx-1">
        <Icon
          icon="uil:angle-left"
          class="text-3xl text-gray-500 dark:text-gray-400"
        />
      </a>
      <h1 class="text-4xl font-bold p-4">
        {{ $t('account.transaction') }}
      </h1>
    </div>

    <div
      v-if="tx.tx_response"
      class="bg-base-100 px-4 pt-3 pb-4 rounded-3xl mb-8"
    >
      <div class="overflow-auto-x">
        <table class="table text-sm">
          <tbody>
            <tr>
              <td>{{ $t('tx.tx_hash') }}</td>
              <td>
                {{ tx.tx_response.txhash }}
                <Icon
                  @click="copyAdress(tx.tx_response.txhash)"
                  icon="uil:copy"
                  class="inline-block text-primary cursor-pointer ml-2 text-lg text-gray-500 dark:text-gray-400"
                />
              </td>
            </tr>
            <tr>
              <td>{{ $t('account.height') }}</td>
              <td>
                <RouterLink
                  :to="`/${props.chain}/block/${tx.tx_response.height}`"
                  class="text-primary font-bold hover:underline"
                >
                  #{{ tx.tx_response.height }}
                </RouterLink>
                <Icon
                  @click="copyAdress(tx.tx_response.height)"
                  icon="uil:copy"
                  class="inline-block text-primary cursor-pointer ml-2 text-lg text-gray-500 dark:text-gray-400"
                />
              </td>
            </tr>
            <tr>
              <td>{{ $t('staking.status') }}</td>
              <td>
                <div
                  class="font-bold"
                  :class="`text-${
                    tx.tx_response.code === 0 ? 'green-500' : 'error'
                  }`"
                >
                  {{ tx.tx_response.code === 0 ? 'Success' : 'Failed' }}
                </div>
              </td>
            </tr>
            <tr>
              <td>{{ $t('tx.gas') }}</td>
              <td>
                {{ tx.tx_response.gas_used }} / {{ tx.tx_response.gas_wanted }}
              </td>
            </tr>
            <tr>
              <td>{{ $t('tx.fee') }}</td>
              <td>
                {{
                  format.formatTokens(
                    tx.tx?.auth_info?.fee?.amount,
                    true,
                    '0,0.[00]'
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>{{ $t('account.time') }}</td>
              <td>
                {{ format.toLocaleDate(tx.tx_response.timestamp) }} ({{
                  format.toDay(tx.tx_response.timestamp, 'from')
                }})
              </td>
            </tr>
            <tr>
              <td>Raw Transaction</td>
              <td>
                <a
                  class="text-primary font-bold text-sm hover:underline"
                  :href="
                    blockchain.rpc.endpoint +
                    '/cosmos/tx/v1beta1/txs/' +
                    tx.tx_response.txhash
                  "
                  target="_blank"
                  >View</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="tabs tabs-boxed mb-4">
      <a
        class="tab"
        :class="{ 'tab-active': tab === '1' }"
        @click="changeTab('1')"
      >
        {{ $t('account.messages') }}: ({{ messages.length }})</a
      >
      <a
        class="tab"
        :class="{ 'tab-active': tab === '2' }"
        @click="changeTab('2')"
      >
        {{ $t('tx.events') }}: ({{ events.length }})
      </a>
    </div>

    <div
      v-if="tx.tx_response && tab === '1'"
      class="bg-base-100 p-4 rounded-3xl mb-8"
    >
      <div v-for="(msg, i) in messages">
        <div class="border border-base-300 rounded-3xl">
          <DynamicComponent :value="msg" />
        </div>
      </div>
      <div v-if="messages.length === 0">{{ $t('tx.no_messages') }}</div>
    </div>

    <div
      v-if="tx.tx_response && tab === '2'"
      class="bg-base-100 p-4 rounded-3xl mb-4"
    >
      <div
        class="border border-base-300 rounded-3xl mb-4 overflow-hidden"
        v-for="(event, eventIndex) in events"
        :key="eventIndex"
      >
        <div class="text-md font-bold m-2 pl-2">{{ event.type }}</div>
        <JsonViewer :value="event.attributes" boxed expand-depth="5" />
      </div>
      <div v-if="events.length === 0">{{ $t('tx.no_events') }}</div>
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
