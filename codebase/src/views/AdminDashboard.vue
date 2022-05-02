<template>
  <!--begin::Dashboard-->

  <Suspense>
    <div class="row gy-5 gx-xl-8">
      <div class="col-xxl-4">
        <UserPendingLandlord
          v-model:selected-user="selectedUser"
        ></UserPendingLandlord>
      </div>
      <div class="col-xxl-8">
        <UsersPendingLandlord
          v-model:users="users"
          v-model:selected-user="selectedUser"
          v-model:is-loading="isLoading"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
        ></UsersPendingLandlord>
      </div>
    </div>
  </Suspense>
  <Suspense>
    <div class="row gy-5 gx-xl-8">
      <div class="col-xxl-12">
        <usersTable widget-classes="card-xxl-stretch mb-5 mb-xl-8"></usersTable>
      </div>
    </div>
  </Suspense>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import usersTable from '@/custom_components/admin/usersTable.vue';
import UsersPendingLandlord from '@/custom_components/admin/usersPendingLandlordTable.vue';
import UserPendingLandlord from '@/custom_components/admin/userPendingLandlordCard.vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import ApiService from '@/core/services/ApiService';
import { User } from '@/store/modules/AuthModule';

export default defineComponent({
  name: 'MainDashboard',
  components: {
    usersTable,
    UsersPendingLandlord,
    UserPendingLandlord,
  },
  setup() {
    const users = ref<User[]>([]);
    const loadUser = ref<User>();
    const isLoading = ref(true);
    const selectedUser = ref({});

    onMounted(() => {
      setCurrentPageTitle('Admin Dashboard');
      ApiService.get('/users-pending-landlord').then(({ data }) => {
        users.value = data.data;
        selectedUser.value = data.data[0];
        return (isLoading.value = false);
      });
    });
    return {
      users,
      loadUser,
      isLoading,
      selectedUser,
    };
  },
});
</script>
