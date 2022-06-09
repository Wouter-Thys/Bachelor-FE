<template>
  <!--begin::Wrapper-->
  <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Heading-->
    <div class="mb-10 text-center">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">Create an Account</h1>
      <!--end::Title-->

      <!--begin::Link-->
      <div class="text-gray-400 fw-bold fs-4">
        Already have an account?

        <router-link to="/sign-in" class="link-primary fw-bolder">
          Sign in here
        </router-link>
      </div>
      <!--end::Link-->
    </div>
    <!--end::Heading-->
    <!--begin::Form-->
    <Form
      id="kt_login_signup_form"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate="novalidate"
      :validation-schema="registration"
      @submit="onSubmitRegister"
    >
      <!--begin::Separator-->
      <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <span class="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>
      <!--end::Separator-->

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col">
          <label class="form-label fw-bolder text-dark fs-6">Name</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder="Name..."
            name="name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bolder text-dark fs-6">Email</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder="Email..."
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bolder text-dark fs-6">Organization</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          placeholder="Organization..."
          name="organization"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>

        <!--begin::Hint-->
        <div class="text-muted">Example: Scouts Beringen-Mijn</div>
        <!--end::Hint-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6">Password</label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder="password..."
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6">
          Confirm Password
        </label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label">Submit</span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Actions } from '@/store/enums/StoreEnums';
import { PasswordMeterComponent } from '@/assets/ts/components';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';

export default defineComponent({
  name: 'SignUp',
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      name: Yup.string().required().label('Name'),
      email: Yup.string().min(4).required().email().label('Email'),
      organization: Yup.string().required().label('Organization'),
      password: Yup.string().required().label('Password'),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Password Confirmation'),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values) => {
      // Clear existing errors
      await store.dispatch(Actions.LOGOUT);

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute('data-kt-indicator', 'on');

      // Send login request
      await store.dispatch(Actions.REGISTER, values);

      const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors[errorName];

      if (!error) {
        Swal.fire({
          text: 'You have successfully logged in!',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn fw-bold btn-light-primary',
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: 'dashboard' });
        });
      } else {
        Swal.fire({
          text: error[0],
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Try again!',
          customClass: {
            confirmButton: 'btn fw-bold btn-light-danger',
          },
        });
      }

      submitButton.value?.removeAttribute('data-kt-indicator');
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };
    const onInvalidSubmit = ({ errors }) => {
      console.log(errors);
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
    };
  },
});
</script>
