<script setup>
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset) : ""
);

const { submit, inProgress, validationErrors: errors } = useSubmit(
  () => {
    status.value = "";
    return login(data);
  },
  {
    onSuccess: () => router.push("/dashboard"),
  }
);
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <!-- Session Status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <form @submit.prevent="submit">
      <!-- Email Address -->
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block w-full"
          v-model="data.email"
          :errors="errors.email?.[0]"
          required
          autoFocus
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          class="block w-full"
          v-model="data.password"
          :errors="errors.password"
          required
          autoComplete="current-password"
          showEye="true"
        />
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label for="remember" class="inline-flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember"
          />
          <span class="ml-2 text-sm text-gray-600"> Remember me </span>
        </label>
      </div>

      <div class="flex items-center justify-between mt-4">
        <NuxtLink
          href="/forgot-password"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </NuxtLink>
        <Button :disabled="inProgress">Login</Button>
      </div>

      <div class="flex items-center justify-center mt-4">
        <small class="text-gray-600">New Member?</small>
        <NuxtLink
          href="/register"
          class="underline text-sm text-gray-600 hover:text-gray-900 ml-1"
          :disabled="inProgress"
          >Register</NuxtLink
        >
      </div>
    </form>
  </AuthCard>
</template>
