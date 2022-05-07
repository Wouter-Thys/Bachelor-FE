<template>
  <!--begin::Charts Widget 3-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Recent Terrain Views</span>
      </h3>

      <!--begin::Toolbar-->
      <div class="card-toolbar" data-kt-buttons="true">
        <a
          id="kt_charts_widget_3_year_btn"
          class="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
        >
          Year
        </a>

        <a
          id="kt_charts_widget_3_month_btn"
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
        >
          Month
        </a>

        <a
          id="kt_charts_widget_3_week_btn"
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
        >
          Week
        </a>
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        type="area"
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

export default defineComponent({
  name: 'Widget1',
  components: {},
  props: {
    widgetClasses: String,
  },
  setup() {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const baseColor = getCSSVariableValue('--bs-info');
    const lightColor = getCSSVariableValue('--bs-light-info');

    const options = {
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        toolbar: {
          show: false,
        },
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
        colors: ['red', 'blue', 'purple'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
        name: 'Terrain 1',
        data: [30, 40, 40, 90, 90, 70, 70],
      },
      {
        name: 'Terrain 2',
        data: [40, 80, 10, 10, 50, 60, 20],
      },
      {
        name: 'Terrain 3',
        data: [80, 90, 60, 70, 70, 50, 90],
      },
    ];

    return {
      options,
      series,
    };
  },
});
</script>
