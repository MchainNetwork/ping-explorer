<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import {
  useBlockchain,
  useWalletStore,
  useTxDialog,
  useFormatter,
} from '@/stores';
import { PageRequest, type Pagination } from '@/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

import { Icon } from '@iconify/vue';
import PaginationBar from '@/components/PaginationBar.vue';

const walletStore = useWalletStore();
const blockchain = useBlockchain();
const dialog = useTxDialog();

const format = useFormatter();

const fileInput = ref<HTMLInputElement | null>(null);
const proofExists = ref(false);
const proofHash = ref('');
const proofData = ref({ creator: '', timestamp: '' });

const pageRequest = ref(new PageRequest());
const pageResponse = ref({} as Pagination);

const calculateHash = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const verifyHashInBlockchain = async (hash: string) => {
  isLoading.value = true;

  blockchain.rpc
    .getProofofexistenceProofByHash(hash)
    .then((x) => {
      proofHash.value = x.proof.hash;
      proofData.value = x.proof.metadata;
      proofExists.value = true;
    })
    .catch(() => {
      proofExists.value = false;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

function updateState() {
  if (proofHash.value) {
    verifyHashInBlockchain(proofHash.value);
  }
}

const handleFile = async (event: DragEvent) => {
  isStart.value = false;

  const file = event.dataTransfer?.files[0] || fileInput.value?.files?.[0];
  if (!file) return;

  proofHash.value = await calculateHash(file);

  verifyHashInBlockchain(proofHash.value);
};

const handleFileChange = (event: Event) => {
  handleFile(event as unknown as DragEvent);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const isLoading = ref(false);
const isStart = ref(true);

type ProofMetadata = {
  creator: string;
  timestamp: string;
};

type Proof = {
  hash: string;
  metadata: ProofMetadata;
};

const proofs = ref<Proof[]>([]);

function pageload(p: number) {
  pageRequest.value.setPage(p);
  blockchain.rpc.getProofofexistenceProofs(pageRequest.value).then((x) => {
    proofs.value = x.proofs;
    pageResponse.value = x.pagination;
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
      <h2
        v-if="isStart"
        class="text-3xl md:text-5xl font-bold text-primary mb-6"
      >
        {{ $t('poe.proof_of_existence') }}
      </h2>
      <p v-if="isStart" class="text-lg md:text-xl">
        {{ $t('poe.ensure_the_authenticity_and_existence') }}
      </p>

      <div v-if="isStart" class="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
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
        v-if="!proofHash"
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

      <div
        v-if="proofExists && proofHash"
        class="border-dashed border-4 border-success rounded-3xl p-10 my-20 text-xl"
      >
        <h3 class="text-5xl font-bold text-success mb-6">
          {{ $t('poe.proof_found_in_the_blockchain') }}
        </h3>
        <table class="table table-md mx-auto">
          <tbody>
            <tr>
              <td width="40%" class="font-bold">
                {{ $t('poe.hash_registered_in_blockchain') }}
              </td>
              <td class="break-all monospace">{{ proofHash }}</td>
            </tr>
            <tr>
              <td class="font-bold">{{ $t('poe.creator') }}</td>
              <td>{{ proofData.creator }}</td>
            </tr>
            <tr>
              <td class="font-bold">{{ $t('poe.timestamp') }}</td>
              <td>{{ proofData.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="!proofExists && proofHash"
        class="border-dashed border-4 border-primary rounded-3xl p-10 my-20 text-xl"
      >
        <h3 class="text-5xl font-bold text-primary mb-10">
          {{ $t('poe.proof_not_found_in_the_blockchain') }}
        </h3>

        <label
          for="proofofexistence_create_proof"
          class="btn btn-md btn-primary mx-4"
          @click="
            dialog.open(
              'proofofexistence_create_proof',
              { hash: proofHash },
              updateState
            )
          "
        >
          {{ $t('poe.add_proof_to_blockchain') }}
        </label>
      </div>

      <button
        v-if="!isStart"
        class="btn btn-md btn-neutral mx-4 mb-20"
        @click="
          isStart = true;
          proofHash = '';
        "
      >
        {{ $t('poe.check_another_file') }}
      </button>

      <div class="text-left mb-20" v-if="isStart">
        <h2 class="text-xl font-bold mb-4 mx-2">
          {{ $t('poe.stored_proofs') }}
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-compact">
            <thead>
              <tr>
                <td>{{ $t('poe.hash') }}</td>
                <td class="text-right">{{ $t('poe.date') }}</td>
              </tr>
            </thead>
            <tr
              :key="item.hash"
              v-for="item in proofs"
              class="hover:bg-gray-100 dark:hover:bg-[#1e3b47]"
            >
              <td width="20%">
                <RouterLink
                  :to="'/mchain/proofofexistence/' + item.hash"
                  class="hover:underline"
                  >{{ item.hash }}</RouterLink
                >
              </td>
              <td class="text-right">
                {{ format.toDay(item.metadata.timestamp, 'datetime') }}
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
