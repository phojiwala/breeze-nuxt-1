<script setup>
import { ref, watch, onMounted } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { store } from "@/composables/states.js";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const props = defineProps({
  storeKey: {
    required: true,
  },
  cols: {
    required: true,
  },
  addDialogId: {
    default: "add-item",
  },
  hideAdd: {
    default: true,
  },
});

const router = useRouter();
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const searchQuery = ref("");
const storeData = store[props.storeKey];

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  Object.keys(storeData.params).forEach((key) => {
    const value = urlParams.get(key);
    if (value !== null) {
      storeData.params[key] =
        key === "page" || key === "per_page" ? Number(value) : value;
    }
  });
  router.push({ query: { ...storeData.params } });
  await storeData.refresh();
});

watch(
  () => storeData.params,
  async () => {
    await storeData.refresh();
    router.push({ query: { ...storeData.params } });
  },
  { deep: true }
);

const changeServer = async (data) => {
  console.log(data)
  Object.assign(storeData.params, {
    page: data.current_page,
    per_page: data.pagesize,
    sort_column: data.sort_column,
    sort_direction: data.sort_direction,
  });
};

const handleSearch = async () => {
  storeData.params.search = searchQuery.value;
  storeData.params.page = 1;
};

const clearSearch = async () => {
  searchQuery.value = "";
  storeData.params.search = "";
  storeData.params.page = 1;
};

watch(searchQuery, (newValue) => {
  if (newValue === "") {
    clearSearch();
  }
});

watch(
  () => storeData.params.search,
  (newValue) => {
    searchQuery.value = newValue;
  }
);

if (storeData.params.search === "") delete storeData.params.search;

const dialogHandle = (id, data = null) => {
  if (data) {
    store.formData = data;
  }
  store.dialogs[id] = true;
};

const popoverHandle = (id) => {
  store.popovers[id] = true;
};

// const handleSort = (column) => {
//   if (storeData.params.sort_column === column) {
//     // If clicking the same column, toggle the sort direction
//     storeData.params.sort_direction =
//       storeData.params.sort_direction === "asc" ? "desc" : "asc";
//   } else {
//     // If clicking a new column, set it as the sort column and default to ascending
//     storeData.params.sort_column = column;
//     storeData.params.sort_direction = "asc";
//   }
//   storeData.params.page = 1; // Reset to first page when sorting changes
// };
</script>

<template>
  <main>
    <div class="mb-5 flex justify-between items-center">
      <div class="flex justify-between items-center gap-2">
        <Input
          v-model="searchQuery"
          type="text"
          class="max-w-xs"
          placeholder="Search..."
          @keyup.enter="handleSearch"
        />
        <Button @click="handleSearch">Search</Button>
        <Button @click="clearSearch">Clear</Button>
      </div>
      <template v-if="hideAdd">
        <CustomDialog :dialogId="addDialogId">
          <Button @click="dialogHandle(addDialogId)">Add</Button>
        </CustomDialog>
      </template>
    </div>
    <Vue3Datatable
      :columns="cols"
      :isServerMode="true"
      :sortable="true"
      :rows="storeData.data?.data"
      :totalRows="storeData.data?.total"
      :pageSize="storeData.params.per_page"
      :loading="storeData.pending"
      @change="changeServer"
    >
      <template #status="data">
        <Badge variant="destructive">{{ data.value.status }}</Badge>
      </template>
      <template #actions="data">
        <slot name="actions" :data="data">
          <div class="flex gap-2">
            <NuxtLink :to="`/${props.storeKey}/view/${data.value.id}`">
              <Button variant="secondary">View</Button>
            </NuxtLink>
            <CustomDialog
              :data="data"
              :dialogId="`edit-${props.storeKey}-${data.value.id}`"
            >
              <Button
                @click="
                  dialogHandle(`edit-${props.storeKey}-${data.value.id}`, data.value)
                "
                >Edit</Button
              >
            </CustomDialog>
            <Confirm :id="`popover-${data.value.id}`">
              <Button
                @click="popoverHandle(`popover-${data.value.id}`)"
                variant="destructive"
                >Delete</Button
              >
            </Confirm>
          </div>
        </slot>
      </template>
    </Vue3Datatable>
  </main>
</template>
