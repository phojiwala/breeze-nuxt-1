<script setup>
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inject, ref } from "vue";
import { addDashboard, isObjectEmpty } from "@/composables/states";
import { useFetcher } from "@/composables/useFetcher";

const props = defineProps(["data", "dialogId", "refresh"]);
const title = ref("");
const price = ref("");
const description = ref("");
const category = ref("");
const { $toast } = useNuxtApp();

const details = ref({
  title: "",
  price: "",
  description: "",
  category: "",
});

watch(
  () => store.formData,
  (newVal) => {
    if (!isObjectEmpty(newVal)) {
      details.value = JSON.parse(JSON.stringify(newVal));
    }
  }
);

const submit = async () => {
  if (isObjectEmpty(store.formData)) {
    let { data, pending, error, execute, status } = await useFetcher("/dashboard", {
      method: "POST",
      body: details.value,
    });
    if (status.value == "success") {
      props.refresh();
      $toast.success("Item added");
      store.dialogs[props.dialogId] = false;
    } else {
      $toast.error(error.value.message);
    }
  } else {
    const { created_at, id, updated_at, ...rest } = details.value;
    let { data, pending, error, execute, status } = await useFetcher(`/dashboard/${id}`, {
      method: "PUT",
      body: rest,
    });
    if (status.value == "success") {
      props.refresh();
      $toast.success("Item updated");
      store.dialogs[props.dialogId] = false;
    } else {
      $toast.error(error.value.message);
    }
  }
};
</script>

<template>
  <Dialog :open="store.dialogs[props.dialogId]">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{
          isObjectEmpty(store.formData) ? "Add Data" : "Edit Data"
        }}</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="submit" class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right"> title </Label>
          <Input id="title" v-model="details.title" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="price" class="text-right"> price </Label>
          <Input id="price" v-model="details.price" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right"> description </Label>
          <Textarea id="description" v-model="details.description" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="category" class="text-right"> category </Label>
          <CustomCombobox id="category" v-model="details.category" class="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
