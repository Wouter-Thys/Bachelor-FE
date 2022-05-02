<template>
  <!--begin::Mixed Widget 1-->
  <div v-if="selectedUser" class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-danger`" class="card-header border-0 py-5">
      <h3 class="card-title fw-bolder text-white">User pending landlord</h3>
      <div class="card-toolbar"></div>
    </div>
    <div class="card-body p-0">
      <div class="card-p mt-n20 position-relative">
        <div class="d-flex flex-center flex-column py-5">
          <div class="symbol symbol-100px symbol-circle mb-7">
            <img src="#" alt="image" />
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
            <p class="fs-3 text-gray-800 fw-bolder mb-3">
              {{ selectedUser.organization }}
            </p>
          </div>
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
        !value
          ? (selectedUser.value = props.loadUser as {})
          : (selectedUser.value = value);
      }
    );
    return {};
  },
});
</script>
