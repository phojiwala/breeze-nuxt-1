<script>
definePageMeta({ middleware: ["auth"] });
import { store } from "@/composables/states.js";
import { useFetcher } from "@/composables/useFetcher";
import { ref, reactive, watch, onMounted } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/Confirm";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const router = useRouter();
const route = useRoute();
const params = store.accounts.params;
const searchQuery = ref(params.search || "");

const { data, pending, error, refresh } = useFetcher("/accounts", {
  query: params,
  lazy: true,
});
store.accounts.data = data;
store.accounts.pending = pending;
store.accounts.error = error;

console.log(data)
</script>

<template>
  <NuxtLayout name="app-layout">
    <Vue3Datatable
      :columns="cols"
      :isServerMode="true"
      :sortable="true"
      :rows="data?.data"
      :totalRows="data?.total"
      :pageSize="params?.per_page"
      :loading="pending"
      @change="changeServer"
    >
      <template #actions="data">
        <div class="flex gap-2">
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
  </NuxtLayout>
</template>
