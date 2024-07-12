<script setup>
import { ref, onMounted, watch } from 'vue';
// import axios from "axios";
import SortableHeader from "./SortableHeader.vue";
import Pagination from "./Pagination.vue";
// import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  headers: { default: "" },
  endpoint: { default: "", type: String },
  localstorageName: { default: "", type: String },
  isPerItem: { default: true, type: Boolean },
  actions: {},
  method: { type: String },
});

// const store = useStore();
const router = useRouter();

const apidata = ref([]);
const search = ref("");
const column_name = ref("");
const sort_type = ref("");
const per_page = ref(10);
const pagination = ref(null);

const fetchData = async () => {
  try {
    let key = props.endpoint;
    if (props.localstorageName) {
      key = props.localstorageName;
    }
    const page = localStorage.getItem(`${key}Page`) || 1;
    let filterData = {
      page: page,
      search: search.value,
      per_page: per_page.value,
      sort_type: sort_type.value,
      column_name: column_name.value,
    };
    // const response = props.method == "get"
    //   ? await axios.get(`${props.endpoint}`)
    //   : await axios.post(`${props.endpoint}`, filterData);
    // if (response?.status == 200) {
    //   pagination.value = response?.data?.data || [];
    //   apidata.value = response?.data?.data?.data || [];
    // }
  } catch (error) {
    console.error(error);
  }
};

const saveCurrentParams = () => {
  let key = props.endpoint;
  if (props.localstorageName) {
    key = props.localstorageName;
  }
  const params = {
    search: search.value,
    sort_type: sort_type.value,
    per_page: per_page.value,
    column_name: column_name.value,
    page: localStorage.getItem(`${key}Page`) || 1,
  };
  localStorage.setItem(`${key}Params`, JSON.stringify(params));
};

const saveCurrentPage = (page) => {
  let key = props.endpoint;
  if (props.localstorageName) {
    key = props.localstorageName;
  }
  localStorage.setItem(`${key}Page`, page);
  saveCurrentParams();
};

const fetchPage = (pageUrl) => {
  const match = pageUrl.match(/page=(\d+)/);
  const pageNumber = match ? parseInt(match[1]) : null;
  saveCurrentPage(pageNumber);
  fetchData();
};

const removeSearchInput = () => {
  document.getElementById("search").value = "";
  search.value = "";
  sort_type.value = "";
  column_name.value = "";
  per_page.value = 10;
  saveCurrentPage(1);
  fetchData();
};

const handleSearch = () => {
  let query = document.getElementById("search").value;
  if (query === "") {
    removeSearchInput();
    return;
  }
  search.value = query;
  saveCurrentPage(1);
  fetchData();
};

const handlePerPage = async (event) => {
  per_page.value = event.target.value;
  saveCurrentPage(1);
  saveCurrentParams();
  await fetchData();
};

const sortData = async (key) => {
  sort_type.value = sort_type.value === "asc" ? "desc" : "asc";
  column_name.value = key;
  saveCurrentPage(1);
  await fetchData();
};

const resetLocalStorage = () => {
  let key = props.endpoint;
  if (props.localstorageName) {
    key = props.localstorageName;
  }
  localStorage.removeItem(`${key}Params`);
  localStorage.removeItem(`${key}Page`);
};

const tHeadClass = () => {
  let classes = [];
  if (sort_type.value) {
    if (sort_type.value == "desc") {
      classes.push("sorting_desc");
    } else {
      classes.push("sorting_asc");
    }
  }
  return classes.join(" ");
};

onMounted(() => {
  let key = props.endpoint;
  if (props.localstorageName) {
    key = props.localstorageName;
  }
  let params = localStorage.getItem(`${key}Params`);
  if (params !== "" && params !== null) {
    search.value = JSON.parse(params)?.search;
    per_page.value = JSON.parse(params)?.per_page;
    sort_type.value = JSON.parse(params)?.sort_type;
    column_name.value = JSON.parse(params)?.column_name;
  }
  fetchData();
});

watch([search, per_page, sort_type, column_name], () => {
  fetchData();
});
</script>

<template>
  <div>
    <div v-if="headers" class="search_wrap">
      <div class="search-with-icon flex-sm-row flex-column">
        <input
          id="search"
          :value="search"
          type="text"
          class="form-control"
          placeholder="Search"
          @keydown.enter="handleSearch"
          autocomplete="off"
        />
        <div class="d-flex gap-2">
          <button type="button" class="btn-htc sort_type-btn" @click="handleSearch">
            Search
          </button>
          <button type="button" class="btn-htc border-btn" @click="removeSearchInput">
            Reset
          </button>
        </div>
      </div>
      <slot name="header" />
    </div>
    <div class="content">
      <div class="custom-card-body">
        <div
          v-if="headers"
          class="theme-table user-management-table first-child-center table-responsive"
        >
          <table class="table table-borderless" v-if="apidata && apidata.length > 0">
            <thead>
              <tr>
                <template v-for="header in headers">
                  <SortableHeader
                    v-if="header.sorting"
                    :key="header.columnTitle"
                    :style="header.style"
                    :sortType="sort_type"
                    :whichKey="header.whichKey"
                    :columnTitle="header.columnTitle"
                    :currentId="column_name"
                    @sort="sortData(header.whichKey)"
                  />
                  <th v-else :key="header.columnTitle" :style="header.style">
                    {{ header.columnTitle }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in apidata" :key="item?.id">
                <td>
                  {{ (pagination?.current_page - 1) * pagination?.per_page + index + 1 }}
                </td>
                <template v-for="column in headers" :key="column">
                  <td
                    v-if="column.whichKey == 'created_at'"
                    :class="column.class ? column.class : ''"
                  >
                    {{ "-" }}
                  </td>
                  <td
                    v-else-if="column.whichKey == 'email'"
                    :class="column.class ? column.class : ''"
                  >
                    <a :href="`mailto:${item[column?.whichKey]}`">{{
                      item[column?.whichKey] || "-"
                    }}</a>
                  </td>
                  <td
                    v-else-if="column.whichKey == 'phone_number'"
                    :class="column.class ? column.class : ''"
                  >
                    <a :href="`tel:${item[column?.whichKey]}`">{{
                      item[column?.whichKey] || "-"
                    }}</a>
                  </td>
                  <td
                    v-else-if="column.whichKey == 'address1'"
                    :class="column.class ? column.class : ''"
                  >
                    <a
                      v-if="item[column?.whichKey]"
                      :href="'http://maps.google.com/?q=' + item[column?.whichKey]"
                      target="_blank"
                      class="text-link"
                    >
                      {{ item[column?.whichKey] }}</a
                    >
                    <span v-else>-</span>
                  </td>
                  <td
                    v-else-if="column.whichKey == 'address2'"
                    :class="column.class ? column.class : ''"
                  >
                    <a
                      v-if="item[column?.whichKey]"
                      :href="'http://maps.google.com/?q=' + item[column?.whichKey]"
                      target="_blank"
                      class="text-link"
                      >{{ item[column?.whichKey] }}</a
                    >
                    <span v-else>-</span>
                  </td>
                  <td
                    v-else-if="column.whichKey == 'user_id'"
                    :class="column.class ? column.class : ''"
                  >
                    {{ item[column?.whichKey] ? "Licensed" : "Free" }}
                  </td>
                  <td
                    v-else-if="column.whichKey == 'licensee_user'"
                    :class="column.class ? column.class : ''"
                  >
                    {{ item[column?.whichKey]?.full_name || "-" }}
                  </td>
                  <td
                    v-else-if="column.whichKey"
                    :class="column.class ? column.class : ''"
                  >
                    {{ item[column?.whichKey] || "-" }}
                  </td>
                </template>
                <slot name="actions" :item="item"></slot>
              </tr>
            </tbody>
          </table>
          <!-- <template v-else>
            <div class="black" v-if="$store.state.isLoading">Loading...</div>
            <div class="black" v-else>No Records Found.</div>
          </template> -->
        </div>
        <div v-else>
          <slot name="body" :data="apidata" />
        </div>
      </div>
      <div
        class="pagination-wrapper"
        v-if="pagination != null && apidata && apidata.length > 0"
      >
        <div class="record-detail">
          Displaying {{ pagination?.from }} to {{ pagination?.to }} of
          {{ pagination?.total }} records
        </div>
        <div class="pagination-wrapper-right">
          <div v-if="isPerItem" class="item-per-page">
            <select
              v-model="per_page"
              @change="handlePerPage($event)"
              class="item_select form-control form-select"
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
          </div>
          <Pagination :pagination="pagination" :fetchPage="fetchPage" />
        </div>
      </div>
    </div>
  </div>
</template>