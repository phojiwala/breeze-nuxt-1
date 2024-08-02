<script setup>
definePageMeta({ middleware: ["auth"] });
import { store } from "@/composables/states.js";

const cols = [
  { field: "id", title: "#", type: "number", sort: false },
  { field: "image", title: "Image", sort: false },
  { field: "title", title: "Title" },
  { field: "price", title: "Price" },
  { field: "description", title: "Description" },
  { field: "category", title: "Category" },
  { field: "actions", title: "Actions", sort: false },
];
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Dashboard</Title>
    </Head>
    <CustomTable storeKey="dashboard" :cols="cols" addDialogId="add-dashboard" />
  </NuxtLayout>
</template>
