<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Rented terrains</h3>
      </div>
    </div>
    <div class="card-body p-0">
      <Suspense>
        <TerrainsRentRequestTable
          v-model:rent-terrains="rentTerrains"
          v-model:is-loading="isLoading"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          @get-terrains="getTerrainRR"
        ></TerrainsRentRequestTable>
      </Suspense>
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Your Rented Terrains Calendar</h3>
      </div>
    </div>
    <div class="card-body p-0">
      <div v-if="options">
        <div class="card p-5 mb-5">
          <FullCalendar ref="fullCalendar" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import TerrainsRentRequestTable from '@/components/user/TerrainsRentRequestTable.vue';
import useTerrains from '@/core/composables/terrain';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import router from '@/router/router';

export default defineComponent({
  name: 'AccountOverview',
  components: { TerrainsRentRequestTable, FullCalendar },
  setup() {
    const { getUserTerrainsRentRequest, rentTerrains, isLoading } =
      useTerrains();

    const options = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      aspectRatio: 1,
      height: 450,
      events: [{}],
      eventClick: function (info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate

        if (info.event.url) {
          router.push({ path: info.event.url });
        }
      },
    });

    const getTerrainRR = async () => {
      await getUserTerrainsRentRequest();
      options.value.events = [];
      rentTerrains.value.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus !== 'rejected') {
          options.value.events.push({
            title: value.terrain.name + ' - ' + value.approvalStatus,
            start: value.startDate,
            end: value.endDate,
            color: color,
            url: '/terrain/' + value.terrain.id,
          });
        }
      });
    };

    onMounted(async () => {
      setCurrentPageTitle('');
      await getTerrainRR();
      options.value.events = [];
      rentTerrains.value.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus !== 'rejected') {
          options.value.events.push({
            title: value.terrain.name + ' - ' + value.approvalStatus,
            start: value.startDate,
            end: value.endDate,
            color: color,
            url: '/terrain/' + value.terrain.id,
          });
        }
      });
    });

    return { getTerrainRR, rentTerrains, isLoading, options };
  },
});
</script>
