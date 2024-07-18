<script setup>
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const props = defineProps(["id", "refresh"]);
const { $toast } = useNuxtApp();

const cancelHandle = () => {
  store.popovers[props.id] = false;
};

const confirmHandle = async () => {
  let { error, status } = await useFetcher(`/dashboard/${props.id.replace('popover-', '')}`, {
    method: "DELETE",
  });
  store.popovers[props.id] = false;
  if (status.value == "success") {
    props.refresh();
    $toast.success("Item deleted");
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
