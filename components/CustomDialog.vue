<script setup>
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inject, ref } from "vue";
import { useSubmit } from "@/composables/useSubmit";
import { addDashboard } from "@/composables/states";

const props = defineProps(["data", "dialogId"]);
const emit = defineEmits(["submit"]);

const title = ref("");
const price = ref("");
const description = ref("");
const category = ref("");

// const handleSubmit = () => {
//   let obj = {
//     title: title.value,
//     price: price.value,
//     description: description.value,
//     category: category.value,
//   };
//   console.log(obj);
//   store.dialogs[props.dialogId] = false;
//   emit("submit", obj);
// };

const { submit, inProgress, validationErrors: errors } = useSubmit(
  () => {
    let obj = {
      title: title.value,
      price: price.value,
      description: description.value,
      category: category.value,
    };
    return addDashboard(obj);
  },
  {
    onSuccess: () => (store.dialogs[props.dialogId] = false),
  }
);
</script>

<template>
  <Dialog :open="store.dialogs[props.dialogId]">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add data</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="submit" class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right"> title </Label>
          <Input id="title" v-model="title" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="price" class="text-right"> price </Label>
          <Input id="price" v-model="price" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right"> description </Label>
          <Textarea id="description" v-model="description" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="category" class="text-right"> category </Label>
          <CustomCombobox id="category" v-model="category" class="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
