<script setup>
const props = defineProps({
  showEye: {
    default: false,
  },
  modelValue: {
    default: "",
  },
  errors: {
    default: () => [],
  },
  type: {
    default: "text",
  },
});

defineEmits(["update:modelValue"]);

const renderedErrors = computed(() =>
  Array.isArray(props.errors) ? props.errors : props.errors ? [props.errors] : []
);

const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const pwdCondition = computed(() => (isPasswordVisible.value ? "text" : "password"));
</script>

<template>
  <div>
    <div class="relative">
      <input
        :type="props.type == 'password' ? pwdCondition : props.type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        v-bind="$attrs"
      />
      <span
        v-if="showEye"
        @click="togglePasswordVisibility"
        class="cursor-pointer absolute right-3 top-[28%]"
      >
        <span v-if="!isPasswordVisible" class="tabler--eye-off"></span>
        <span v-else class="tabler--eye"></span>
      </span>
    </div>
    <ul v-if="renderedErrors?.length > 0" class="mt-1 font-semibold text-xs text-red-600">
      <li v-for="error in renderedErrors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>
