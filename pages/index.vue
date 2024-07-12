<script setup>
import {toRaw } from 'vue'
const { isLoggedIn } = useAuth();

console.log('isLoggedIn', isLoggedIn)
</script>

<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
  >
    <Head>
      <Title>Laravel</Title>
    </Head>

    <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <template v-if="isLoggedIn">
        <NuxtLink to="/dashboard" class="ml-4 text-sm text-gray-700 underline">
          Dashboard
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/login" class="text-sm text-gray-700 underline">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="ml-4 text-sm text-gray-700 underline">
          Register
        </NuxtLink>
      </template>
    </div>

    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-center pt-8 sm:justify-start sm:pt-0">
        Homepage
      </div>
    </div>
  </div>
</template>
