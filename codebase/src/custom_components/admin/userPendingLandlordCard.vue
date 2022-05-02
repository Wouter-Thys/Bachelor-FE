<template>
  <!--begin::Mixed Widget 1-->
  <div v-if="selectedUser" class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-danger`" class="card-header mb-5">
      <h3 class="card-title fw-bolder text-white">User pending landlord</h3>
      <div class="card-toolbar"></div>
    </div>
    <div class="card-body px-0">
      <div class="mt-n20 position-relative">
        <div class="d-flex flex-center flex-column">
          <div class="mb-7">
            <img
              v-if="selectedUser.landlordRequestImage"
              :src="`data:image/png;base64, ${selectedUser.landlordRequestImage[0].image}`"
              alt="image"
              class="img-fluid rounded"
              style="height: 300px; width: 410px; object-fit: cover"
            />
          </div>
          <!--end::Avatar-->
          <!--begin::Name-->
          <h2 class="fs-3 text-gray-800 fw-bolder mb-3">
            {{ selectedUser.name }}
          </h2>
          <div class="mb-9">
            <div
              v-for="(role, index) in selectedUser.roles"
              :key="index"
              class="badge badge-lg badge-light-primary d-inline m-1"
            >
              {{ role }}
            </div>
          </div>
          <div class="d-flex flex-wrap flex-center">
            <p class="fs-3 text-gray-800 fw-bolder mb-3">
              {{ selectedUser.email }}
            </p>
          </div>
          <div class="d-flex flex-wrap flex-center">
            <p class="fs-3 text-gray-800 fw-bolder mb-3">
              {{ selectedUser.organization }}
            </p>
          </div>
          <span class="btn-group">
            <button class="btn btn-icon btn-success vgt-center-align">
              <i class="las la-download fs-3" />
            </button>
            <button class="btn btn-icon btn-danger vgt-center-align">
              <i class="las la-trash fs-3" />
            </button>
          </span>
        </div>
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'UserPendingLandlord',
  components: {},
  props: {
    selectedUser: {
      type: Object,
      default: Object,
      require: true,
    },
    loadUser: {
      type: Object,
      default: Object,
      require: true,
    },
  },
  setup(props, context) {
    const selectedUser = ref({});
    watch(
      () => props.selectedUser,
      (value) => {
        console.log(value?.landlordRequestImage[0].image);
        !value
          ? (selectedUser.value = props.loadUser as {})
          : (selectedUser.value = value);
      }
    );
    return {};
  },
});
</script>
