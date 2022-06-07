<template>
  <!--begin::Tables Widget 9-->
  <div v-if="rentTerrains.length" class="card0">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Your rented terrains</span>

        <span class="text-muted mt-1 fw-bold fs-7">
          Over {{ rentTerrains.length }} members
        </span>
      </h3>
      <!--begin::Card title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <div class="card-body p-0 p-3">
      <!--begin::Table container-->
      <vue-good-table
        :columns="tableHeaderRentTerrains"
        :is-loading="isLoading"
        :pagination-options="{ enabled: true, perPage: 5 }"
        :rows="rentTerrains"
        style-class="vgt-table striped"
        theme="polar-bear"
        :search-options="{
          enabled: true,
        }"
        :sort-options="{
          enabled: false,
        }"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'beforeStartDate'">
            <span class="d-flex align-items-center">
              <span class="text-dark fw-bolder fs-6">
                {{ props.row.startDate }}
              </span>
            </span>
          </span>

          <span v-if="props.column.field === 'beforeEndDate'">
            <span class="d-flex align-items-center">
              <span class="text-dark fw-bolder fs-6">
                {{ props.row.endDate }}
              </span>
            </span>
          </span>
          <span v-if="props.column.field === 'beforeUser'">
            <span class="d-flex align-items-center">
              <span class="text-dark fw-bolder fs-6">
                {{ props.row.user.name }}
              </span>
            </span>
          </span>
          <span v-if="props.column.field === 'beforeTerrain'">
            <span class="d-flex align-items-center">
              <span class="text-dark fw-bolder fs-6">
                {{ props.row.terrain.name }}
              </span>
            </span>
          </span>
          <span v-if="props.column.field === 'beforeApprovalStatus'">
            <span class="d-flex align-items-center">
              <span class="text-dark fw-bolder fs-6">
                {{ props.row.approvalStatus }}
              </span>
            </span>
          </span>
          <span v-if="props.column.field === 'actions'" class="btn-group">
            <router-link
              :to="'/terrain/' + props.row.terrain.id"
              class="btn btn-primary vgt-center-align"
            >
              <i class="fa-solid fa-eye"></i>
              View
            </router-link>
            <button
              v-if="props.row.approvalStatus === 'pending'"
              class="btn btn-danger vgt-center-align"
              @click="cancelTerrain(props.row.id)"
            >
              <i class="fa-solid fa-xmark"></i>
              Cancel
            </button>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 9-->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { tableHeaderRentTerrains } from '@/core/table_headers/rentTerrain';
import { TTerrainRent } from '@/core/helpers/types';
import useTerrains from '@/core/composables/terrain';

export default defineComponent({
  name: 'RentTerrainsRequest',
  components: {
    'vue-good-table': require('vue-good-table-next').VueGoodTable,
  },

  props: {
    rentTerrains: {
      type: Object as PropType<TTerrainRent[]>,
      default: Array,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:selectedTerrain', 'get-terrains', 'update:selectedRentInfo'],
  setup: async (props, context) => {
    const { deleteUserTerrainsRentRequest } = useTerrains();

    const cancelTerrain = async (value) => {
      await deleteUserTerrainsRentRequest(value);
      context.emit('get-terrains');
    };
    return {
      cancelTerrain,
      tableHeaderRentTerrains,
    };
  },
});
</script>
