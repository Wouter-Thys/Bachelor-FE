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
        <usersTable
          :key="allUsersKey"
          v-model:is-loading="isLoading"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
        ></usersTable>
      </div>
    </div>
  </Suspense>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import usersTable from '@/components/admin/UsersTable.vue';
import UsersPendingLandlord from '@/components/admin/UsersPendingLandlordTable.vue';
import UserPendingLandlord from '@/components/admin/UserPendingLandlordCard.vue';
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
    const allUsersKey = ref(0);
    const { usersLandlordRequest, getUsersLandlordRequest, isLoading } =
      useUsers();

    const getUsersLR = async () => {
      isLoading.value = true;
      await getUsersLandlordRequest().then(() => {
        isLoading.value = false;
        usersLandlordRequest.value.length
          ? (selectedUser.value = usersLandlordRequest.value[0].id)
          : (selectedUser.value = null);
        allUsersKey.value += 1;
        isLoading.value = false;
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
      allUsersKey,
    };
  },
});
</script>
