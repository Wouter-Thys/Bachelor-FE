<template>
  <div class="card bg-transparent">
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

            <div class="col-7 border-end">
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
                <div class="col-12">
                  <TerrainRatingChart
                    :remote-rating="4"
                    :wood-rating="1"
                    :playground-rating="5"
                    :supermarket-rating="3"
                    :activities-rating="2"
                  />
                </div>
              </div>
              {{ terrain }}
            </div>
            <div class="col-4">
              {{ terrain.owner }}
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
  name: 'AddNewTerrain',
  components: {
    TerrainRatingChart,
  },
  setup() {
    const { terrain, getTerrain } = useTerrains();
    const route = useRoute();
    const selectedImage = ref<String>();
    const selectImage = (url) => {
      selectedImage.value = url;
    };
    const nextImage = (value) => {
      let index = terrain.value.images.findIndex((x) => x.url === value) + 1;
      if (index === terrain.value.images.length) {
        index = 0;
      }
      selectedImage.value = terrain.value.images[index].url;
    };
    const prevImage = (value) => {
      let index = terrain.value.images.findIndex((x) => x.url === value) - 1;
      if (index === -1) {
        index = terrain.value.images.length - 1;
      }
      selectedImage.value = terrain.value.images[index].url;
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
