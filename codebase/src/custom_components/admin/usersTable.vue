<template>
  <!--begin::Tables Widget 9-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">All Users</span>

        <span class="text-muted mt-1 fw-bold fs-7">
          Over {{ users.length }} members
        </span>
      </h3>
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <!--end::Svg Icon-->
          <input
            v-model="search"
            type="text"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search user"
          />
        </div>
        <!--end::Search-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bolder text-muted">
              <th class="min-w-150px">User</th>
              <th class="min-w-150px">Email</th>
              <th class="min-w-150px">Organization</th>
              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(user, index) in filteredUsers" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-45px me-5">
                      <i class="fa-solid fa-user fa-2xl"></i>
                    </div>
                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="Javascript:void(0)"
                        class="text-dark fw-bolder text-hover-primary fs-6"
                      >
                        {{ user.name }}
                      </a>

                      <span class="text-muted fw-bold text-muted d-block fs-7">
                        {{ user.roles.toString().replaceAll(',', ', ') }}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <a
                    href="Javascript:void(0)"
                    class="text-dark fw-bolder text-hover-primary d-block fs-6"
                  >
                    {{ user.email }}
                  </a>
                </td>

                <td>
                  <a
                    href="Javascript:void(0)"
                    class="text-dark fw-bolder text-hover-primary d-block fs-6"
                  >
                    {{ user.organization }}
                  </a>
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    data-toggle="tooltip"
                    title="View User"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg
                        src="media/icons/duotune/general/gen019.svg"
                      />
                    </span>
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    data-toggle="tooltip"
                    title="Quick Edit"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 9-->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiService from '@/core/services/ApiService';
import { User } from '@/store/modules/AuthModule';

export default defineComponent({
  name: 'UsersTable',
  components: {},

  props: {},
  setup: async () => {
    const checkedRows = ref([]);

    const users = await ApiService.get('/admin/users').then(({ data }) => {
      return data.data as User[];
    });

    return {
      checkedRows,
      users,
    };
  },
  data: function () {
    return {
      search: '',
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.email.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.organization.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1
        );
      });
    },
  },
});
</script>
