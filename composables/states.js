import { useFetcher } from "@/composables/useFetcher";
import { reactive } from 'vue'

const createStoreObject = () => ({
  data: null,
  pending: false,
  error: null,
  params: {
    page: 1,
    per_page: 10,
    sort_column: "id",
    sort_direction: "asc",
    search: "",
  },
  refresh: null
});

export const store = reactive({
  formData: {},
  open: false,
  dialogs: {},
  popovers: {},
  dashboard: createStoreObject(),
  accounts: createStoreObject(),
});

export async function createStoreFunctions(storeKey, endpoint) {
  store[storeKey].refresh = async (params = {}) => {
    const { data, pending, error, refresh } = await useFetcher(endpoint, {
      query: { ...store[storeKey].params, ...params },
    });
    store[storeKey].data = data;
    store[storeKey].pending = pending;
    store[storeKey].error = error;
    return { data, pending, error, refresh };
  };

  store[storeKey].add = async (data) => {
    const result = await useFetcher(endpoint, {
      method: "POST",
      body: data,
    });
    if (result.status.value === "success") {
      await store[storeKey].refresh();
    }
    return result;
  };

  store[storeKey].edit = async (data, id) => {
    const result = await useFetcher(`${endpoint}/${id}`, {
      method: "PUT",
      body: data,
    });
    if (result.status.value === "success") {
      await store[storeKey].refresh();
    }
    return result;
  };

  store[storeKey].delete = async (id) => {
    const { data, status, error } = await useFetcher(`${endpoint}/${id}`, {
      method: "DELETE",
    });
    if (status.value === "success") {
      await store[storeKey].refresh();
    }
    return { data, status, error };
  };
}

createStoreFunctions('dashboard', '/dashboard');
createStoreFunctions('accounts', '/accounts');

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}