import { useFetcher } from "@/composables/useFetcher";
import { reactive } from 'vue'

export const store = reactive({
  formData: {},
  open: false,
  dialogs: {},
  popovers: {},
  dashboard: {
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
  },
  accounts: {
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
  },
})

export async function getDashboard(params = {}) {
  let { data, pending, error, refresh, execute, status } = await useFetcher("/dashboard", {
    query: params,
  })
  store.dashboard.data = data
  store.dashboard.pending = pending
  store.dashboard.error = error
  return { data, pending, error, refresh }
}

export const refreshDashboard = getDashboard;

export const addDashboard = async (data) => {
  const result = await useFetcher("/dashboard", {
    method: "POST",
    body: data,
  });
  if (result.status.value === "success") {
    await refreshDashboard()
  }
  return result
}

export const editDashboard = async (data, id) => {
  const result = await useFetcher(`/dashboard/${id}`, {
    method: "PUT",
    body: data,
  });
  if (result.status.value === "success") {
    await refreshDashboard()
  }
  return result
}

export const deleteDashboard = async (id) => {
  let { data, status, error } = await useFetcher(`/dashboard/${id}`, {
    method: "DELETE",
  })
  if (status.value === "success") {
    await refreshDashboard()
  }
  return { data, status, error }
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}