<script setup>
import { Button } from "@/components/ui/button";
definePageMeta({ middleware: ["auth"] });

const router = useRouter();
// const route = useRoute();
const { resetPassword } = useAuth();

const data = reactive({
  old_password: "",
  password: "",
  password_confirmation: "",
});
// const token = computed(() => route.params.token);
const { submit, inProgress, validationErrors: errors } = useSubmit(
  () => resetPassword({ token: token.value, ...data }),
  {
    onSuccess: (result) =>
      router.push({
        path: "/dashboard",
      }),
  }
);
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink href="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <form @submit.prevent="submit">
      <!-- Old Password -->
      <div class="mt-4">
        <Label for="old_password">Old Password</Label>
        <Input
          id="old_password"
          type="old_password"
          class="block mt-1 w-full"
          v-model="data.old_password"
          :errors="errors.old_password"
          required
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">New Password</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          :errors="errors.password"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="mt-4">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password_confirmation"
          :errors="errors.password_confirmation"
          required
        />
      </div>

      <div class="flex items-center justify-between mt-4">
        <NuxtLink
          href="/dashboard"
          class="underline text-sm text-gray-600 hover:text-gray-900 ml-1"
          >Back</NuxtLink
        >
        <Button :disabled="inProgress">Reset Password</Button>
      </div>
    </form>
  </AuthCard>
</template>
