<script setup>
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inject, ref } from "vue";
import { isObjectEmpty } from "@/composables/states";
import { useFetcher } from "@/composables/useFetcher";

const props = defineProps(["data", "dialogId"]);
const title = ref("");
const price = ref("");
const description = ref("");
const category = ref("");
const { $toast } = useNuxtApp();

const preview = ref("/placeholder.png");
const details = ref({
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
});

watch(
  () => store.formData,
  (newVal) => {
    if (!isObjectEmpty(newVal)) {
      details.value = JSON.parse(JSON.stringify(newVal));
    }
  }
);

function uploadImage(e) {
  const file = e.target.files[0];
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    (details.value.image = "/placeholder.png"),
      $toast.error("The file type must be JPG, JPEG, or PNG.");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    (details.value.image = "/placeholder.png"),
      $toast.error("File size should not exceed 5MB.");
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    details.value.image = file;
    preview.value = e.target.result;
  };
}

const clearData = () => {
  preview.value = "/placeholder.png";
  Object.keys(details.value).forEach((key) => {
    details.value[key] = null;
  });
};

const submit = async () => {
  if (isObjectEmpty(store.formData)) {
    const formData = new FormData();
    for (const key in details.value) {
      if (details.value.hasOwnProperty(key)) {
        formData.append(key, details.value[key]);
      }
    }
    const { error, status } = await store.dashboard.add(formData);
    if (status.value == "success") {
      $toast.success("Item added");
      store.dialogs[props.dialogId] = false;
      clearData();
    } else {
      $toast.error(error.value.message);
    }
  } else {
    const { created_at, id, updated_at, ...rest } = details.value;
    const formData = new FormData();
    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        formData.append(key, rest[key]);
      }
    }
    const { error, status } = await store.dashboard.edit(formData, id);
    if (status.value == "success") {
      $toast.success("Item updated");
      store.dialogs[props.dialogId] = false;
      clearData();
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
        <div class="flex justify-center">
          <div class="relative">
            <input
              type="file"
              class="hidden absolute"
              name="file-input"
              id="file-input"
              @change="uploadImage"
            />
            <label for="file-input">
              <NuxtImg
                :src="preview"
                :placeholder="[30, 20]"
                width="130"
                height="130"
                class="rounded-full cursor-pointer hover:shadow-xl shadow-md w-[130px] h-[130px] object-cover"
              />
            </label>
          </div>
        </div>
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
