<template>
  <div>
    <div class="w-100 mt-4 d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <span class="bullet bullet-dot bg-danger h-15px w-15px me-2"></span>
        <span class="">Owners Rating</span>
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
                <p class="fs-6 text-muted p-0 m-0">1 = Further then 45KM</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Between 45-35KM</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Between 35-25KM</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Between 25-15KM</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Closer then 15KM</p>
              </div>
              <div class="col-4">
                <p class="fs-6 p-0 m-0">Activities:</p>
                <p class="fs-6 text-muted p-0 m-0">1 = 0 Close-By</p>
                <p class="fs-6 text-muted p-0 m-0">2 = 1 or 2 semi Close-By</p>
                <p class="fs-6 text-muted p-0 m-0">3 = 1 - 2 Close-By</p>
                <p class="fs-6 text-muted p-0 m-0">4 = 3 Close-By</p>
                <p class="fs-6 text-muted p-0 m-0">5 = 4 or more Close-By</p>
              </div>
              <div class="col-4">
                <p class="fs-6 p-0 m-0">Remote:</p>
                <p class="fs-6 text-muted p-0 m-0">1</p>
                <p class="fs-6 text-muted p-0 m-0">2</p>
                <p class="fs-6 text-muted p-0 m-0">3</p>
                <p class="fs-6 text-muted p-0 m-0">4</p>
                <p class="fs-6 text-muted p-0 m-0">5</p>
              </div>
              <div class="col-4">
                <p class="fs-6p-0 m-0">Bakery access:</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Very hard</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Hard</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Oke</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Easy</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Very easy</p>
              </div>
              <div class="col-4 mt-3">
                <p class="fs-6 p-0 m-0">Playground access:</p>
                <p class="fs-6 text-muted p-0 m-0">1 = Very hard</p>
                <p class="fs-6 text-muted p-0 m-0">2 = Hard</p>
                <p class="fs-6 text-muted p-0 m-0">3 = Oke</p>
                <p class="fs-6 text-muted p-0 m-0">4 = Easy</p>
                <p class="fs-6 text-muted p-0 m-0">5 = Very easy</p>
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
    playgroundRating: { type: Number, required: true },
  },
  setup(props, context) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const baseColor = getCSSVariableValue('--bs-info');
    const lightColor = getCSSVariableValue('--bs-light-info');

    console.log(props);

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
        colors: ['#FF0000', 'blue', 'purple'],
      },
      xaxis: {
        categories: [
          'Supermarket',
          'Activities',
          'Remote',
          'Bakery',
          'Playground',
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
      colors: [lightColor],
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
        colors: ['#fff'],
        strokeColor: '#FF0000',
        strokeWidth: 2,
      },
      fill: {
        colors: '#FF0000',
        opacity: 0.2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      plotOptions: {
        radar: {
          size: 150,
          polygons: {
            strokeColors: '#e9e9e9',
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
          props.playgroundRating,
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
