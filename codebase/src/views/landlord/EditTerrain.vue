<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Edit Terrain</span>
      </h3>
    </div>
    <div v-if="terrain" class="card-body border-top p-9">
      <div class="row mb-6">
        <label
          class="col-4 d-flex align-items-center fs-5 fw-bold mb-2 required"
        >
          Name
        </label>
        <div class="col-8 fv-row">
          <input
            v-model="editTerrain.name"
            type="text"
            name="name"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label
          class="col-4 d-flex align-items-center fs-5 fw-bold mb-2 required"
        >
          Description
        </label>
        <div class="col-8 fv-row">
          <input
            v-model="editTerrain.description"
            type="text"
            name="organization"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="separator separator-content my-10">Address</div>
      <AddressInput
        v-model:street="editTerrain.street"
        v-model:streetNumber="editTerrain.streetNumber"
        v-model:postcode="editTerrain.postcode"
        v-model:province="editTerrain.province"
        v-model:locality="editTerrain.locality"
      />
      <div class="separator separator-content my-10">Extra Details</div>
      <div class="row mb-6">
        <label
          class="col-4 d-flex align-items-center fs-5 fw-bold mb-2 required"
        >
          Max allowed people
        </label>
        <div class="col-8 fv-row">
          <input
            v-model="editTerrain.capacity"
            type="text"
            name="maxPeople"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6">
        <label
          class="col-4 d-flex align-items-center fs-5 fw-bold mb-2 required"
        >
          Hectare
        </label>
        <div class="col-8 fv-row">
          <input
            v-model="editTerrain.hectare"
            type="text"
            name="hectare"
            class="form-control form-control-lg form-control-solid"
          />
        </div>
      </div>
      <div class="row mb-6 d-flex align-items-center">
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          water
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.water"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          Electricity
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.electricity"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          3 Phase Electricity
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.threePhaseElectricity"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          Sanitary Block
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.sanitaryBlock"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          Toilets
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.toilets"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          Showers
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.showers"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
        <label class="col-2 d-flex align-items-center fs-5 fw-bold mb-2">
          Sinks
        </label>
        <div class="col-2 fv-row">
          <input
            v-model="editTerrain.sinks"
            class="form-check-input"
            type="checkbox"
            name="water"
            :false-value="0"
            :true-value="1"
          />
        </div>
      </div>
      <div class="separator separator-content my-10">Images</div>
      <div class="row mb-6">
        <div v-if="editTerrain.images" class="mt-2">
          <div
            v-for="(image, index) of editTerrain.images"
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
      <div class="separator separator-content my-10">Add New Images</div>
      <div class="row mb-6">
        <DropzoneFile @update-images="updateImages" />
      </div>
      <div class="separator separator-content my-10">Your Rating</div>
      <div class="row mb-6">
        <label class="col-4 col-form-label required fw-bold fs-6">
          Supermarket
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="editTerrain.supermarket_rating"
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
            v-model="editTerrain.activities_rating"
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
            v-model="editTerrain.remote_rating"
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
          Bakery Access
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="editTerrain.bakery_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="bakeryRating"
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
          First-aid
        </label>
        <div class="col-8 fv-row">
          <select
            v-model="editTerrain.firstAid_rating"
            class="form-select"
            data-control="select2"
            data-placeholder="Select an option"
            name="firstAidRating"
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
    <div class="card-footer d-flex justify-content-between py-6 px-9">
      <button
        id="kt_account_profile_details_submit"
        type="submit"
        class="btn btn-danger"
        @click="deleteTerrain"
      >
        <span class="indicator-label">Delete Terrain</span>
      </button>
      <div>
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
          @click="submitEditTerrain(editTerrain)"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useTerrains from '@/core/composables/terrain';
import { useRoute } from 'vue-router';
import DropzoneFile from '@/components/Dropzone.vue';
import { TEditTerrain } from '@/core/helpers/types';
import AddressInput from '@/components/landlord/forms/AddressInput.vue';
import ApiService from '@/core/services/ApiService';
import router from '@/router/router';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';

export default defineComponent({
  name: 'EditTerrain',
  components: {
    DropzoneFile,
    AddressInput,
  },
  setup() {
    const { terrain, getLandlordTerrain } = useTerrains();
    const route = useRoute();
    const editTerrain = ref(<TEditTerrain>{});

    const submitEditTerrain = (value) => {
      ApiService.update('landlord/terrain', terrain.value.id, value)
        .then((r) => {
          router.push(`/terrain/${r.data.data.id}`);
        })
        .catch((e) => {
          console.log(e);
          router.push({ name: 'landlordDashboard' });
        });
    };
    const updateImages = (value) => {
      editTerrain.value.newImages = value.value;
    };

    const deleteImage = (value) => {
      editTerrain.value.deleteImages.push(value);
      editTerrain.value.images.splice(
        editTerrain.value.images.findIndex((item) => item.id === value),
        1
      );
    };

    const deleteTerrain = () => {
      ApiService.delete('landlord/terrain', terrain.value.id)
        .then((r) => {
          router.push({ name: 'landlordDashboard' });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    onMounted(async () => {
      setCurrentPageTitle('Edit Terrain');
      await getLandlordTerrain(route.params.id);
      editTerrain.value = { ...terrain.value, newImages: [], deleteImages: [] };
    });
    return {
      terrain,
      editTerrain,
      deleteImage,
      updateImages,
      submitEditTerrain,
      deleteTerrain,
    };
  },
  head: {},
});
</script>
