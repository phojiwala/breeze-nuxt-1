<script setup>
definePageMeta({ middleware: ["auth"] });
import { store } from "@/composables/states.js";
import { useFetcher } from "@/composables/useFetcher";
import { ref, reactive, watch, onMounted } from "vue";

const params = store.dashboard.params;
const { data, pending, error, refresh } = useFetcher("/dashboard", {
  query: params,
  lazy: true,
});
store.dashboard.data = data;
store.dashboard.pending = pending;
store.dashboard.error = error;

const cols = ref([
  { field: "id", title: "#", type: "number", sort: false },
  { field: "image", title: "Image", sort: false },
  { field: "title", title: "Title" },
  { field: "price", title: "Price" },
  { field: "description", title: "Description" },
  { field: "category", title: "Category" },
  { field: "actions", title: "Actions", sort: false },
]);
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Dashboard</Title>
    </Head>
    <CustomTable
      :data="store.dashboard.data"
      :pending="store.dashboard.pending"
      :params="params"
      :refresh="refresh"
      :cols="cols"
    />
  </NuxtLayout>
</template>
