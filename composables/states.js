import { $fetcher } from '@/utils/$fetcher';
import { reactive } from 'vue'

export const store = reactive({
  formData: {},
  open: false,
  dialogs: {},
  popovers: {}
})

export async function addDashboard(data) {
  return await $fetcher("/dashboard", {
    method: "post",
    body: data,
  });
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}