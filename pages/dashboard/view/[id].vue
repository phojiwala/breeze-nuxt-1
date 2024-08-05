<script setup>
import { ref, onMounted, watch } from "vue";
import { useFetcher } from "@/composables/useFetcher";

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const { data, status, pending, error, refresh, execute } = useFetcher(`/dashboard/${id.value}`);

onMounted(async () => {
  await execute();
});

watch(
  () => route.params.id,
  async (newId) => {
    if (newId !== id.value) {
      id.value = newId;
      await execute();
    }
  }
);

const goBack = () => {
  router.back();
};
</script>

<template>
  <NuxtLayout name="app-layout">
    <Button @click="goBack"> Back </Button>
    <br />
    <br />

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </NuxtLayout>
</template>
