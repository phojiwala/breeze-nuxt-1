<script setup>
const { pagination, fetchPage } = defineProps(["pagination", "fetchPage"]);
</script>
<template>
  <ul class="pagination">
    <li
      class="page-item first-page"
      :class="{ disabled: pagination && pagination.current_page === 1 }"
    >
      <a
        class="page-link"
        href="javascript:void(0);"
        @click.prevent="fetchPage(pagination.first_page_url)"
        aria-label="First"
      >
        <span class="icon-double-left"></span>
      </a>
    </li>
    <li
      class="page-item prev-text"
      :class="{ disabled: pagination && pagination.current_page === 1 }"
    >
      <a
        class="page-link"
        href="javascript:void(0);"
        @click.prevent="fetchPage(pagination.prev_page_url)"
        aria-label="Previous"
      >
        <span class="icon-arrow-left"></span>
      </a>
    </li>

    <li class="page-item">
      <div class="page-of-number">
        {{ pagination?.from }}-{{ pagination?.to }} of {{ pagination?.total }}
      </div>
    </li>

    <li
      class="page-item next-text"
      :class="{
        disabled: pagination && pagination.current_page === pagination.last_page,
      }"
    >
      <a
        class="page-link"
        href="javascript:void(0);"
        @click.prevent="fetchPage(pagination.next_page_url)"
        aria-label="Next"
      >
        <span class="icon-arrow-right"></span>
      </a>
    </li>
    <li
      class="page-item last-page"
      :class="{
        disabled: pagination && pagination.current_page === pagination.last_page,
      }"
    >
      <a
        class="page-link"
        href="javascript:void(0);"
        @click.prevent="fetchPage(pagination.last_page_url)"
        aria-label="Last"
      >
        <span class="icon-double-right"></span>
      </a>
    </li>
  </ul>
</template>
