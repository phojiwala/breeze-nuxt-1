<script setup>
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { Button } from "@/components/ui/button";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const options = [
  { value: "Clothing", label: "Clothing" },
  { value: "Electronics", label: "Electronics" },
  { value: "Toys", label: "Toys" },
  { value: "Books", label: "Books" },
  { value: "Food", label: "Food" },
];

const open = ref(false);
const value = ref(props.modelValue);
watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{
          value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."
        }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search option..." />
        <CommandEmpty>No option found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="
                (e) => {
                  if (typeof e.detail.value === 'string') {
                    value = e.detail.value;
                  }
                  open = false;
                }
              "
            >
              {{ option.label }}
              <CheckIcon
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
