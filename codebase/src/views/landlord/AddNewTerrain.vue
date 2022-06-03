<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Add New Terrain</span>
      </h3>
    </div>
    <div class="card-body py-lg-10 px-lg-10">
      <div
        ref="createAppRef"
        class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
      >
        <div
          class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
        >
          <div class="stepper-nav ps-lg-10">
            <div class="stepper-item current" data-kt-stepper-element="nav">
              <div class="stepper-line w-40px"></div>
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">1</span>
              </div>
              <div class="stepper-label">
                <h3 class="stepper-title">Details</h3>
                <div class="stepper-desc">Details about your terrain</div>
              </div>
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
              <div class="stepper-line w-40px"></div>
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">2</span>
              </div>
              <div class="stepper-label">
                <h3 class="stepper-title">Extra details</h3>
                <div class="stepper-desc">Extra details about your terrain</div>
              </div>
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
              <div class="stepper-line w-40px"></div>
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">3</span>
              </div>
              <div class="stepper-label">
                <h3 class="stepper-title">Images</h3>
                <div class="stepper-desc">
                  Add images to show off your terrain
                </div>
              </div>
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
              <div class="stepper-line w-40px"></div>
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">4</span>
              </div>
              <div class="stepper-label">
                <h3 class="stepper-title">Rating</h3>
                <div class="stepper-desc">
                  Give your rating for this terrain
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row-fluid py-lg-5 px-lg-15">
          <form class="form" novalidate="novalidate" @submit="handleStep">
            <div class="current" data-kt-stepper-element="content">
              <div class="w-100">
                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                    <span class="required">Name</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="name"
                    placeholder="Name..."
                  />
                </div>
                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                    <span class="">Description</span>
                  </label>
                  <input
                    v-model="formData.description"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="description"
                    placeholder="Description..."
                  />
                </div>
                <addressInput
                  v-model:street="formData.street"
                  v-model:streetNumber="formData.streetNumber"
                  v-model:postcode="formData.postcode"
                  v-model:province="formData.province"
                  v-model:locality="formData.locality"
                />
                <div id="map"></div>
              </div>
            </div>
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="fv-row">
                  <div class="row mb-2">
                    <div class="col-2">
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="me-2">Water</span>
                      </label>
                    </div>
                    <div class="col-2">
                      <input
                        v-model="formData.water"
                        class="form-check-input"
                        type="checkbox"
                        name="water"
                        :value="true"
                      />
                    </div>
                    <div class="col-2">
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="me-2">Electricity</span>
                      </label>
                    </div>
                    <div class="col-2">
                      <input
                        v-model="formData.electricity"
                        class="form-check-input"
                        type="checkbox"
                        name="electricity"
                        :value="true"
                      />
                    </div>
                    <div class="col-2">
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="me-2">3-phase Electricity</span>
                      </label>
                    </div>
                    <div class="col-2">
                      <input
                        v-model="formData.threePhaseElectricity"
                        class="form-check-input"
                        type="checkbox"
                        name="threePhaseElectricity"
                        :value="true"
                      />
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-2">
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="me-2">sanitary block</span>
                      </label>
                    </div>
                    <div class="col-2">
                      <input
                        v-model="formData.sanitaryBlock"
                        class="form-check-input"
                        type="checkbox"
                        name="sanitaryBlock"
                        :value="true"
                        @click="checkSanitaryBlock($event)"
                      />
                    </div>
                    <div
                      v-if="!hiddenSanitaryOptions"
                      class="row mb-2 border border-2 rounded p-4 align-middle"
                    >
                      <div class="col-2">
                        <label
                          class="d-flex align-items-center fs-5 fw-bold mb-2"
                        >
                          <span class="me-2">Showers</span>
                        </label>
                      </div>
                      <div class="col-2">
                        <input
                          v-model="formData.showers"
                          class="form-check-input"
                          type="checkbox"
                          name="showers"
                          :value="true"
                        />
                      </div>
                      <div class="col-2">
                        <label
                          class="d-flex align-items-center fs-5 fw-bold mb-2"
                        >
                          <span class="me-2">Toilets</span>
                        </label>
                      </div>
                      <div class="col-2">
                        <input
                          v-model="formData.toilets"
                          class="form-check-input"
                          type="checkbox"
                          name="toilets"
                          :value="true"
                        />
                      </div>

                      <div class="col-2">
                        <label
                          class="d-flex align-items-center fs-5 fw-bold mb-2"
                        >
                          <span class="me-2">Sinks</span>
                        </label>
                      </div>
                      <div class="col-2">
                        <input
                          v-model="formData.sinks"
                          class="form-check-input"
                          type="checkbox"
                          name="sinks"
                          :value="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-10">
                  <div class="col-2">
                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                      <span class="me-2">Max allowed people</span>
                    </label>
                  </div>
                  <div class="col-2">
                    <input
                      v-model="formData.capacity"
                      class="form-control form-control-solid el-input-number"
                      type="number"
                      name="capacity"
                    />
                  </div>
                </div>

                <div class="row mt-2">
                  <div class="col-2">
                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                      <span class="me-2">Hectare</span>
                    </label>
                  </div>
                  <div class="col-2">
                    <input
                      v-model="formData.hectare"
                      class="form-control form-control-solid el-input-number"
                      type="number"
                      name="hectare"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="fv-row">
                  <DropzoneFiles @update-images="updateImages" />
                </div>
              </div>
            </div>
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="row">
                  <div class="col-12">
                    <h1 class="d-flex align-items-center fw-bold mb-2">
                      Rate the terrain on how far things are
                    </h1>
                    <p>Rate your terrain!</p>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4 jumbotron d-flex align-items-center">
                        <label class="fs-5 fw-bold mb-2">
                          Supermarket
                          <p class="text-muted fs-7">
                            How far away is the closes supermarket
                          </p>
                        </label>
                      </div>
                      <div class="col-4 my-2">
                        <select
                          v-model="formData.supermarket_rating"
                          class="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          name="supermarket_rating"
                        >
                          <option value="1">Further then 20KM</option>
                          <option value="2">Between 20-15KM</option>
                          <option selected value="3">Between 15-10KM</option>
                          <option value="4">Between 10-5KM</option>
                          <option value="5">Closer then 5KM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4 jumbotron d-flex align-items-center">
                        <label class="fs-5 fw-bold mb-2">
                          Activities
                          <p class="text-muted fs-7">
                            Zoo's, Theme Parks, Paintball, Forest walks...
                          </p>
                        </label>
                      </div>
                      <div
                        class="col-4 my-2 jumbotron d-flex align-items-center"
                      >
                        <select
                          v-model="formData.activities_rating"
                          class="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          name="activities_rating"
                        >
                          <option value="1">Further then 2KM</option>
                          <option value="2">Between 2-1.5KM</option>
                          <option selected value="3">Between 1.5-1KM</option>
                          <option value="4">Between 1-0.5KM</option>
                          <option value="5">Closer then 0.5KM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4 jumbotron d-flex align-items-center">
                        <label class="fs-5 fw-bold mb-2">
                          Remote
                          <p class="text-muted fs-7">Closest town hall</p>
                        </label>
                      </div>
                      <div
                        class="col-4 my-2 jumbotron d-flex align-items-center"
                      >
                        <select
                          v-model="formData.remote_rating"
                          class="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          name="remote_rating"
                        >
                          <option value="1">Closer then 5KM</option>
                          <option value="2">Between 10-5KM</option>
                          <option selected value="3">Between 15-10KM</option>
                          <option value="4">Between 20-15KM</option>
                          <option value="5">Further then 20KM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4 jumbotron d-flex align-items-center">
                        <label class="fs-5 fw-bold mb-2">
                          Bakery Access
                          <p class="text-muted fs-7">closest bakery</p>
                        </label>
                      </div>
                      <div class="col-4 my-2">
                        <select
                          v-model="formData.bakery_rating"
                          class="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          name="bakery_rating"
                        >
                          <option value="1">Further then 25KM</option>
                          <option value="2">Between 25-20KM</option>
                          <option selected value="3">Between 20-15KM</option>
                          <option value="4">Between 15-10KM</option>
                          <option value="5">Closer then 10KM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4 jumbotron d-flex align-items-center">
                        <label class="fs-5 fw-bold mb-2">
                          First-aid
                          <p class="text-muted fs-7">
                            How easy is it to play on a terrain or forrest
                          </p>
                        </label>
                      </div>
                      <div class="col-4 my-2">
                        <select
                          v-model="formData.firstAid_rating"
                          class="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          name="firstAid_rating"
                        >
                          <option value="1">Further then 20KM</option>
                          <option value="2">Between 20-15KM</option>
                          <option selected value="3">Between 15-10KM</option>
                          <option value="4">Between 10-5KM</option>
                          <option value="5">Closer then 5KM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-stack pt-10">
              <div class="me-2">
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  data-kt-stepper-action="previous"
                  @click="previousStep()"
                >
                  <i class="fas fa-arrow-left"></i>
                  Back
                </button>
              </div>
              <div>
                <button
                  v-if="currentStepIndex === totalSteps - 1"
                  type="submit"
                  class="btn btn-lg btn-primary"
                  @click="formSubmit(formData)"
                >
                  <span v-if="!loading" class="indicator-label">
                    Create
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span v-else class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>

                <button
                  v-else-if="!loading"
                  type="submit"
                  class="btn btn-lg btn-primary"
                >
                  Continue
                  <i class="fas fa-arrow-right"></i>
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-primary d-flex align-items-center"
                >
                  <span class="">Please wait...</span>
                  <i class="fa-solid fa-circle-notch fa-spin"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { StepperComponent } from '@/assets/ts/components/_StepperComponent';
import { useForm } from 'vee-validate';
import { getIllustrationsPath } from '@/core/helpers/assets';
import addressInput from '@/custom_components/landlord/forms/AddressInput.vue';
import DropzoneFiles from '@/custom_components/Dropzone.vue';
import ApiService from '@/core/services/ApiService';
import router from '@/router/router';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';

interface Step1 {
  name: string;
  description: string;
  street: string;
  streetNumber: string;
  province: string;
  state: string;
  postal_code: string;
}
interface Step2 {
  water: boolean;
  electricity: boolean;
  threePhaseElectricity: boolean;
  sanitaryBlock: boolean;
  showers: boolean;
  toilets: boolean;
  sinks: boolean;
  capacity: number;
  hectare: number;
}
interface Step3 {
  supermarket_rating: number;
  activities_rating: number;
  remote_rating: number;
  bakery_rating: number;
  firstAid_rating: number;
}

export default defineComponent({
  name: 'AddNewTerrain',
  components: {
    addressInput,
    DropzoneFiles,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAppRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const hiddenSanitaryOptions = ref<boolean>(true);
    const formData = ref({
      name: '',
      description: '',
      street: '',
      streetNumber: '',
      postcode: '',
      province: '',
      locality: '',
      water: false,
      electricity: false,
      threePhaseElectricity: false,
      sanitaryBlock: false,
      showers: false,
      toilets: false,
      sinks: false,
      capacity: 0,
      hectare: 0,
      supermarket_rating: 1,
      activities_rating: 1,
      remote_rating: 1,
      bakery_rating: 1,
      firstAid_rating: 1,
      images: [],
    });

    onMounted(async () => {
      setCurrentPageTitle('Add New Terrain');
      _stepperObj.value = StepperComponent.createInsance(
        createAppRef.value as HTMLElement
      );
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { handleSubmit } = useForm<Step1 | Step2 | Step3>();

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }
      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async (params) => {
      loading.value = true;
      await ApiService.post('/landlord/terrain', params)
        .then(() => {
          loading.value = false;
          router.push({ name: 'landlordDashboard' });
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
    };

    const checkSanitaryBlock = (event) => {
      console.log(event);
      if (event.target.checked) {
        hiddenSanitaryOptions.value = false;
      }
      if (!event.target.checked) {
        hiddenSanitaryOptions.value = true;
      }
    };
    const updateImages = (value) => {
      formData.value.images = value.value;
    };

    const handleStep = handleSubmit((values) => {
      formData.value = {
        ...formData.value,
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    return {
      loading,
      hiddenSanitaryOptions,
      checkSanitaryBlock,
      formData,
      handleStep,
      previousStep,
      createAppRef,
      currentStepIndex,
      totalSteps,
      getIllustrationsPath,
      formSubmit,
      updateImages,
    };
  },
  head: {},
});
</script>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style>
