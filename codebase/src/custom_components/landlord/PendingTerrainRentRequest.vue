<template>
  <div v-if="selectedRentInfo" class="card mb-5">
    <div class="card-body pt-3">
      <div class="row mb-4">
        <div class="d-flex justify-content-end"></div>
      </div>
      <div class="row">
        <h1 class="d-flex justify-content-center w-100">Start Date</h1>
        <p class="d-flex justify-content-center w-100 mb-6 fs-4">
          {{ selectedRentInfo.startDate }}
        </p>
      </div>
      <div class="row my-6">
        <div class="col-4">
          <span class="fs-4">
            <i class="fa-solid fa-arrow-left text-black fa-1"></i>
            Terrain
          </span>
        </div>
        <div class="col-4">
          <span class="d-flex justify-content-center mb-6">
            <i class="fa-solid fa-up-down fa-2xl text-black"></i>
          </span>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center">
          <span class="fs-4">Terrain Calendar</span>
          <span class="ms-2">
            <i class="fa-solid fa-arrow-right text-black fa-1"></i>
          </span>
        </div>
      </div>
      <div class="row">
        <h1 class="d-flex justify-content-center w-100">End Date</h1>
        <p class="d-flex justify-content-center w-100 mb-6 fs-4">
          {{ selectedRentInfo.endDate }}
        </p>
      </div>
      <div class="row">
        <div class="btn">
          <button class="btn btn-success vgt-center-align me-2">
            <i class="fa-solid fa-check"></i>
            Approve
          </button>
          <button class="btn btn-danger vgt-center-align ms-2">
            <i class="fa-solid fa-xmark"></i>
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { TTerrainRent } from '@/core/helpers/types';

export default defineComponent({
  name: 'RentTerrainRequest',
  components: {},
  props: {
    selectedRentInfo: {
      type: Object as PropType<TTerrainRent>,
      required: true,
    },
  },
  emits: ['get-users'],
  setup(props, context) {
    return {};
  },
});
</script>
