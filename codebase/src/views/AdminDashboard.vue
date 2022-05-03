<template>
  <!--begin::Dashboard-->

  <Suspense>
    <div class="row pb-5">
      <div class="col-4">
        <UserPendingLandlord
          v-model:selected-user="selectedUser"
          @get-users="getUsersLR"
        ></UserPendingLandlord>
      </div>
      <div class="col-8">
        <UsersPendingLandlord
          v-model:users="usersLandlordRequest"
          v-model:selected-user="selectedUser"
          v-model:is-loading="isLoading"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          @get-users="getUsersLR"
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
import { defineComponent, onMounted, ref } from 'vue';
import usersTable from '@/custom_components/admin/usersTable.vue';
import UsersPendingLandlord from '@/custom_components/admin/usersPendingLandlordTable.vue';
import UserPendingLandlord from '@/custom_components/admin/userPendingLandlordCard.vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import useUsers from '@/core/composables/users';

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    usersTable,
    UsersPendingLandlord,
    UserPendingLandlord,
  },
  setup() {
    const selectedUser = ref<null | number>(null);
    const { usersLandlordRequest, getUsersLandlordRequest, isLoading } =
      useUsers();

    const getUsersLR = async () => {
      await getUsersLandlordRequest().then(() => {
        usersLandlordRequest.value.length
          ? (selectedUser.value = usersLandlordRequest.value[0].id)
          : (selectedUser.value = null);
      });
    };

    onMounted(async () => {
      await getUsersLR();
      setCurrentPageTitle('Admin Dashboard');
    });
    return {
      usersLandlordRequest,
      isLoading,
      selectedUser,
      getUsersLR,
    };
  },
});
</script>
