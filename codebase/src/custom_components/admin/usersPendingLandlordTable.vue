<template>
  <!--begin::Tables Widget 9-->
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">
          Users requesting landlord role
        </span>

        <span class="text-muted mt-1 fw-bold fs-7">
          Over {{ users.length }} members
        </span>
      </h3>
      <!--begin::Card title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <div class="card-body p-0 pt-3">
      <!--begin::Table container-->
      <vue-good-table
        :columns="tableHeader"
        :is-loading="isLoading"
        :pagination-options="{ enabled: true }"
        :rows="users"
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
            <span v-if="props.column.field === 'beforeName'">
              <span class="d-flex align-items-center">
                <span class="symbol symbol-45px me-5">
                  <i class="fa-solid fa-user fa-2xl"></i>
                </span>
                <span>
                  <span class="text-dark fw-bolder fs-6">
                    {{ props.row.name }}
                  </span>

                  <span class="text-muted fw-bold text-muted d-block fs-7">
                    {{ props.row.roles.toString().replaceAll(',', ', ') }}
                  </span>
                </span>
              </span>
            </span>

            <span v-if="props.column.field === 'beforeEmail'">
              <span class="d-flex align-items-center">
                <span class="text-dark fw-bolder fs-6">
                  {{ props.row.email }}
                </span>
              </span>
            </span>

            <span v-if="props.column.field === 'beforeOrganization'">
              <span class="d-flex align-items-center">
                <span class="text-dark fw-bolder fs-6">
                  {{ props.row.organization }}
                </span>
              </span>
            </span>
            <span v-if="props.column.field === 'actions'" class="btn-group">
              <button class="btn btn-icon btn-success vgt-center-align">
                <i class="las la-download fs-3" />
              </button>
              <button class="btn btn-icon btn-danger vgt-center-align">
                <i class="las la-trash fs-3" />
              </button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </a>
        </template>
      </vue-good-table>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 9-->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { User } from '@/store/modules/AuthModule';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default defineComponent({
  name: 'UsersPendingLandlord',
  components: {
    'vue-good-table': require('vue-good-table-next').VueGoodTable,
  },

  props: {
    users: {
      type: Object as PropType<User[]>,
      default: Array,
    },
    selectedUser: {
      type: Object,
      default: Object,
      require: true,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:selectedUser'],
  setup: async (props, context) => {
    const onRowClick = (params) => {
      context.emit('update:selectedUser', params.row);
    };
    const tableHeader = [
      {
        label: 'Name',
        field: 'beforeName',
      },
      {
        label: 'Name',
        field: 'name',
        hidden: true,
      },
      {
        label: 'Email',
        field: 'beforeEmail',
      },
      {
        label: 'Email',
        field: 'email',
        hidden: true,
      },
      {
        label: 'Organization',
        field: 'beforeOrganization',
      },
      {
        label: 'Organization',
        field: 'organization',
        hidden: true,
      },
      {
        label: 'Actions',
        field: 'actions',
        html: true,
        sortable: false,
        tdClass: 'vgt-center-align',
      },
    ];
    return {
      onRowClick,
      tableHeader,
    };
  },
});
</script>
