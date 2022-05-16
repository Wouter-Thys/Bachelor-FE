<template>
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
                style="height: 500px; width: 750px"
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
            <div class="col-12 d-flex justify-content-center">
              <img
                v-for="(img, index) in terrain.images"
                :key="index"
                class="m-2 cursor-pointer img-fluid"
                :src="img.croppedUrl"
                alt=""
                @click="selectImage(img.url)"
              />
            </div>

            <div class="col-8 border-end">
              <div class="row mt-8 ms-8">
                <div class="col-12">
                  <span class="fs-1 text-gray-800 fw-bolder">
                    {{ terrain.name }}
                  </span>
                </div>
                <div class="col-12">
                  <span class="fs-6 fw-bolder me-1">
                    <i class="fa-solid fa-users"></i>
                    {{ terrain.max_people }}
                  </span>
                  <span class="fs-6 fw-bolder">
                    <i class="fa-solid fa-mountain"></i>
                    {{ terrain.hectare }}

                    <span class="fs-8">ha.</span>
                  </span>
                </div>
                <div class="col-12 separator my-8"></div>
                <div class="col-8">
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

                    <li v-if="terrain.showers" class="list-group-item border-0">
                      <span class="fs-6 fw-bolder">
                        <i
                          class="fa-solid fa-circle-check text-success fa-lg"
                        ></i>
                        Showers
                      </span>
                    </li>

                    <li v-if="terrain.toilets" class="list-group-item border-0">
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
                    terrain.wood_rating &&
                    terrain.playground_rating &&
                    terrain.supermarket_rating &&
                    terrain.activities_rating
                  "
                  class="col-12"
                >
                  <TerrainRatingChart
                    :remote-rating="terrain.remote_rating"
                    :wood-rating="terrain.wood_rating"
                    :playground-rating="terrain.playground_rating"
                    :supermarket-rating="terrain.supermarket_rating"
                    :activities-rating="terrain.activities_rating"
                  />
                </div>
                <div class="col-12">
                  <span class="fs-4">Legende</span>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-3">
                      <p class="fs-6 text-muted p-0 m-0">supermarket:</p>
                      <p class="fs-6 text-muted p-0 m-0">
                        1 = Further then 45KM
                      </p>
                      <p class="fs-6 text-muted p-0 m-0">2 = Between 45-35KM</p>
                      <p class="fs-6 text-muted p-0 m-0">3 = Between 35-25KM</p>
                      <p class="fs-6 text-muted p-0 m-0">4 = Between 25-15KM</p>
                      <p class="fs-6 text-muted p-0 m-0">
                        5 = Closer then 15KM
                      </p>
                    </div>
                    <div class="col-4">
                      <p class="fs-6 text-muted p-0 m-0">Activities:</p>
                      <p class="fs-6 text-muted p-0 m-0">1 = 0 Close-By</p>
                      <p class="fs-6 text-muted p-0 m-0">
                        2 = 1 or 2 semi Close-By
                      </p>
                      <p class="fs-6 text-muted p-0 m-0">3 = 1 - 2 Close-By</p>
                      <p class="fs-6 text-muted p-0 m-0">4 = 3 Close-By</p>
                      <p class="fs-6 text-muted p-0 m-0">
                        5 = 4 or more Close-By
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="fs-6 text-muted p-0 m-0">Remote:</p>
                      <p class="fs-6 text-muted p-0 m-0">1</p>
                      <p class="fs-6 text-muted p-0 m-0">2</p>
                      <p class="fs-6 text-muted p-0 m-0">3</p>
                      <p class="fs-6 text-muted p-0 m-0">4</p>
                      <p class="fs-6 text-muted p-0 m-0">5</p>
                    </div>
                    <div class="col-2">
                      <p class="fs-6 text-muted p-0 m-0">Wood access:</p>
                      <p class="fs-6 text-muted p-0 m-0">1 = Very hard</p>
                      <p class="fs-6 text-muted p-0 m-0">2 = Hard</p>
                      <p class="fs-6 text-muted p-0 m-0">3 = Oke</p>
                      <p class="fs-6 text-muted p-0 m-0">4 = Easy</p>
                      <p class="fs-6 text-muted p-0 m-0">5 = Very easy</p>
                    </div>
                    <div class="col-4 mt-3">
                      <p class="fs-6 text-muted p-0 m-0">Playground access:</p>
                      <p class="fs-6 text-muted p-0 m-0">1 = Very hard</p>
                      <p class="fs-6 text-muted p-0 m-0">2 = Hard</p>
                      <p class="fs-6 text-muted p-0 m-0">3 = Oke</p>
                      <p class="fs-6 text-muted p-0 m-0">4 = Easy</p>
                      <p class="fs-6 text-muted p-0 m-0">5 = Very easy</p>
                    </div>
                  </div>
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
                <div class="col-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useTerrains from '@/core/composables/terrain';
import TerrainRatingChart from '@/custom_components/terrain/TerrainRatingChart.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Terrain',
  components: {
    TerrainRatingChart,
  },
  setup() {
    const { terrain, getTerrain } = useTerrains();
    const route = useRoute();
    const selectedImage = ref<String>();
    const index = ref(0);

    const selectImage = (url) => {
      selectedImage.value = url;
    };

    const nextImage = (value) => {
      index.value++;
      index.value =
        index.value === terrain.value.images.length ? 0 : index.value;
      selectedImage.value = terrain.value.images[index.value].url;
    };

    const prevImage = (value) => {
      index.value--;
      index.value =
        index.value === -1 ? terrain.value.images.length - 1 : index.value;
      selectedImage.value = terrain.value.images[index.value].url;
    };

    onMounted(async () => {
      await getTerrain(route.params.id);
      selectedImage.value = terrain.value.images[0].url;
    });
    return {
      terrain,
      selectedImage,
      selectImage,
      nextImage,
      prevImage,
    };
  },
});
</script>
