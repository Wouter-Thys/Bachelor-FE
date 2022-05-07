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
                <h3 class="stepper-title">Frameworks</h3>
                <div class="stepper-desc">Define your app framework</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row-fluid py-lg-5 px-lg-15">
          <Form class="form" novalidate="novalidate" @submit="handleStep">
            <div class="current" data-kt-stepper-element="content">
              <div class="w-100">
                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                    <span class="required">Name</span>
                  </label>
                  <Field
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="name"
                    placeholder="Name..."
                  />
                  <ErrorMessage
                    class="fv-plugins-message-container invalid-feedback"
                    name="name"
                  />
                </div>
                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                    <span class="">Description</span>
                  </label>
                  <Field
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="description"
                    placeholder="Description..."
                  />
                  <ErrorMessage
                    class="fv-plugins-message-container invalid-feedback"
                    name="description"
                  />
                </div>
                <addressInput
                  v-model:street="formData.address.street"
                  v-model:streetNumber="formData.address.streetNumber"
                  v-model:postcode="formData.address.postcode"
                  v-model:administrativeAreaLevel2="
                    formData.address.administrativeAreaLevel2
                  "
                  v-model:locality="formData.address.locality"
                />
              </div>
            </div>
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="fv-row">
                  <label class="d-flex align-items-center fs-5 fw-bold mb-4">
                    <span class="required">Select Framework</span>
                    <i
                      class="fas fa-exclamation-circle ms-2 fs-7"
                      data-bs-toggle="tooltip"
                      title="Specify your apps framework"
                    ></i>
                  </label>
                  <label class="d-flex flex-stack cursor-pointer mb-5">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-warning">
                          <i class="fab fa-html5 text-warning fs-2x"></i>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bolder fs-6">HTML5</span>
                        <span class="fs-7 text-muted">Base Web Projec</span>
                      </span>
                    </span>
                    <span class="form-check form-check-custom form-check-solid">
                      <Field
                        class="form-check-input"
                        type="radio"
                        checked
                        name="framework"
                        value="1"
                      />
                    </span>
                  </label>
                  <label class="d-flex flex-stack cursor-pointer mb-5">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-success">
                          <i class="fab fa-react text-success fs-2x"></i>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bolder fs-6">ReactJS</span>
                        <span class="fs-7 text-muted">
                          Robust and flexible app framework
                        </span>
                      </span>
                    </span>
                    <span class="form-check form-check-custom form-check-solid">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="framework"
                        value="2"
                      />
                    </span>
                  </label>
                  <label class="d-flex flex-stack cursor-pointer mb-5">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-danger">
                          <i class="fab fa-angular text-danger fs-2x"></i>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bolder fs-6">Angular</span>
                        <span class="fs-7 text-muted">
                          Powerful data mangement
                        </span>
                      </span>
                    </span>
                    <span class="form-check form-check-custom form-check-solid">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="framework"
                        value="3"
                      />
                    </span>
                  </label>
                  <label class="d-flex flex-stack cursor-pointer">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-primary">
                          <i class="fab fa-vuejs text-primary fs-2x"></i>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bolder fs-6">Vue</span>
                        <span class="fs-7 text-muted">
                          Lightweight and responsive framework
                        </span>
                      </span>
                    </span>
                    <span class="form-check form-check-custom form-check-solid">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="framework"
                        value="4"
                      />
                    </span>
                  </label>
                  <ErrorMessage
                    class="fv-plugins-message-container invalid-feedback"
                    name="framework"
                  />
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
                  @click="formSubmit()"
                >
                  <span class="indicator-label">
                    Submit
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>

                <button v-else type="submit" class="btn btn-lg btn-primary">
                  Continue
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { StepperComponent } from '@/assets/ts/components/_StepperComponent';
import { useForm } from 'vee-validate';
import { Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { getIllustrationsPath } from '@/core/helpers/assets';
import addressInput from '@/custom_components/landlord/forms/addressInput.vue';

interface Step1 {
  appName: string;
  category: string;
}

interface Step2 {
  framework: string;
}

interface Step3 {
  dbName: string;
  dbType: string;
}

interface Step4 {
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
}

interface KTCreateApp extends Step1, Step2, Step3, Step4 {}

declare let google: any;
export default defineComponent({
  name: 'AddNewTerrain',
  components: {
    Field,
    ErrorMessage,
    addressInput,
  },
  setup(props, context) {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAppRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const formData = ref({
      address: {
        street: '',
        streetNumber: '',
        postcode: '',
        administrativeAreaLevel2: '',
        locality: '',
      },
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createAppRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        name: Yup.string().required().label('Name'),
        street: Yup.string().required().label('Street'),
        city: Yup.string().required().label('City'),
        state: Yup.string().required().label('State'),
        postal_code: Yup.string().required().label('Postal Code'),
      }),
      Yup.object({
        framework: Yup.string().required().label('Framework'),
      }),
      Yup.object({
        dbName: Yup.string().required().label('Database name'),
        dbType: Yup.string().required().label('Database engine'),
      }),
      Yup.object({
        nameOnCard: Yup.string().required().label('Name'),
        cardNumber: Yup.string().required().label('Card Number'),
        cardExpiryMonth: Yup.string().required().label('Expiration Month'),
        cardExpiryYear: Yup.string().required().label('Expiration Year'),
        cardCvv: Yup.string().required().label('CVV'),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2 | Step3 | Step4>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
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
      formData,
      handleStep,
      previousStep,
      createAppRef,
      currentStepIndex,
      totalSteps,
      getIllustrationsPath,
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
