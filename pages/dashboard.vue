<script setup>
definePageMeta({ middleware: ["auth"] });
import { useFetcher } from "@/composables/useFetcher";
import { $fetcher } from "@/utils/$fetcher";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();

const params = reactive({
  page: 1,
  per_page: 10,
  sort_column: "id",
  sort_direction: "asc",
});

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  params.page = Number(urlParams.get('page')) || 1;
  params.per_page = Number(urlParams.get('per_page')) || 10;
  params.sort_column = urlParams.get('sort_column') || 'id';
  params.sort_direction = urlParams.get('sort_direction') || 'asc';
});

const fetchData = async () => {
  const res = await useFetcher("/dashboard", {
    query: params,
  });
  return res;
};

let { data, pending, error, refresh, execute, status } = await fetchData();

watch(params, async () => {
  refresh();
  router.push({
    query: {
      ...route.query,
      page: params.page,
      per_page: params.per_page,
      sort_column: params.sort_column,
      sort_direction: params.sort_direction
    }
  });
}, { deep: true });
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Dashboard</Title>
    </Head>

    <CustomTable
      :data="data"
      :refresh="refresh"
      :params="params"
    />
  </NuxtLayout>
</template>
