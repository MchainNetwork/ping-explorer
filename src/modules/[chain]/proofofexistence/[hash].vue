<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useBlockchain, useTxDialog, useFormatter } from '@/stores';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const props = defineProps(['hash', 'chain']);

const { t } = useI18n();

const blockchain = useBlockchain();
const dialog = useTxDialog();
const router = useRouter();

const format = useFormatter();

const proofExists = ref(false);
const proofHash = ref('');
const proofData = ref({ creator: '', timestamp: '' });
const isLoading = ref(true);

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

const originalTitle = document.title;

onBeforeUnmount(() => {
  document.title = originalTitle;
});

onMounted(() => {
  //validate hash format
  if (!/^[0-9a-f]{64}$/.test(props.hash)) {
    router.push(`/${props.chain}/proofofexistence`);
    return;
  }

  document.title = t('poe.proof_of_existence');

  proofHash.value = props.hash;
  verifyHashInBlockchain(props.hash);
});
</script>

<template>
  <div>
    <bg-gradient-blur variant="poe"></bg-gradient-blur>
    <div class="relative text-center max-w-screen-md mx-auto">
      <div class="" v-if="isLoading">Loading...</div>
      <div class="" v-if="!isLoading">
        <div
          v-if="proofExists && proofHash"
          class="bg-base-100 border-dashed border-4 border-success rounded-3xl p-10 my-20 text-xl"
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
          class="bg-base-100 border-dashed border-4 border-primary rounded-3xl p-10 my-20 text-xl"
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

        <RouterLink
          class="btn btn-md btn-neutral mx-4 mb-20"
          :to="`/${chain}/proofofexistence`"
        >
          {{ $t('poe.check_another_file') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
