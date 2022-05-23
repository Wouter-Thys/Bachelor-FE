<template>
  <div class="">
    <GMapMap :center="center" :zoom="zoom" map-type-id="terrain" :style="style">
      <GMapCluster
        :zoom-on-click="true"
        :styles="[
          {
            textColor: 'black',
            url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m1.png',
            height: 50,
            width: 50,
          },
        ]"
      >
        <GMapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="openMarker(m.terrain.id)"
        >
          <GMapInfoWindow
            v-if="m.terrain"
            :opened="openedMarkerID === m.terrain.id"
            :closeclick="true"
          >
            <div class="mx-4">
              <div class="row d-flex justify-content-between my-2">
                <div class="col-6 p-0">
                  <span class="fs-6 text-gray-800 fw-bolder">
                    {{ m.terrain.name }}
                  </span>
                </div>
                <div class="col-6 d-flex justify-content-end p-0">
                  <span class="fs-6 fw-bolder me-1 d-flex align-items-center">
                    <i class="fa-solid fa-users"></i>
                    {{ m.terrain.max_people }}
                  </span>
                  <span class="fs-6 fw-bolder d-flex align-items-center">
                    <i class="fa-solid fa-mountain"></i>
                    {{ m.terrain.hectare }}

                    <span class="fs-8">ha.</span>
                  </span>
                </div>
              </div>
              <div class="">
                <span
                  v-if="
                    AddressService.addressToString(
                      m.terrain.street,
                      m.terrain.streetNumber,
                      m.terrain.postcode,
                      m.terrain.locality,
                      m.terrain.province
                    ).length > 32
                  "
                  class="fs-6 fw-bolder text-gray-600"
                >
                  <i class="fa-solid fa-location-dot"></i>
                  {{
                    AddressService.addressToString(
                      m.terrain.street,
                      m.terrain.streetNumber,
                      m.terrain.postcode,
                      m.terrain.locality,
                      m.terrain.province
                    ).substring(0, 32) + '...'
                  }}
                </span>
                <span v-else class="fs-6 fw-bolder text-gray-600">
                  <i class="fa-solid fa-location-dot"></i>
                  {{
                    AddressService.addressToString(
                      m.terrain.street,
                      m.terrain.streetNumber,
                      m.terrain.postcode,
                      m.terrain.locality,
                      m.terrain.province
                    )
                  }}
                </span>
              </div>
              <div class="d-flex justify-content-center mt-2">
                <router-link
                  :to="'/terrain/' + m.terrain.id"
                  class="p-1 fs-5 text-primary"
                >
                  <i class="fa-solid fa-circle-arrow-right text-primary"></i>
                  Go to Terrain
                </router-link>
              </div>
            </div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapCluster>
    </GMapMap>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import AddressService from '@/core/services/AddressService';

export default defineComponent({
  name: 'GoogleMap',
  components: {},
  props: {
    center: {
      type: Object,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
    style: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const openedMarkerID = ref<Number | null>(null);

    const openMarker = (value) => {
      if (value !== openedMarkerID.value) {
        openedMarkerID.value = value;
      } else {
        openedMarkerID.value = null;
      }
    };
    return { openMarker, openedMarkerID, AddressService };
  },
});
</script>
