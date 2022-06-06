<template>
  <Suspense>
    <div v-if="selectedRentInfo" class="row pb-5">
      <div v-if="terrain" class="col-4" style="height: 520px">
        <TerrainCards :terrains="[terrain]" col="col-12" />
      </div>
      <div
        v-if="selectedRentInfo"
        class="col-4 d-flex align-items-center justify-content-center p-0"
      >
        <PendingTerrainRentRequest
          :selected-rent-info="selectedRentInfo"
          @get-terrains="getTerrainRR"
        />
      </div>
      <div v-if="selectedRentInfo && options" class="col-4">
        <div class="card p-5 mb-5">
          <FullCalendar ref="fullCalendar" :options="options" />
        </div>
      </div>
      <div class="col-12">
        <TerrainsRentRequestTable
          v-model:rent-terrains="rentTerrains"
          v-model:is-loading="isLoading"
          v-model:selected-terrain="selectedTerrain"
          v-model:selected-rent-info="selectedRentInfo"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          @get-terrains="getTerrainRR"
        ></TerrainsRentRequestTable>
      </div>
    </div>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import useTerrains from '@/core/composables/terrain';

import TerrainsRentRequestTable from '@/custom_components/landlord/TerrainsRentRequestTable.vue';
import PendingTerrainRentRequest from '@/custom_components/landlord/PendingTerrainRentRequest.vue';
import TerrainCards from '@/custom_components/terrain/TerrainCards.vue';
import { TTerrainRent } from '@/core/helpers/types';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default defineComponent({
  name: 'ProfileProjects',
  components: {
    TerrainsRentRequestTable,
    PendingTerrainRentRequest,
    TerrainCards,
    FullCalendar,
  },
  props: {
    street: {
      type: String,
      default: '',
    },
  },
  setup() {
    const {
      getLandlordTerrainsRentRequest,
      getLandlordTerrain,
      rentTerrains,
      isLoading,
      terrain,
    } = useTerrains();
    const selectedTerrain = ref<Number>(0);
    const selectedRentInfo = ref(<TTerrainRent>{});
    const fullCalendar = ref();

    const getTerrainRR = async () => {
      await getLandlordTerrainsRentRequest();
      selectedRentInfo.value = rentTerrains.value[0];
    };

    const options = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      aspectRatio: 1,
      events: [{}],
    });

    onMounted(async () => {
      setCurrentPageTitle('');
      await getTerrainRR();
      await getLandlordTerrain(rentTerrains.value[0].terrain.id);
      selectedRentInfo.value = rentTerrains.value[0];
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.gotoDate(selectedRentInfo.value.startDate);

      options.value.events = [];
      terrain.value.rented_dates.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus !== 'rejected') {
          options.value.events.push({
            title: value.user.name + ' - ' + value.approvalStatus,
            start: value.startDate,
            end: value.endDate,
            color: color,
          });
        }
      });
      setCurrentPageTitle('Latest Application');
    });

    watch(selectedTerrain, async (newValue) => {
      await getLandlordTerrain(newValue);
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.gotoDate(selectedRentInfo.value.startDate);
      options.value.events = [];
      terrain.value.rented_dates.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus !== 'rejected') {
          options.value.events.push({
            title: value.user.name + ' - ' + value.approvalStatus,
            start: value.startDate,
            end: value.endDate,
            color: color,
          });
        }
      });
    });

    return {
      fullCalendar,
      options,
      terrain,
      isLoading,
      rentTerrains,
      selectedTerrain,
      selectedRentInfo,
      getTerrainRR,
    };
  },
});
</script>
