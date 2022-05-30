<template>
  <div class="w-100 d-flex justify-content-center">
    <router-link to="/landlord/dashboard">
      <h1 class="btn btn-primary mx-2">Dashboard</h1>
    </router-link>
    <router-link to="/landlord/my-terrains">
      <h1 class="btn btn-white mx-2">My terrains</h1>
    </router-link>
  </div>
  <div class="row">
    <div class="col-12">
      <LandlordApexChart1 widget-classes=" mb-xl-8"></LandlordApexChart1>
    </div>
  </div>
  <!--begin::Toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Heading-->
    <h2 class="fs-2 fw-bold my-2">My Terrains</h2>
    <!--end::Heading-->

    <!--begin::Controls-->
    <div class="d-flex flex-wrap my-1">
      <!--begin::Select wrapper-->
      <div class="m-0">
        <!--begin::Select-->
        <router-link
          id="kt_toolbar_primary_button"
          to="/landlord/add-terrain"
          class="btn btn-sm btn-primary"
        >
          Add A New Terrain
        </router-link>
        <!--end::Select-->
      </div>
      <!--end::Select wrapper-->
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Toolbar-->

  <!--begin::Row-->
  <TerrainCards v-model:terrains="terrains" v-model:col="col" />
  <!--end::Col-->
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import LandlordApexChart1 from '@/custom_components/landlord/LandlordApexChart1.vue';
import useTerrains from '@/core/composables/terrain';
import TerrainCards from '@/custom_components/terrain/TerrainCards.vue';

export default defineComponent({
  name: 'ProfileProjects',
  components: {
    LandlordApexChart1,
    TerrainCards,
  },
  props: {
    street: {
      type: String,
      default: '',
    },
  },
  setup() {
    const col = 'col-4';
    const { terrains, getLandlordTerrains } = useTerrains();
    onMounted(() => {
      getLandlordTerrains();
      setCurrentPageBreadcrumbs('', ['Pages', 'Profile']);
    });

    return {
      terrains,
      col,
    };
  },
});
</script>
