<script setup>
definePageMeta({ middleware: ["auth"] });
import { store } from "@/composables/states.js";
import { Button } from "@/components/ui/button";

const cols = [
  { field: "id", title: "#", type: "number", sort: false },
  { field: "first_name", title: "first_name" },
  { field: "last_name", title: "last_name" },
  { field: "email", title: "email" },
  { field: "phone", title: "phone" },
  { field: "status", title: "status" },
  { field: "actions", title: "Actions", sort: false },
];
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>accounts</Title>
    </Head>
    <CustomTable
      storeKey="accounts"
      :cols="cols"
      addDialogId="add-accounts"
      :hideAdd="false"
    >
      <template #actions="{ data }">
        <Button @click="viewAccount(data.value.id)" variant="outline">{{
          data.value.status == "active" ? "Deactivate" : "Activate"
        }}</Button>
      </template>
    </CustomTable>
  </NuxtLayout>
</template>
