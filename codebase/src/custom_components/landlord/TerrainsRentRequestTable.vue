<template>
  <!--begin::Tables Widget 9-->
  <div v-if="rentTerrains.length" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">
          Users that want to rent a terrain
        </span>

        <span class="text-muted mt-1 fw-bold fs-7">
          Over {{ rentTerrains.length }} members
        </span>
      </h3>
      <!--begin::Card title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <div class="card-body p-0 pt-3">
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
          <a class="cursor-pointer" @click="onRowClick(props)">
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
          </a>
          <span v-if="props.column.field === 'actions'" class="btn-group">
            <button
              class="btn btn-primary vgt-center-align"
              @click="onRowClick(props)"
            >
              <i class="fa-solid fa-eye"></i>
              view
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
    const onRowClick = (params) => {
      context.emit('update:selectedTerrain', params.row.terrain.id);
      context.emit('update:selectedRentInfo', params.row);
    };
    return {
      onRowClick,
      tableHeaderRentTerrains,
    };
  },
});
</script>
