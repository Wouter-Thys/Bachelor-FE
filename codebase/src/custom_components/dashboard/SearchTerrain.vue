<template>
  <div>
    <div class="row">
      <div class="col-8">
        <div class="input-group mb-5 col-8">
          <span id="basic-addon1" class="input-group-text">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            v-model="extraSettings.search"
            type="text"
            class="form-control"
            placeholder="Enter postal code or province..."
          />
        </div>
      </div>
      <div class="col-4">
        <button class="btn btn-primary" @click="extraSettingsDropFN">
          <i class="fa-solid fa-filter"></i>
          Filter
          <span class="ms-2">
            <i
              :class="
                dropdown ? 'fa-solid fa-angle-up' : 'fa-solid fa-chevron-down'
              "
            ></i>
          </span>
        </button>
      </div>
      <div v-if="dropdown" class="row">
        <div class="card my-2">
          <div class="my-2 d-flex flex-wrap justify-content-center">
            <div class="d-flex m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESWater"
              >
                Water
              </label>
              <input
                id="ESWater"
                v-model="extraSettings.water"
                class="form-check-input"
                type="checkbox"
                name="water"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESElectricity"
              >
                Electricity
              </label>
              <input
                id="ESElectricity"
                v-model="extraSettings.electricity"
                class="form-check-input"
                type="checkbox"
                name="electricity"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESThreePhaseElectricity"
              >
                3 Phase Electricity
              </label>
              <input
                id="ESThreePhaseElectricity"
                v-model="extraSettings.threePhaseElectricity"
                class="form-check-input"
                type="checkbox"
                name="threePhaseElectricity"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESSanitaryBlock"
              >
                Sanitary Block
              </label>
              <input
                id="ESSanitaryBlock"
                v-model="extraSettings.sanitaryBlock"
                class="form-check-input"
                type="checkbox"
                name="sanitaryBlock"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESToilets"
              >
                Toilets
              </label>
              <input
                id="ESToilets"
                v-model="extraSettings.toilets"
                class="form-check-input"
                type="checkbox"
                name="toilets"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESShowers"
              >
                Showers
              </label>
              <input
                id="ESShowers"
                v-model="extraSettings.showers"
                class="form-check-input"
                type="checkbox"
                name="showers"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex justify-content-start m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2"
                for="ESSinks"
              >
                Sinks
              </label>
              <input
                id="ESShowers"
                v-model="extraSettings.sinks"
                class="form-check-input"
                type="checkbox"
                name="sinks"
                :false-value="0"
                :true-value="1"
              />
            </div>
            <div class="d-flex m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 w-100"
                for="ESSinks"
              >
                Group size
              </label>
              <input
                id="ESShowers"
                v-model="extraSettings.max_people"
                class="form-control"
                type="number"
                name="maxPeople"
              />
            </div>
            <div class="d-flex m-2">
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 w-100"
                for="ESSinks"
              >
                Hectare
              </label>
              <input
                id="ESShowers"
                v-model="extraSettings.hectare"
                class="form-control"
                type="number"
                name="maxPeople"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { extraSettingsSearch } from '@/core/helpers/types';
import _ from 'lodash';

export default defineComponent({
  name: 'UseDropzoneDemo',
  components: {},
  emits: ['searchByMap', 'searchTerrain'],
  setup(props, context) {
    const dropdown = ref(false);
    const extraSettings = ref<extraSettingsSearch>({
      water: 0,
      electricity: 0,
      threePhaseElectricity: 0,
      sanitaryBlock: 0,
      showers: 0,
      toilets: 0,
      sinks: 0,
      max_people: 0,
      hectare: 0,
      search: '',
    });
    const extraSettingsDropFN = () => {
      dropdown.value = !dropdown.value;
    };
    const debounceInput = _.debounce(function (e) {
      context.emit('searchTerrain', e);
    }, 500);

    watch(extraSettings.value, (newValue) => {
      debounceInput(newValue);
    });
    return { extraSettingsDropFN, dropdown, extraSettings, debounceInput };
  },
});
</script>
