<script setup>
definePageMeta({ middleware: ["auth"] });
import { store } from "@/composables/states.js";
import { useFetcher } from "@/composables/useFetcher";
import { ref, reactive, watch, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const params = store.dashboard.params;

const { data, pending, error, refresh } = useFetcher("/dashboard", {
  query: params,
  lazy: true,
});

store.dashboard.data = data;
store.dashboard.pending = pending;
store.dashboard.error = error;

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  params.page = Number(urlParams.get("page")) || 1;
  params.per_page = Number(urlParams.get("per_page")) || 10;
  params.sort_column = urlParams.get("sort_column") || "id";
  params.sort_direction = urlParams.get("sort_direction") || "asc";
  params.search = urlParams.get("search") || "";
  router.push({ ...params });
});

if (params.search === "") delete params.search;

watch(
  params,
  () => {
    refresh();
    const query = { ...params };
    if (query.search === "") delete query.search;
    router.push({ query });
  },
  { deep: true }
);

const updateParams = (newParams) => {
  Object.assign(params, newParams);
};
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Dashboard</Title>
    </Head>
    <CustomTable
      :data="store.dashboard.data"
      :pending="store.dashboard.pending"
      :refresh="refreshDashboard"
      :params="params"
      @update-params="updateParams"
    />
  </NuxtLayout>
</template>
