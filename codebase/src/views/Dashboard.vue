<template>
  <!--begin::Dashboard-->
  <div class="row d-flex justify-content-center">
    <div class="col-12 d-flex justify-content-center">
      <div class="form-check mx-4 p-0 cbtn-dark">
        <label class="form-check-label p-5" for="exampleRadios1">
          <input
            id="exampleRadios1"
            class="form-check-input border-primary border-2"
            type="radio"
            name="exampleRadios"
            value="option1"
            checked
            @click="searchByMap(false)"
          />
          <i class="fa-solid fa-list text-primary"></i>
          Search by List
        </label>
      </div>
      <div class="form-check cbtn-dark mx-4 p-0">
        <label class="form-check-label p-5" for="exampleRadios2">
          <input
            id="exampleRadios2"
            class="form-check-input border-primary border-2"
            type="radio"
            name="exampleRadios"
            value="option2"
            @click="searchByMap(true)"
          />
          <i class="fa-solid fa-map-location-dot text-primary"></i>
          Search by Map
        </label>
      </div>
    </div>
    <div class="col-6 my-4">
      <SearchTerrain :order-by="orderBy" @search-terrain="callback" />
    </div>
  </div>
  <div v-if="!mapSearch" class="row">
    <div class="row mt-10">
      <div class="d-flex justify-content-between">
        <h1 class="">Found Terrains</h1>
        <select
          v-model="orderBy"
          class="form-select w-25"
          aria-label="Select orderBy"
        >
          <option selected value="capacity|asc">Capacity: low - high</option>
          <option value="capacity|desc">Capacity: high - low</option>
          <option value="hectare|asc">Hectare: low - high</option>
          <option value="hectare|desc">Hectare: high - low</option>
          <option value="supermarket_rating|desc">Supermarket</option>
          <option value="activities_rating|desc">Activities</option>
          <option value="remote_rating|desc">Remote</option>
          <option value="bakery_rating|desc">Bakery</option>
          <option value="firstAid_rating|desc">First-aid</option>
        </select>
      </div>
    </div>
    <TerrainCards :terrains="terrains" col="col-3" />
  </div>
  <div v-if="mapSearch" class="row mt-4">
    <GoogleMap
      :center="center"
      :markers="markers"
      :zoom="8"
      :style="{
        height: '800px',
        'border-radius': '25px',
        'box-shadow':
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }"
    />
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import SearchTerrain from '@/custom_components/dashboard/SearchTerrain.vue';
import TerrainCards from '@/custom_components/terrain/TerrainCards.vue';
import useTerrains from '@/core/composables/terrain';
import GoogleMap from '@/custom_components/GoogleMap.vue';
import { TCenterGMap, TMarkersGMap } from '@/core/helpers/types';

export default defineComponent({
  name: 'MainDashboard',
  components: {
    GoogleMap,
    SearchTerrain,
    TerrainCards,
  },
  setup() {
    const { terrains, getTerrains, getTerrainBySearch } = useTerrains();
    const center = ref<TCenterGMap>({ lat: 50.5039, lng: 4.4699 });
    const markers = ref<TMarkersGMap | null>([
      { position: { lat: 0, lng: 0 }, terrain: null },
    ]);
    const mapSearch = ref(false);
    const orderBy = ref('capacity|asc');

    onMounted(async () => {
      setCurrentPageTitle('');
      await getTerrains();
      terrains.value.forEach((value) => {
        if (markers.value) {
          markers.value.push({
            position: { lat: value.latitude, lng: value.longitude },
            terrain: value,
          });
        }
      });
    });
    const searchByMap = (value) => {
      mapSearch.value = value;
    };
    const callback = (value) => {
      markers.value = [{ position: { lat: 0, lng: 0 }, terrain: null }];
      getTerrainBySearch(value).then(() => {
        terrains.value.forEach((value) => {
          if (markers.value) {
            markers.value.push({
              position: { lat: value.latitude, lng: value.longitude },
              terrain: value,
            });
          }
        });
      });
    };

    return {
      searchByMap,
      mapSearch,
      center,
      terrains,
      markers,
      callback,
      orderBy,
    };
  },
});
</script>
