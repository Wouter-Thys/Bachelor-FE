<template>
  <div v-if="selectedRentInfo" class="card mb-5">
    <div class="card-body pt-3">
      <div v-if="selectedRentInfo.user" class="row mb-4">
        <div class="d-flex justify-content-center">
          <div>
            <div class="d-flex justify-content-center">
              <h1 class="">
                {{ selectedRentInfo.user.name }}
              </h1>
            </div>
            <div class="d-flex justify-content-center">
              <p class="p-0 m-0">
                {{ selectedRentInfo.user.email }}
              </p>
            </div>
            <div class="d-flex justify-content-center">
              <p class="p-0 m-0">
                {{ selectedRentInfo.user.organization }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator mb-7"></div>
      <div class="row">
        <h1 class="d-flex justify-content-center w-100">Start Date</h1>
        <p class="d-flex justify-content-center w-100 mb-6 fs-4">
          {{ selectedRentInfo.startDate }}
        </p>
      </div>
      <div class="row">
        <h1 class="d-flex justify-content-center w-100">End Date</h1>
        <p class="d-flex justify-content-center w-100 mb-6 fs-4">
          {{ selectedRentInfo.endDate }}
        </p>
      </div>
      <div class="row">
        <div class="btn">
          <button
            class="btn btn-success vgt-center-align me-2"
            @click="approveTerrainRentFn(selectedRentInfo.id, true)"
          >
            <i class="fa-solid fa-check"></i>
            Approve
          </button>
          <button
            class="btn btn-danger vgt-center-align ms-2"
            @click="approveTerrainRentFn(selectedRentInfo.id, false)"
          >
            <i class="fa-solid fa-xmark"></i>
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TTerrainRent } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';
import router from '@/router/router';

export default defineComponent({
  name: 'RentTerrainRequest',
  components: {},
  props: {
    selectedRentInfo: {
      type: Object as PropType<TTerrainRent>,
      required: true,
    },
  },
  emits: ['get-users', 'get-terrains'],
  setup(props, context) {
    const approveTerrainRentFn = (id, value) => {
      const approveTerrainRent = { approveTerrainRent: value };
      ApiService.update('landlord/rent-request', id, approveTerrainRent as any)
        .then((r) => {
          context.emit('get-terrains');
        })
        .catch((e) => {
          console.log(e);
          router.go(0);
        });
    };
    return { approveTerrainRentFn };
  },
});
</script>
