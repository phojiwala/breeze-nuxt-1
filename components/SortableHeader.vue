<template>
  <th class="sortByColumn" :style="style">
    <div class="d-flex" :id="whichKey" @click="handleSort(whichKey)">
      <div class="sort-icon" :class="tHeadClass">
        <span
          v-if="sortType === 'asc' && currentId === whichKey"
          class="icon-top-long-arrow"
          id="sortAsc"
        >
        </span>
        <span
          v-else-if="sortType === 'desc' && currentId === whichKey"
          class="icon-top-long-arrow rotate180 ml0"
          id="sortDesc"
        >
        </span>
        <template v-else>
          <span class="icon-top-long-arrow" id="sortAsc"></span>
          <span class="icon-top-long-arrow rotate180 ml0" id="sortDesc"></span>
        </template>
      </div>
      <span>{{ columnTitle }}</span>
    </div>
  </th>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    currentId: {
      default: ''
    },
    style: {
      default: "",
    },
    sortType: {
      default: "",
    },
    columnTitle: {
      default: "",
    },
    whichKey: {
      default: "",
    },
  },
  methods: {
    handleSort(key) {
      this.$emit("sort", key);
    },
    tHeadClass() {
      let classes = [];
      if (this.sortType) {
        if (this.sortType == "desc") {
          classes.push("sorting_desc");
        } else {
          classes.push("sorting_asc");
        }
      }
      return classes.join(" ");
    },
  },
};
</script>
