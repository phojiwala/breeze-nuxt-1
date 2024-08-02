<script setup>
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const props = defineProps(["id"]);
const { $toast } = useNuxtApp();

const cancelHandle = () => {
  store.popovers[props.id] = false;
};

const confirmHandle = async () => {
  const { data, status, error } = await store.dashboard.delete(props.id.replace("popover-", ""));
  store.popovers[props.id] = false;
  if (status.value == "success") {
    $toast.success(data?.value?.message);
  } else {
    $toast.error(error.value.message);
  }
};
</script>

<template>
  <Popover :open="store.popovers[props.id]">
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent class="PopoverContent">
      <main class="flex gap-3 justify-between">
        <Button variant="outline" @click="cancelHandle">Cancel</Button>
        <Button variant="destructive" @click="confirmHandle">Confirm</Button>
      </main>
    </PopoverContent>
  </Popover>
</template>

<style>
.PopoverContent {
  width: auto;
}
</style>
