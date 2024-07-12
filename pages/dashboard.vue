<script setup>
definePageMeta({ middleware: ["auth"] });

const headers = ref([
  {
    style: "width: 60px; min-width: 60px;",
    columnTitle: "No.",
    sorting: false,
  },
  {
    style: "width: 150px; min-width: 150px;",
    columnTitle: "Season",
    whichKey: "season",
    sorting: true,
  },
  {
    style: "width: 135px; min-width: 135px;",
    columnTitle: "Blind No.",
    whichKey: "id",
    sorting: true,
  },
  {
    style: "width: 157px; min-width: 157px;",
    columnTitle: "Type",
    whichKey: "blind_type",
    sorting: true,
  },
  {
    style: "width: 157px; min-width: 157px;",
    columnTitle: "Description",
    whichKey: "description",
    sorting: true,
    class: "ellipsis",
  },
  {
    style: "width: 100px; min-width: 100px;",
    columnTitle: "Licensee",
    whichKey: "full_name",
    sorting: true,
  },
  {
    style: "width: 100px; min-width: 100px;",
    columnTitle: "License Status",
    whichKey: "license_status",
    sorting: true,
  },
  {
    style: "width: 157px; min-width: 157px;",
    columnTitle: "Longitude",
    whichKey: "longitude",
    sorting: true,
  },
  {
    style: "width: 157px; min-width: 157px;",
    columnTitle: "Latitude",
    whichKey: "latitude",
    sorting: true,
  },
  {
    style: "width: 100px; min-width: 100px;",
    columnTitle: "Status",
    whichKey: "status",
    sorting: true,
  },
  {
    style: "width: 100px; min-width: 100px;",
    columnTitle: "Actions",
    sorting: false,
  },
]);
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Dashboard</Title>
    </Head>

    <CustomTable
      ref="myChild"
      :headers="headers"
      :endpoint="'blind'"
      :localstorageName="'blinds'"
    >
      <template #actions="headerProps">
        <td>
          <div class="dropdown">
            <a href="#" class="icon-dots" data-bs-toggle="dropdown"></a>
            <ul class="table-actions dropdown-menu">
              <li>
                <router-link
                  :to="{ name: 'blind_view', params: { id: headerProps.item.id } }"
                >
                  <span class="icon-eye-visble"></span> View Details
                </router-link>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  v-if="
                    headerProps.item.allImages && headerProps.item.allImages.length > 0
                  "
                  @click="viewImagesOfBlind(headerProps.item)"
                  data-bs-toggle="modal"
                  data-bs-target="#viewImages"
                >
                  <span class="icon-view-images"></span> View Images
                </a>
                <a
                  href="javascript:void(0)"
                  v-else
                  @click="viewImagesOfBlind(headerProps.item)"
                >
                  <span class="icon-view-images"></span> View Images
                </a>
              </li>
              <li>
                <router-link
                  :to="{ name: 'blind_history', params: { id: headerProps.item.id } }"
                >
                  <span class="icon-view-history"></span> View History
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'blind_edit', params: { id: headerProps.item.id } }"
                >
                  <span class="icon-edit"></span> Edit
                </router-link>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  v-if="headerProps.item.status == 'Active'"
                  @click="changeBlindStatus(`${headerProps.item.id}`)"
                >
                  <span class="icon-deactivate"></span> Deactivate
                </a>
                <a
                  href="javascript:void(0)"
                  v-if="headerProps.item.status == 'Deactive'"
                  @click="changeBlindStatus(`${headerProps.item.id}`)"
                >
                  <span class="icon-activate01"></span> Activate
                </a>
              </li>
            </ul>
          </div>
        </td>
      </template>
    </CustomTable>
  </NuxtLayout>
</template>
