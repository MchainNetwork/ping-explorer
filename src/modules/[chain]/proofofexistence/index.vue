<script setup lang="ts">
import { ref } from 'vue';
import { useBlockchain, useWalletStore, useTxDialog } from '@/stores';
import { Icon } from '@iconify/vue';

const walletStore = useWalletStore();
const blockchain = useBlockchain();
const dialog = useTxDialog();

const fileInput = ref<HTMLInputElement | null>(null);
const proofExists = ref(false);
const proofHash = ref('');
const proofData = ref({ creator: '', timestamp: '' });

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
</script>

<template>
  <div>
    <div class="relative container mx-auto max-w-screen-md text-center p-4">
      <h2
        v-if="isStart"
        class="text-3xl md:text-5xl font-bold text-primary mb-6"
      >
        Proof of Existence
      </h2>
      <p v-if="isStart">
        Ensure the authenticity and existence of your digital files with
        blockchain technology.
      </p>

      <div v-if="isStart" class="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
        <div>
          <Icon icon="uil:lock" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">Immutable Proof</h3>
          <p class="text-sm">
            Blockchain technology ensures that once a proof is recorded, it
            cannot be altered, providing undeniable evidence of existence.
          </p>
        </div>
        <div>
          <Icon icon="uil:check" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">Easy Verification</h3>
          <p class="text-sm">
            Effortlessly verify the authenticity of any document or digital
            asset, ensuring its integrity and origin trought blockchain
            technology.
          </p>
        </div>
        <div>
          <Icon icon="uil:globe" class="text-2xl mx-auto" />
          <h3 class="text-xl font-bold my-2">Global Accessibility</h3>
          <p class="text-sm">
            Access and verify proofs from anywhere in the world, making your
            digital files universally recognized and verifiable.
          </p>
        </div>
      </div>

      <div
        v-if="!proofHash"
        class="file-drop-area border-dashed border-4 border-gray-400 cursor-pointer hover:border-primary hover:text-primary hover:font-bold rounded-3xl p-10 py-20 my-20 text-xl"
        @drop.prevent="handleFile"
        @dragover.prevent
        @click="triggerFileInput"
      >
        Drag and drop a file here or click to select a file
        <input
          type="file"
          class="hidden"
          ref="fileInput"
          @change="handleFileChange"
        />
      </div>

      <div
        v-if="proofExists && proofHash"
        class="border-dashed border-4 border-success rounded-3xl p-10 my-20 text-xl"
      >
        <h3 class="text-5xl font-bold text-success mb-6">
          Proof found in the blockchain
        </h3>
        <table class="table table-md mx-auto">
          <tbody>
            <tr>
              <td width="40%" class="font-bold">
                Hash Registered in Blockchain
              </td>
              <td class="break-all monospace">
                {{ proofHash }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">Creator</td>
              <td>
                {{ proofData.creator }}
              </td>
            </tr>
            <tr>
              <td class="font-bold">Timestamp</td>
              <td>
                {{ proofData.timestamp }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="!proofExists && proofHash"
        class="border-dashed border-4 border-primary rounded-3xl p-10 my-20 text-xl"
      >
        <h3 class="text-5xl font-bold text-primary mb-10">
          Proof not found in the blockchain
        </h3>

        <label
          for="proofofexistence_create_proof"
          class="btn btn-md btn-primary mx-4"
          @click="
            dialog.open(
              'proofofexistence_create_proof',
              {
                hash: proofHash,
              },
              updateState
            )
          "
        >
          Add Proof to Blockchain
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
        Check another file
      </button>
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
