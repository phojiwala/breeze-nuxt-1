<script setup>
import { ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const config = useRuntimeConfig();
const router = useRouter();
const { data, refresh, params } = defineProps(["data", "refresh", "params"]);
const { current_page, last_page, per_page, total } = data;
const loading = ref(false);
const total_rows = ref(0);
const rows = ref(null);

const cols =
  ref([
    { field: "id", title: "ID", isUnique: true, type: "number" },
    { field: "title", title: "title" },
    { field: "price", title: "price" },
    { field: "description", title: "description" },
    { field: "category", title: "category" },
    { field: "actions", title: "Actions", sort: false },
  ]) || [];

const changeServer = (data) => {
  params.page = data.current_page;
  params.per_page = data.per_page;
  params.sort_column = data.sort_column;
  params.sort_direction = data.sort_direction;
};
</script>

<template>
  <Vue3Datatable
    :rows="data?.data"
    :columns="cols"
    :totalRows="total"
    :isServerMode="true"
    :pageSize="per_page"
    :sortable="true"
    :loading="loading"
    @change="changeServer"
  >
    <template #price="data">
      <a :href="`mailto:${data.value.price}`" class="text-primary hover:underline">{{
        data.value.price
      }}</a>
    </template>
    <template #actions="data">
      <div class="space-x-2">
        <Button>edit</Button>
        <Button>delete</Button>
      </div>
    </template>
  </Vue3Datatable>
</template>
