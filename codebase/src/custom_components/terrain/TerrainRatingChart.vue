<template>
  <div>
    <apexchart type="radar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getCSSVariableValue } from '@/assets/ts/_utils';
import { TTerrain } from '@/core/helpers/types';

export default defineComponent({
  name: 'TerrainRatingChart',
  components: {},
  props: {
    supermarketRating: { type: Number, required: true },
    activitiesRating: { type: Number, required: true },
    remoteRating: { type: Number, required: true },
    woodRating: { type: Number, required: true },
    playgroundRating: { type: Number, required: true },
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
        colors: ['#FF0000', 'blue', 'purple'],
      },
      xaxis: {
        categories: [
          'Supermarket',
          'Activities',
          'Remote',
          'Wood',
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
          props.woodRating,
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
