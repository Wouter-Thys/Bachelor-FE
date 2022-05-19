<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Edit Terrain</span>
      </h3>
    </div>
    <div v-if="terrain" class="card-body border-top p-9">
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">Name</label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.name"
            type="text"
            name="name"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Description
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.description"
            type="text"
            name="organization"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="separator separator-content my-10">Address</div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Street name</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.street"
            type="text"
            name="street"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Street number</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.streetNumber"
            type="text"
            name="streetNumber"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Province</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.province"
            type="text"
            name="street"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Locality</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.locality"
            type="text"
            name="street"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Postal Code</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.postcode"
            type="text"
            name="street"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="separator separator-content my-10">Extra Details</div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Max allowed people</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.max_people"
            type="text"
            name="maxPeople"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label fw-bold fs-6">
          <span class="required">Hectare</span>
        </label>
        <div class="col-8 fv-row">
          <input
            :value="terrain.hectare"
            type="text"
            name="hectare"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6 d-flex align-items-center">
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">water</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.water"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">Electricity</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.electricity"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">3 Phase Electricity</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.threePhaseElectricity"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">Sanitary Block</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.sanitaryBlock"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">Toilets</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.toilets"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">Showers</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.showers"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
        <label class="col-2 col-form-label fw-bold fs-6">
          <span class="required">Sinks</span>
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="terrain.sinks"
            class="form-check-input"
            type="checkbox"
            name="water"
          />
        </div>
      </div>
      <div class="separator separator-content my-10">Images</div>
      <div class="row mb-6">
        <div>
          <button class="btn btn-primary">
            <i class="fa-solid fa-image"></i>
            Add Image
          </button>
        </div>
      </div>
      <div class="row mb-6">
        <div v-if="terrain.images" class="mt-2">
          <div
            v-for="(image, index) of terrain.images"
            :key="index"
            class="image-input image-input-outline bg-white m-2"
            data-kt-image-input="true"
          >
            <div
              class="image-input-wrapper w-125px h-125px"
              :style="{ 'background-image': 'url(' + image.url + ')' }"
            ></div>
            <span
              class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow border border-danger"
              data-kt-image-input-action="change"
              data-bs-toggle="tooltip"
              data-bs-dismiss="click"
              title="Remove avatar"
              @click="deleteImage(image.id)"
            >
              <i class="bi bi-x fs-2"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="separator separator-content my-10">Your Rating</div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Supermarket
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="terrain.supermarket_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="supermarketRating"
          >
            <option value="1">Further then 45KM</option>
            <option value="2">Between 45-35KM</option>
            <option selected value="3">Between 35-25KM</option>
            <option value="4">Between 25-15KM</option>
            <option value="5">Closer then 15KM</option>
          </select>
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Activities
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="terrain.activities_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="activitiesRating"
          >
            <option value="1">0 Close-By</option>
            <option value="2">1 or 2 semi Close-By</option>
            <option selected value="3">1 - 2 Close-By</option>
            <option value="4">3 Close-By</option>
            <option value="5">4 or more Close-By</option>
          </select>
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">Remote</label>
        <div class="col-8 fv-row">
          <select
            v-model="terrain.remote_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="remoteRating"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option selected value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Wood Access
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="terrain.wood_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="woodRating"
          >
            <option value="1">Very hard</option>
            <option value="2">Hard</option>
            <option selected value="3">Oke</option>
            <option value="4">Easy</option>
            <option value="5">Very easy</option>
          </select>
        </div>
      </div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Playground
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="terrain.playground_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="playgroundRating"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option selected value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <router-link
        to="/landlord/dashboard"
        type="reset"
        class="btn btn-white btn-active-light-primary me-2"
      >
        Discard
      </router-link>
      <button
        id="kt_account_profile_details_submit"
        type="submit"
        class="btn btn-primary"
      >
        <span class="indicator-label">Save Changes</span>
        <span class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useTerrains from '@/core/composables/terrain';
import { useRoute } from 'vue-router';
import apiService from '@/core/services/ApiService';

export default defineComponent({
  name: 'EditTerrain',
  components: {},
  setup() {
    const { terrain, getTerrain } = useTerrains();
    const route = useRoute();

    const deleteImage = (value) => {
      apiService
        .delete('landlord/terrain/images', value)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(async () => {
      await getTerrain(route.params.id);
      console.log(terrain.value);
    });
    return {
      terrain,
      deleteImage,
    };
  },
  head: {},
});
</script>
