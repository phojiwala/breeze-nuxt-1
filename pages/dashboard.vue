<script setup>
definePageMeta({ middleware: ["auth"] });
import { useFetcher } from "@/composables/useFetcher";
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const params = reactive({
  page: 1,
  per_page: 10,
  sort_column: "id",
  sort_direction: "asc",
  search: "",
});

const isInitialLoad = ref(true);
onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  params.page = Number(urlParams.get("page")) || 1;
  params.per_page = Number(urlParams.get("per_page")) || 10;
  params.sort_column = urlParams.get("sort_column") || "id";
  params.sort_direction = urlParams.get("sort_direction") || "asc";
  params.search = urlParams.get("search") || "";

  await getDashboard(params);
  isInitialLoad.value = false;
});

if (params.search === "") delete params.search;

const debouncedRefresh = setTimeout(async () => {
  const query = { ...params };
  if (query.search === "") delete query.search;
  await refreshDashboard(query);
  router.push({ query });
}, 300);

watch(
  params,
  async () => {
    if (!isInitialLoad.value) {
      debouncedRefresh();
      // const query = { ...params };
      // if (query.search === "") delete query.search;
      // await refreshDashboard(query);
      // router.push({ query });
    }
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
