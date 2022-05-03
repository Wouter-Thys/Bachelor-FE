<template>
  <!--begin::Mixed Widget 1-->
  <div v-if="selectedUser" class="card mb-5">
    <!--begin::Header-->

    <img
      v-if="userLandlordRequest.landlordRequestImage"
      :src="`data:image/png;base64, ${userLandlordRequest.landlordRequestImage[0].image}`"
      alt="image"
      class="card-img-top img-fluid"
      style="height: 300px; object-fit: cover"
    />
    <div class="card-body px-0 pt-0">
      <div class="d-flex flex-center flex-column">
        <!--end::Avatar-->
        <!--begin::Name-->
        <h2 class="fs-3 text-gray-800 fw-bolder mt-7">
          {{ userLandlordRequest.name }}
        </h2>
        <div class="mb-9">
          <div
            v-for="(role, index) in userLandlordRequest.roles"
            :key="index"
            class="badge badge-lg badge-light-primary d-inline m-1"
          >
            {{ role }}
          </div>
        </div>
        <div class="d-flex flex-center flex-column mb-9">
          <p class="fs-3 text-gray-800 fw-bolder mb-3">
            {{ userLandlordRequest.email }}
          </p>
          <p class="fs-3 text-gray-800 fw-bolder mb-3">
            {{ userLandlordRequest.organization }}
          </p>
        </div>
        <div class="btn">
          <button
            class="btn btn-success vgt-center-align me-2"
            @click="onAcceptedClick(userLandlordRequest.id, true)"
          >
            <i class="fa-solid fa-check"></i>
            Approve
          </button>
          <button
            class="btn btn-danger vgt-center-align ms-2"
            @click="onAcceptedClick(userLandlordRequest.id, false)"
          >
            <i class="fa-solid fa-xmark"></i>
            Decline
          </button>
        </div>
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import useUsers from '@/core/composables/users';

export default defineComponent({
  name: 'UserPendingLandlord',
  components: {},
  props: {
    selectedUser: {
      type: Number,
      default: 0,
      require: true,
    },
  },
  emits: ['get-users'],
  setup(props, context) {
    let {
      userLandlordRequest,
      getUserLandlordRequest,
      putUserLandlordRequest,
    } = useUsers();

    const getUserLR = async (id) => {
      await getUserLandlordRequest(id);
    };
    const onAcceptedClick = async (id: string | number, bool: boolean) => {
      await putUserLandlordRequest(id, bool).then(() => {
        return context.emit('get-users');
      });
    };

    watch(
      () => props.selectedUser,
      (value) => {
        if (value) getUserLR(props.selectedUser);
      }
    );
    return { userLandlordRequest, onAcceptedClick };
  },
});
</script>
