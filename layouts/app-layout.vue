<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />

    <!-- Page Heading  -->
    <!-- <header class="bg-white shadow">
      <div class="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header" />
      </div>
    </header> -->

    <FlashMessages />

    <main>
      <div class="my-10">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
