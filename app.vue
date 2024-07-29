<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();
</script>

<style>
@import url("global.css");
</style>

<template>
  <div>
    <Head>
      <Link
        href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Body class="antialiased">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
    <div v-if="needRefresh" class="pwa-toast">
      <div class="message">New content available, click on reload button to update.</div>
      <button @click="updateServiceWorker()">Reload</button>
    </div>
  </div>
</template>
