<script setup>
const props = defineProps({
  status: String
});
</script>

<template>
  <div v-if="status" class="font-medium text-sm text-green-600">
    {{ status }}
  </div>
</template>
