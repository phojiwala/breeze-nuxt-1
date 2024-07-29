<script setup>
const { data } = defineProps(["data"]);
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const searchValue = ref("");

const headers = [
  { text: "#", value: "id", sortable: true },
  { text: "title", value: "title", sortable: true },
  { text: "price", value: "price", sortable: true },
  { text: "description", value: "description" },
  { text: "category", value: "category", sortable: true },
  { text: "actions", value: "actions" },
];

const clickHandle = () => (searchValue.value = "");
</script>

<template>
  <main>
    <div class="space-x-2">
      <input
        type="text"
        v-model="searchValue"
        class="border border-gray-400 rounded-md"
        placeholder="Search..."
      />
      <button @click="clickHandle">Reset</button>
    </div>
    <br />

    <Vue3EasyDataTable
      :headers="headers"
      :items="data.data"
      :rows-per-page="10"
      :search-value="searchValue"
      alternating
      border-cell
    >
      <template #item-actions>
        <div class="flex gap-2">
          <Button variant="link">Edit</Button>
          <Button variant="link">Delete</Button>
        </div>
      </template>
      <template #loading>
        <span>Loading...</span>
      </template>
      <template #empty-message>
        <p>No Records Found</p>
      </template>
    </Vue3EasyDataTable>
  </main>
</template>
