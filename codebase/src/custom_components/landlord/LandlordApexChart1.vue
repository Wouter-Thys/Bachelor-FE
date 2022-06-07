<template>
  <!--begin::Charts Widget 3-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Terrain Views</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        type="bar"
        :height="300"
        :options="options"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 3-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCSSVariableValue } from '@/assets/ts/_utils';
import { TTerrain } from '@/core/helpers/types';

export default defineComponent({
  name: 'Widget1',
  components: {},
  props: {
    widgetClasses: String,
    terrains: {
      type: Object as () => TTerrain[],
      required: true,
    },
  },
  setup(props, context) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const baseColor = getCSSVariableValue('--bs-info');
    const lightColor = getCSSVariableValue('--bs-light-info');

    console.log(props.terrains.map((a) => a.name));

    const options = {
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: '#5EC43B',
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: ['#5EC43B'],
      },
      xaxis: {
        categories: props.terrains.map((a) => a.name),
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: baseColor,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          fillSeriesColor: true,
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val) {
            return '' + val + ' Views';
          },
          title: {
            formatter: function (val) {
              return '';
            },
          },
        },
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
        strokeColor: baseColor,
        strokeWidth: 3,
      },
    };

    const series = [
      {
        data: props.terrains.map((a) => a.views),
      },
    ];

    return {
      options,
      series,
    };
  },
});
</script>
