<template>
  <div>
    <div class="w-100 mt-4 d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <span class="bullet bullet-dot bg-danger h-15px w-15px me-2"></span>
        <span class="me-2">Owners Rating</span>
        <span class="bullet bullet-dot bg-warning h-15px w-15px me-2"></span>
        <span class="me-2">Google Rating</span>
      </div>

      <button
        class="btn btn-primary"
        data-bs-target="#kt_modal_1"
        data-bs-toggle="modal"
        type="button"
      >
        More Info
      </button>
    </div>
    <apexchart :options="options" :series="series" type="radar"></apexchart>

    <div id="kt_modal_1" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Legende</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <p class="fs-6 p-0 m-0">supermarket:</p>
                <p class="fs-6 text-muted p-0 m-0">Closest supermarket</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Further then 20KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 20-15KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 15-10KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 10-5KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Closer then 5KM</p>
              </div>
              <div class="col-4">
                <p class="fs-6 p-0 m-0">Activities:</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Further then 2KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 2-1.5KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 1.5-1KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 1-0.5KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Closer then 0.5KM</p>
              </div>
              <div class="col-4">
                <p class="fs-6 p-0 m-0">Remote:</p>
                <p class="fs-6 text-muted p-0 m-0">closest town/city</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Closer then 1KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 2-1KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 3-2KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 4-3KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Further then 4KM</p>
              </div>
              <div class="col-4 mt-3">
                <p class="fs-6 p-0 m-0">Bakery access:</p>
                <p class="fs-6 text-muted p-0 m-0">closest bakery</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Further then 20KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 20-15KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 15-10KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 10-5KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Closer then 5KM</p>
              </div>
              <div class="col-4 mt-3">
                <p class="fs-6 p-0 m-0">First-aid access:</p>
                <p class="fs-6 text-muted p-0 m-0">
                  closest hospital, doctor, first responder...
                </p>
                <p class="fs-6 text-muted p-0 m-0">1 = Further then 20KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 20-15KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 15-10KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 10-5KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Closer then 5KM</p>
              </div>
              <div class="col-12 mt-3">
                <p class="fs-6 p-0 m-0 text-info">
                  Be aware Google is not always correct because not everything
                  is indexed by google maps!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCSSVariableValue } from '@/assets/ts/_utils';

export default defineComponent({
  name: 'TerrainRatingChart',
  components: {},
  props: {
    supermarketRating: { type: Number, required: true },
    activitiesRating: { type: Number, required: true },
    remoteRating: { type: Number, required: true },
    bakeryRating: { type: Number, required: true },
    firstAidRating: { type: Number, required: true },
    googleSupermarketRating: { type: Number, required: true },
    googleActivitiesRating: { type: Number, required: true },
    googleRemoteRating: { type: Number, required: true },
    googleBakeryRating: { type: Number, required: true },
    googleFirstAidRating: { type: Number, required: true },
  },
  setup(props, context) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const baseColor = getCSSVariableValue('--bs-info');
    const lightColor = getCSSVariableValue('--bs-light-info');

    const options = {
      chart: {
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 2,
        colors: ['#FF0000', '#FFC700'],
      },
      xaxis: {
        categories: [
          'Supermarket',
          'Activities',
          'Remote',
          'Bakery',
          'First-aid',
        ],
      },
      yaxis: {
        type: 'numeric',
        tickAmount: 5,
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        max: 5,
        min: 0,
      },
      colors: ['#FF0000', '#FFC700'],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 4,
        colors: ['#FF0000', '#FFC700'],
        strokeColor: ['#FF0000', '#FFC700'],
        strokeWidth: 2,
      },
      fill: {
        colors: ['#FF0000', '#FFC700'],
        opacity: 0.2,
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
    };
    const series = [
      {
        name: 'Owners Rating',
        data: [
          props.supermarketRating,
          props.activitiesRating,
          props.remoteRating,
          props.bakeryRating,
          props.firstAidRating,
        ],
      },
      {
        name: 'Google Rating',
        data: [
          props.googleSupermarketRating,
          props.googleActivitiesRating,
          props.googleRemoteRating,
          props.googleBakeryRating,
          props.googleFirstAidRating,
        ],
      },
    ];

    return {
      options,
      series,
    };
  },
});
</script>
