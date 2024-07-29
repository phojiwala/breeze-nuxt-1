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
    error: null
  }
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

export const refreshDashboard = async (params = {}) => {
  const result = await getDashboard(params)
  return result
}

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
  const result = await useFetcher(`/dashboard/${id}`, {
    method: "DELETE",
  })
  if (result.status.value === "success") {
    await refreshDashboard()
  }
  return result
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}