<template>
  <div class="w-100 d-flex justify-content-center">
    <router-link to="/landlord/dashboard">
      <h1 class="btn btn-white mx-2">Dashboard</h1>
    </router-link>
    <router-link to="/landlord/my-terrains">
      <h1 class="btn btn-primary mx-2">My terrains</h1>
    </router-link>
  </div>
  <Suspense>
    <div class="row pb-5">
      <div v-if="terrain" class="col-4">
        <TerrainCards :terrains="[terrain]" col="col-12" />
      </div>
      <div
        v-if="selectedRentInfo"
        class="col-4 d-flex align-items-center justify-content-center p-0"
      >
        <PendingTerrainRentRequest :selected-rent-info="selectedRentInfo" />
      </div>
      <div v-if="selectedRentInfo && options" class="col-4">
        <div class="card p-5">
          <FullCalendar ref="fullCalendar" :options="options" />
        </div>
      </div>
      <div class="col-12">
        <PendingTerrainsRentRequest
          v-model:rent-terrains="rentTerrains"
          v-model:is-loading="isLoading"
          v-model:selected-terrain="selectedTerrain"
          v-model:selected-rent-info="selectedRentInfo"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          @get-terrains="getTerrainRR"
        ></PendingTerrainsRentRequest>
      </div>
    </div>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import useTerrains from '@/core/composables/terrain';

import PendingTerrainsRentRequest from '@/custom_components/landlord/PendingTerrainsRentRequest.vue';
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
    PendingTerrainsRentRequest,
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
      getTerrainsRentRequest,
      getLandlordTerrain,
      rentTerrains,
      isLoading,
      terrain,
    } = useTerrains();
    const selectedTerrain = ref<Number>(0);
    const selectedRentInfo = ref(<TTerrainRent>{});
    const fullCalendar = ref();

    const getTerrainRR = async () => {
      await getTerrainsRentRequest();
    };

    const options = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      aspectRatio: 1,
      events: [{}],
    });

    onMounted(async () => {
      await getTerrainRR();
      await getLandlordTerrain(rentTerrains.value[0].terrain.id);
      selectedRentInfo.value = rentTerrains.value[0];
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.gotoDate(selectedRentInfo.value.startDate);
      options.value.events.push({
        title: 'titme',
        start: '2022-5-6',
        end: '2022-5-30',
        color: 'orange',
      });
      setCurrentPageTitle('Landlord Dashboard');
    });

    watch(selectedTerrain, (newValue) => {
      getLandlordTerrain(newValue);
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.gotoDate(selectedRentInfo.value.startDate);
      options.value.events = [];
      terrain.value.rented_dates.forEach((value) => {
        const startDate =
          new Date(value.startDate).getFullYear() +
          '-' +
          new Date(value.startDate).getMonth() +
          '-' +
          new Date(value.startDate).getDate();
        const endDate =
          new Date(value.endDate).getFullYear() +
          '-' +
          new Date(value.endDate).getMonth() +
          '-' +
          new Date(value.endDate).getDate();
        let color = '';
        if (value.ApprovedStatus === 'pending') color = 'orange';
        if (value.ApprovedStatus === 'approved') color = 'green';
        if (value.ApprovedStatus !== 'rejected') {
          options.value.events.push({
            title: selectedRentInfo.value.user.name,
            start: startDate,
            end: endDate,
            color: 'orange',
          });
        }
      });
      console.log(options.value);
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
