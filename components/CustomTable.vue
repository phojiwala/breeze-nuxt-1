<script setup>
import { inject, ref, watch } from "vue";
import { Input } from "@/components/ui/input";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const props = defineProps(["data", "pending", "params"]);
const emit = defineEmits(["update-params"]);
const searchQuery = ref(props.params.search || "");

const cols = ref([
  { field: "id", title: "ID", isUnique: true, type: "number" },
  { field: "title", title: "Title" },
  { field: "price", title: "Price" },
  { field: "description", title: "Description" },
  { field: "category", title: "Category" },
  { field: "actions", title: "Actions", sort: false },
]);

const changeServer = (data) => {
  props.params.page = data.current_page;
  props.params.per_page = data.pagesize;
  props.params.sort_column = data.sort_column;
  props.params.sort_direction = data.sort_direction;
};

const handleSearch = () => {
  emit("update-params", {
    ...props.params,
    search: searchQuery.value,
    page: 1,
  });
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("update-params", {
    ...props.params,
    search: "",
    page: 1,
  });
};

watch(searchQuery, (newValue) => {
  if (newValue === "") {
    clearSearch();
  }
});

watch(
  () => props.params.search,
  (newValue) => {
    searchQuery.value = newValue;
  }
);

const clickHandle = (obj) => console.log();

const handleOpen = (dialogId) => {
  store.dialogs[dialogId] = true;
};
</script>

<template>
  <main>
    <div class="mb-5 flex justify-between items-center">
      <div class="flex justify-between items-center gap-2">
        <Input
          v-model="searchQuery"
          id="title"
          type="text"
          class="max-w-xs"
          placeholder="Search..."
          @keyup.enter="handleSearch"
        />
        <Button @click="handleSearch">Search</Button>
        <Button @click="clearSearch">Clear</Button>
      </div>
      <CustomDialog :dialogId="'add-dashboard'">
        <Button @click="handleOpen('add-dashboard')">Add</Button>
      </CustomDialog>
    </div>
    <Vue3Datatable
      :columns="cols"
      :isServerMode="true"
      :sortable="true"
      :rows="props.data?.data"
      :totalRows="props.data?.total"
      :pageSize="props.params?.per_page"
      :loading="props?.pending"
      @change="changeServer"
    >
      <!-- <template #price="data">
        <a :href="`mailto:${data.value.price}`" class="text-primary hover:underline">{{
          data.value.price
        }}</a>
      </template> -->
      <template #actions="data">
        <div class="space-x-2">
          <CustomDialog :data="data" :dialogId="`edit-dashboard`">
            <Button @click="handleOpen(`edit-dashboard`)">Edit</Button>
          </CustomDialog>
          <Button variant="destructive">Delete</Button>
        </div>
      </template>
    </Vue3Datatable>
  </main>
</template>
