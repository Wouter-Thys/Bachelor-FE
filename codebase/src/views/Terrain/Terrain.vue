<template>
  <div>
    <div class="card bg-transparent pb-5">
      <div class="card-body rounded-top py-0 px-3">
        <div class="row">
          <div
            class="col-12 px-0 rounded"
            style="background-color: rgba(0, 0, 0, 0.7)"
          >
            <div class="row d-flex justify-content-between">
              <div
                class="col-2 d-flex justify-content-center cursor-pointer"
                @click="prevImage(selectedImage)"
              >
                <span
                  class="carousel-control-prev-icon align-self-center"
                  aria-hidden="true"
                ></span>
              </div>
              <div class="col-8 d-flex justify-content-center">
                <img
                  :src="selectedImage"
                  alt=""
                  class=""
                  style="object-fit: cover; height: 500px; width: 750px"
                />
              </div>
              <div
                class="col-2 d-flex justify-content-center cursor-pointer"
                @click="nextImage(selectedImage)"
              >
                <span
                  class="carousel-control-next-icon align-self-center"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
          </div>

          <div class="col-12 px-0 bg-white">
            <div class="row d-flex justify-content-between">
              <div
                v-if="imagesChunks"
                :data-bs-target="'#kt_carousel_1_carousel'"
                class="col-1 d-flex align-items-center justify-content-end btn-light pulse pulse-white bg-transparent shadow-none cursor-pointer"
                data-bs-slide="prev"
              >
                <span
                  v-if="imagesChunks.length > 1"
                  class="carousel-control-prev-icon btn btn-icon btn-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
                <span class="pulse-ring"></span>
              </div>
              <div
                v-if="imagesChunks"
                class="col-10 d-flex justify-content-center"
              >
                <div
                  id="kt_carousel_1_carousel"
                  class="carousel carousel-custom slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner" role="listbox">
                    <div
                      v-for="(chunk, indexChunks) in imagesChunks"
                      :key="indexChunks"
                      class="carousel-item"
                      :class="indexChunks === 0 ? 'active' : ''"
                    >
                      <div class="d-flex justify-content-center">
                        <div
                          v-for="(img, index) in chunk"
                          :key="indexChunks + index"
                          class=""
                        >
                          <img
                            class="m-2 cursor-pointer"
                            :src="img.croppedUrl"
                            alt=""
                            @click="selectImage(img.url)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="imagesChunks"
                class="col-1 d-flex align-items-center justify-content-start btn-light pulse pulse-white bg-transparent shadow-none cursor-pointer"
                :data-bs-target="'#kt_carousel_1_carousel'"
                data-bs-slide="next"
              >
                <span
                  v-if="imagesChunks.length > 1"
                  class="carousel-control-next-icon btn btn-icon btn-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span class="pulse-ring"></span>
                <span class="sr-only">Next</span>
              </div>

              <div class="col-12 separator my-2"></div>
              <div class="col-8 border-end">
                <div class="row mt-8 ms-8">
                  <div class="col-12 d-flex justify-content-between">
                    <span class="fs-1 text-gray-800 fw-bolder">
                      {{ terrain.name }}
                    </span>
                    <div v-if="terrain.owner">
                      <div
                        v-if="user.id === terrain.owner.id"
                        class="btn btn-primary"
                      >
                        <router-link
                          :to="'/landlord/edit-terrain/' + terrain.id"
                          class="text-white"
                        >
                          Edit Terrain
                        </router-link>
                      </div>
                      <div v-else>
                        <div v-if="isAuthenticated">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_rent_terrain"
                          >
                            Rent Terrain
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <span class="fs-6 fw-bolder text-gray-600">
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
                    <div>
                      <span class="fs-6 fw-bolder me-1">
                        <i class="fa-solid fa-users"></i>
                        {{ terrain.capacity }}
                      </span>
                      <span class="fs-6 fw-bolder">
                        <i class="fa-solid fa-mountain"></i>
                        {{ terrain.hectare }}

                        <span class="fs-8">ha.</span>
                      </span>
                    </div>
                  </div>
                  <div class="col-12 separator my-8"></div>
                  <div class="col-8" style="min-height: 200px">
                    <span class="fs-4 text-gray-600 me-1">
                      {{ terrain.description }}
                    </span>
                  </div>
                  <div class="col-4">
                    <ul class="list-group">
                      <li v-if="terrain.water" class="list-group-item border-0">
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          Water
                        </span>
                      </li>

                      <li
                        v-if="terrain.electricity"
                        class="list-group-item border-0"
                      >
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          Electricity
                        </span>
                      </li>

                      <li
                        v-if="terrain.threePhaseElectricity"
                        class="list-group-item border-0"
                      >
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          3 Phase Electricity
                        </span>
                      </li>

                      <li
                        v-if="terrain.sanitaryBlock"
                        class="list-group-item border-0"
                      >
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          Sanitary Block
                        </span>
                      </li>

                      <li
                        v-if="terrain.showers"
                        class="list-group-item border-0"
                      >
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          Showers
                        </span>
                      </li>

                      <li
                        v-if="terrain.toilets"
                        class="list-group-item border-0"
                      >
                        <span class="fs-6 fw-bolder">
                          <i class="fa-solid fa-circle-check text-success"></i>
                          Toilets
                        </span>
                      </li>

                      <li v-if="terrain.sinks" class="list-group-item border-0">
                        <span class="fs-6 fw-bolder">
                          <i
                            class="fa-solid fa-circle-check text-success fa-lg"
                          ></i>
                          Sinks
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 separator mt-8"></div>
                  <div
                    v-if="
                      terrain.remote_rating &&
                      terrain.bakery_rating &&
                      terrain.firstAid_rating &&
                      terrain.supermarket_rating &&
                      terrain.activities_rating &&
                      terrain.google_activities_rating &&
                      terrain.google_supermarket_rating &&
                      terrain.google_firstAid_rating &&
                      terrain.google_bakery_rating &&
                      terrain.google_remote_rating
                    "
                    class="col-12"
                  >
                    <TerrainRatingChart
                      :remote-rating="terrain.remote_rating"
                      :bakery-rating="terrain.bakery_rating"
                      :first-aid-rating="terrain.firstAid_rating"
                      :supermarket-rating="terrain.supermarket_rating"
                      :activities-rating="terrain.activities_rating"
                      :google-remote-rating="terrain.google_remote_rating"
                      :google-bakery-rating="terrain.google_bakery_rating"
                      :google-first-aid-rating="terrain.google_firstAid_rating"
                      :google-supermarket-rating="
                        terrain.google_supermarket_rating
                      "
                      :google-activities-rating="
                        terrain.google_activities_rating
                      "
                    />
                  </div>
                  <div class="col-12 separator mt-8"></div>
                  <div class="col-12 my-4 pe-6">
                    <GoogleMap
                      :markers="markers"
                      :center="center"
                      :zoom="14"
                      :style="{ height: '300px' }"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div v-if="terrain.owner" class="col-12">
                    <div class="d-flex justify-content-center mt-8">
                      <div
                        class="rounded-circle bg-info text-white d-flex justify-content-center"
                        style="width: 150px; height: 150px"
                      >
                        <span style="font-size: 100px">
                          {{ terrain.owner.name.substring(0, 1) }}
                        </span>
                      </div>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                      <p class="fs-1 m-0 p-0">{{ terrain.owner.name }}</p>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                      <p class="fs-5 m-0 p-0 text-muted fw-bold">
                        {{ terrain.owner.email }}
                      </p>
                    </div>
                    <div class="w-100 d-flex justify-content-center mt-2">
                      <span
                        v-for="(role, index) in terrain.owner.roles"
                        :key="index"
                        class="btn btn-sm btn-light-primary fw-bolder me-1 fs-8 py-1 px-3"
                      >
                        {{ role }}
                      </span>
                    </div>
                    <div class="d-flex flex-wrap fw-bold fs-6 mt-8 pe-2">
                      <span class="text-black-50 w-100 me-1 py-1 px-3">
                        <i class="fa-solid fa-sitemap"></i>
                        {{ terrain.owner.organization }}
                      </span>
                      <span
                        v-if="terrain.owner.phone_number"
                        class="text-black-50 me-1 py-1 px-3"
                      >
                        <i class="fa-solid fa-phone"></i>
                        {{ terrain.owner.phone_number }}
                        <span
                          v-if="terrain.owner.phone_number_verified_at"
                          class="btn btn-sm btn-light-success fw-bolder me-1 fs-8 py-1 px-3"
                        >
                          Verified
                        </span>
                        <span
                          v-if="!terrain.owner.phone_number_verified_at"
                          class="btn btn-sm btn-light-danger fw-bolder me-1 fs-8 py-1 px-3"
                        >
                          Not Verified
                        </span>
                      </span>
                      <span class="text-black-50 me-1 py-1 px-3">
                        <i class="fa-solid fa-envelope"></i>
                        {{ terrain.owner.email }}
                        <span
                          v-if="terrain.owner.email_verified_at"
                          class="btn btn-sm btn-light-success fw-bolder me-1 fs-8 py-1 px-3"
                        >
                          Verified
                        </span>
                        <span
                          v-if="!terrain.owner.email_verified_at"
                          class="btn btn-sm btn-light-danger fw-bolder me-1 fs-8 py-1 px-3"
                        >
                          Not Verified
                        </span>
                      </span>
                    </div>
                  </div>

                  <div class="col-12 separator mt-8"></div>

                  <div v-if="calOptions" class="col-12">
                    <div class="card p-5 mb-5">
                      <FullCalendar ref="fullCalendar" :options="calOptions" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="kt_modal_rent_terrain" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Rent Terrain</h5>

            <!--begin::Close-->
            <div
              class="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span class="svg-icon svg-icon-2x"></span>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body d-flex justify-content-center">
            <div class="mb-0">
              <label class="form-label">Rent terrain from ... till ...</label>
              <Datepicker
                v-model="date"
                range
                multi-calendars
                inline
                :enable-time-picker="false"
                :min-date="new Date()"
                auto-apply
                :markers="miniCalendarMarkers"
                :disabled-dates="disabledDates"
              ></Datepicker>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="convertDate(date)"
            >
              Rent Terrain
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import useTerrains from '@/core/composables/terrain';
import TerrainRatingChart from '@/custom_components/terrain/TerrainRatingChart.vue';
import { useRoute } from 'vue-router';
import GoogleMap from '@/custom_components/GoogleMap.vue';
import AddressService from '@/core/services/AddressService';
import {
  TCenterGMap,
  TDatePickerMarkers,
  TImages,
  TMarkersGMap,
  TSubmitDate,
} from '@/core/helpers/types';
import _ from 'lodash';
import { User } from '@/store/modules/AuthModule';
import store from '@/store';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import apiService from '@/core/services/ApiService';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import router from '@/router/router';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';

export default defineComponent({
  name: 'Terrain',
  components: {
    TerrainRatingChart,
    GoogleMap,
    Datepicker,
    FullCalendar,
  },
  setup() {
    const { terrain, getTerrain } = useTerrains();
    const route = useRoute();
    const selectedImage = ref<String>();
    const imagesChunks = ref<TImages[][]>();
    const index = ref(0);
    const date = ref({});
    const submitDate = ref<TSubmitDate>({
      startDate: 0,
      endDate: 0,
      terrain_id: terrain.value.id,
    });
    const center = ref<TCenterGMap>({ lat: 50.5039, lng: 4.4699 });
    const markers = ref<TMarkersGMap | null>([
      { position: { lat: 0, lng: 0 }, terrain: null },
    ]);
    const miniCalendarMarkers = ref(<TDatePickerMarkers[]>[]);
    const user: User = store.getters.currentUser;
    const isAuthenticated = store.getters.isUserAuthenticated;

    const selectImage = (url) => {
      selectedImage.value = url;
    };

    const convertDate = async (date: Date[]) => {
      if (date.length === 2) {
        submitDate.value.startDate = date[0].getTime();
        submitDate.value.endDate = date[1].getTime();
        submitDate.value.terrain_id = terrain.value.id;
        // submitRent(submitDate.value);
      }
    };

    const submitRent = (value) => {
      apiService
        .post('user/rent-terrain', value)
        .then((r) => {
          router.push({ name: 'profileOverview' });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const nextImage = () => {
      index.value++;
      index.value =
        index.value === terrain.value.images.length ? 0 : index.value;
      selectedImage.value = terrain.value.images[index.value].url;
    };

    const prevImage = () => {
      index.value--;
      index.value =
        index.value === -1 ? terrain.value.images.length - 1 : index.value;
      selectedImage.value = terrain.value.images[index.value].url;
    };

    const calOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      aspectRatio: 1,
      events: [{}],
    });

    const disabledDates = computed(() => {
      const dates: Date[] = [];
      if (terrain.value.rented_dates) {
        terrain.value.rented_dates.forEach((item) => {
          let incDate = new Date(item.startDate);
          while (incDate <= new Date(item.endDate)) {
            console.log(incDate);
            dates.push(new Date(incDate));
            incDate.setDate(incDate.getDate() + 1);
          }
        });
      }
      console.log(dates);
      return dates;
    });

    onMounted(async () => {
      setCurrentPageTitle('');
      await getTerrain(route.params.id);
      selectedImage.value = terrain.value.images[0].url;
      if (terrain.value.latitude && terrain.value.longitude) {
        center.value.lat = terrain.value.latitude;
        center.value.lng = terrain.value.longitude;
        if (markers.value) {
          markers.value[0].position.lat = terrain.value.latitude;
          markers.value[0].position.lng = terrain.value.longitude;
        }
      } else {
        markers.value = null;
        markers.value = null;
      }
      imagesChunks.value = _.chunk(Object.values(terrain.value.images), 5);

      calOptions.value.events = [];
      terrain.value.rented_dates.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus !== 'rejected') {
          calOptions.value.events.push({
            title: value.user.organization + ' - ' + value.approvalStatus,
            start: value.startDate,
            end: value.endDate,
            color: color,
          });
        }
        let incDate = new Date(value.startDate);
        while (incDate <= new Date(value.endDate)) {
          miniCalendarMarkers.value.push({
            date: new Date(incDate),
            type: 'line',
            color: color,
          });
          incDate.setDate(incDate.getDate() + 1);
        }
      });
    });

    return {
      calOptions,
      user,
      submitRent,
      convertDate,
      date,
      isAuthenticated,
      center,
      markers,
      terrain,
      selectedImage,
      selectImage,
      nextImage,
      prevImage,
      AddressService,
      imagesChunks,
      miniCalendarMarkers,
      disabledDates,
    };
  },
});
</script>
