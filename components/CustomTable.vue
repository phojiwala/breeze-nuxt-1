<script setup>
import { inject, ref, watch } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/Confirm";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const props = defineProps(["data", "pending", "params", "cols"]);
const searchQuery = ref(props.params.search || "");

const changeServer = (data) => {
  props.params.page = data.current_page;
  props.params.per_page = data.pagesize;
  props.params.sort_column = data.sort_column;
  props.params.sort_direction = data.sort_direction;
};

const handleSearch = () => {
  props.params.search = searchQuery.value;
  props.params.page = 1;
};

const clearSearch = () => {
  searchQuery.value = "";
  props.params.search = "";
  props.params.page = 1;
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

const dialogHandle = (id, data) => {
  if (data != null) {
    store.formData = data;
  }
  store.dialogs[id] = true;
};

const popoverHandle = (id) => {
  store.popovers[id] = true;
};

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;
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
        <Button @click="dialogHandle('add-dashboard', null)">Add</Button>
      </CustomDialog>
    </div>
    <Vue3Datatable
      :columns="props.cols"
      :isServerMode="true"
      :sortable="true"
      :rows="props.data?.data"
      :totalRows="props.data?.total"
      :pageSize="props.params?.per_page"
      :loading="props?.pending"
      @change="changeServer"
    >
      <template #image="data">
        <img
          :src="
            data.value.image ? `${backendUrl}${data.value.image}` : `/placeholder.png`
          "
          width="30"
          height="30"
          class="rounded-full cursor-pointer hover:shadow-xl shadow-md w-[30px] h-[30px] object-cover"
        />
      </template>
      <template #actions="data">
        <div class="flex gap-2">
          <NuxtLink :href="'/dashboard/view/' + data.value.id">
            <Button
              variant="secondary"
              @click="dialogHandle(`view-dashboard-${data.value.id}`, data.value)"
              >View</Button
            >
          </NuxtLink>
          <CustomDialog :data="data" :dialogId="`edit-dashboard-${data.value.id}`">
            <Button @click="dialogHandle(`edit-dashboard-${data.value.id}`, data.value)"
              >Edit</Button
            >
          </CustomDialog>
          <Confirm :id="`popover-${data.value.id}`">
            <Button
              @click="popoverHandle(`popover-${data.value.id}`)"
              variant="destructive"
            >
              Delete
            </Button>
          </Confirm>
        </div>
      </template>
    </Vue3Datatable>
  </main>
</template>
