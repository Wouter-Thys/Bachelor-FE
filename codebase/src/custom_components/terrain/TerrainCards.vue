<template>
  <!--begin::Mixed Widget 1-->

  <div v-if="terrains" class="row g-6 g-xl-9">
    <!--begin::Col-->
    <div v-for="(terrain, index) in terrains" :key="index" :class="col">
      <!--begin::Header-->
      <router-link :to="'/terrain/' + terrain.id">
        <div class="card mb-5 text-dark">
          <div
            :id="'kt_carousel_1_carousel_' + index"
            class="carousel carousel-custom slide"
            data-bs-ride="carousel"
            data-bs-interval="8000"
          >
            <div class="carousel-inner">
              <div
                v-for="(image, indexImg) in terrain.images"
                :key="indexImg"
                class="carousel-item"
                :class="indexImg === 0 ? 'active' : ''"
              >
                <img
                  :src="image.url"
                  alt="image"
                  class="d-block w-100 rounded-top"
                  style="height: 260px; object-fit: cover"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              :data-bs-target="'#kt_carousel_1_carousel_' + index"
              role="button"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              :data-bs-target="'#kt_carousel_1_carousel_' + index"
              role="button"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="card-body px-0 pt-0">
            <div class="px-2">
              <!--end::Avatar-->
              <!--begin::Name-->
              <div class="row d-flex justify-content-between mt-3">
                <div class="col-8">
                  <span class="fs-3 text-gray-800 fw-bolder">
                    {{ terrain.name }}
                  </span>
                  <div class="mx-2">
                    <span
                      v-if="
                        AddressService.addressToString(
                          terrain.street,
                          terrain.streetNumber,
                          terrain.postcode,
                          terrain.locality,
                          terrain.province
                        ).length > 28
                      "
                      class="fs-6 fw-bolder text-gray-600"
                    >
                      <i class="fa-solid fa-location-dot"></i>
                      {{
                        AddressService.addressToString(
                          terrain.street,
                          terrain.streetNumber,
                          terrain.postcode,
                          terrain.locality,
                          terrain.province
                        ).substring(0, 28) + '...'
                      }}
                    </span>
                    <span v-else class="fs-6 fw-bolder text-gray-600">
                      <i class="fa-solid fa-location-dot"></i>
                      {{
                        AddressService.addressToString(
                          terrain.street,
                          terrain.streetNumber,
                          terrain.postcode,
                          terrain.locality,
                          terrain.province
                        )
                      }}
                    </span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row">
                    <div class="d-flex justify-content-end">
                      <span class="fs-6 fw-bolder me-1">
                        <i class="fa-solid fa-users"></i>
                        {{ terrain.max_people }}
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="d-flex justify-content-end">
                      <span class="fs-6 fw-bolder">
                        <i class="fa-solid fa-mountain"></i>
                        {{ terrain.hectare }}

                        <span class="fs-8">ha.</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mx-2 mt-2 row">
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.water
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Water
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.electricity
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Electricity
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.threePhaseElectricity
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                3 Phase Electricity
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.sanitaryBlock
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Sanitary Block
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.showers
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Showers
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.toilets
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Toilets
              </span>
              <span class="fs-6 fw-bolder col-12">
                <i
                  :class="
                    terrain.sinks
                      ? 'fa-solid fa-circle-check text-success'
                      : 'fa-solid fa-circle-xmark text-danger'
                  "
                  class="fa-lg"
                ></i>
                Sinks
              </span>
            </div>
            <!--end::Stats-->
            <!--end::Body-->
          </div>

          <!--end::Mixed Widget 1-->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TTerrain } from '@/core/helpers/types';
import AddressService from '@/core/services/AddressService';

export default defineComponent({
  name: 'UserPendingLandlord',
  components: {},
  props: {
    terrains: {
      type: Object as () => TTerrain[] | TTerrain,
      required: true,
    },
    col: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      AddressService,
    };
  },
});
</script>
