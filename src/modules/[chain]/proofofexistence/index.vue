<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useBlockchain, useFormatter } from '@/stores';
import { PageRequest, type Pagination } from '@/types';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();

import { Icon } from '@iconify/vue';
import PaginationBar from '@/components/PaginationBar.vue';
import IdentityIcon from '@/components/IdentityIcon.vue';

const props = defineProps(['chain']);

const blockchain = useBlockchain();
const router = useRouter();

const format = useFormatter();

const fileInput = ref<HTMLInputElement | null>(null);

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const calculateHash = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const handleFile = async (event: DragEvent) => {
  const file = event.dataTransfer?.files[0] || fileInput.value?.files?.[0];
  if (!file) return;

  const hash = await calculateHash(file);

  router.push(`/${props.chain}/proofofexistence/${hash}`);
};

const handleFileChange = (event: Event) => {
  handleFile(event as unknown as DragEvent);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const txs = ref<any[]>([]);

interface Event {
  type: string;
  attributes?: Array<{ key: string; value: string; index: boolean }>;
}

interface ProcessedTxData {
  txhash: string;
  height: string;
  timestamp: string;
  attributes: { [key: string]: string };
}

function pageload(p: number) {
  pageRequest.value.setPage(p);
  blockchain.rpc.getTxsByPoe(pageRequest.value).then((x) => {
    const processedData: ProcessedTxData[] = x.tx_responses.map(
      (txResponse) => {
        const attributes = txResponse.events.reduce((acc, event) => {
          event.attributes.forEach((attr) => {
            acc[attr.key] = attr.value.replace(/"/g, '');
          });
          return acc;
        }, {} as { [key: string]: string });

        return {
          txhash: txResponse.txhash,
          height: txResponse.height,
          timestamp: txResponse.timestamp,
          attributes: attributes,
        };
      }
    );
    txs.value = processedData;
    pageResponse.value.total = String(x.total);
  });
}

const originalTitle = document.title;

onBeforeUnmount(() => {
  document.title = originalTitle;
});

onMounted(() => {
  document.title = t('poe.proof_of_existence');

  pageload(1);
});
</script>

<template>
  <div>
    <bg-gradient-blur variant="poe"></bg-gradient-blur>
    <div class="relative container mx-auto max-w-screen-lg text-center p-4">
      <h2 class="text-3xl md:text-5xl font-bold text-primary mb-6">
        {{ $t('poe.proof_of_existence') }}
      </h2>
      <p class="text-lg md:text-xl">
        {{ $t('poe.ensure_the_authenticity_and_existence') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
        <div>
          <Icon icon="uil:lock" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">
            {{ $t('poe.immutable_proof') }}
          </h3>
          <p class="text-sm">
            {{ $t('poe.blockchain_technology_ensures') }}
          </p>
        </div>
        <div>
          <Icon icon="uil:file-check" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">
            {{ $t('poe.easy_verification') }}
          </h3>
          <p class="text-sm">
            {{ $t('poe.effortlessly_verify') }}
          </p>
        </div>
        <div>
          <Icon icon="uil:globe" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">
            {{ $t('poe.global_accessibility') }}
          </h3>
          <p class="text-sm">
            {{ $t('poe.access_and_verify') }}
          </p>
        </div>
      </div>
    </div>
    <div class="relative text-center max-w-screen-md mx-auto">
      <div
        class="file-drop-area bg-base-100 border-dashed border-4 border-gray-400 cursor-pointer hover:border-primary hover:text-primary rounded-3xl p-10 py-10 mb-14 text-xl"
        @drop.prevent="handleFile"
        @dragover.prevent
        @click="triggerFileInput"
      >
        <Icon icon="uil:file-upload" class="text-5xl mx-auto mb-6 opacity-70" />
        <div>{{ $t('poe.drag_and_drop_a_file_here') }}</div>
        <input
          type="file"
          class="hidden"
          ref="fileInput"
          @change="handleFileChange"
        />
        <div class="text-sm opacity-70">
          {{ $t('poe.for_your_security_and_privacy') }}
        </div>
      </div>
    </div>

    <div class="mb-20 relative container mx-auto max-w-screen-lg text-left p-4">
      <h2 class="text-xl font-bold mb-4 mx-2">
        {{ $t('poe.stored_proofs') }}
      </h2>
      <div class="overflow-x-auto">
        <table class="table table-compact">
          <thead>
            <tr>
              <td>{{ $t('poe.creator') }}</td>
              <td>{{ $t('account.height') }}</td>
              <td>{{ $t('poe.proof') }}</td>
              <td class="text-right">{{ $t('poe.date') }}</td>
            </tr>
          </thead>
          <tr
            :key="index"
            v-for="(item, index) in txs"
            class="hover:bg-gray-100 dark:hover:bg-[#1e3b47]"
          >
            <td>
              <RouterLink
                :to="`/${chain}/account/${item.attributes.creator}`"
                class="flex items-center text-primary hover:underline"
              >
                <IdentityIcon size="sm" :address="item.attributes.creator" />
                <span class="pl-3 font-semibold">
                  {{ format.shortAddress(item.attributes.creator) }}
                </span>
              </RouterLink>
            </td>
            <td>
              <RouterLink
                :to="'/mchain/block/' + item.height"
                class="text-primary hover:underline"
              >
                {{ item.height }}
              </RouterLink>
            </td>
            <td width="20%">
              <RouterLink
                :to="'/mchain/proofofexistence/' + item.attributes.hash"
                class="text-primary hover:underline"
              >
                {{ item.attributes.hash.substring(0, 32) }}...
              </RouterLink>
            </td>
            <td class="text-right whitespace-nowrap">
              {{ format.toDay(item.timestamp, 'datetime') }}
            </td>
          </tr>
        </table>
      </div>
      <PaginationBar
        :limit="pageRequest.limit"
        :total="pageResponse.total"
        :callback="pageload"
      />
    </div>
  </div>
</template>

<route>
    {
      meta: {
        i18n: 'proofofexistence',
        order: 200
      }
    }
</route>
