<template>
  <div class="card mb-5 mb-xl-10">
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Profile Details</h3>
      </div>
    </div>

    <div id="kt_account_profile_details" class="collapse show">
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        :validation-schema="userDetailsValidator"
        @submit="saveUserChanges"
      >
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Name
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                :value="user.name"
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Organization
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                :value="user.organization"
                type="text"
                name="organization"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="organization" />
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span class="required">Phone Number</span>
              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <div class="col-lg-8 fv-row">
              <Field
                :value="user.phone_number"
                type="tel"
                name="phone_number"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone_number" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            Discard
          </button>
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
      </Form>
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-boldest m-0">Sign-in Method</h3>
      </div>
    </div>
    <div id="kt_account_signin_method" class="collapse show">
      <div class="card-body border-top p-9">
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-boldest mb-1">Email Address</div>
            <div class="fs-6 fw-bold text-gray-600">{{ user.email }}</div>
          </div>
          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <Form
              id="kt_signin_change_email"
              class="form"
              novalidate="novalidate"
              :validation-schema="changeEmail"
              @submit="updateEmail"
            >
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label for="email" class="form-label fs-6 fw-bolder mb-3">
                      Enter New Email Address
                    </label>
                    <Field
                      id="email"
                      :value="user.email"
                      type="email"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      placeholder="Email Address"
                      name="email"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="password"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="password"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_signin_submit"
                  type="submit"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label">Update Email</span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_signin_cancel"
                  type="button"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
          <div
            id="kt_signin_email_button"
            :class="{ 'd-none': emailFormDisplay }"
            class="ms-auto"
          >
            <button
              class="btn btn-light fw-boldest px-6"
              @click="emailFormDisplay = !emailFormDisplay"
            >
              Change Email
            </button>
          </div>
        </div>
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-boldest mb-1">Password</div>
            <div class="fs-6 fw-bold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-bold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>
            <Form
              id="kt_signin_change_password"
              class="form"
              novalidate="novalidate"
              :validation-schema="changePassword"
              @submit="updatePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Current Password
                    </label>
                    <Field
                      id="current_password"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="current_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="current_password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="password"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      New Password
                    </label>
                    <Field
                      id="password"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="password_confirmation"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      id="password_confirmation"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="password_confirmation"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password_confirmation" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label">Update Password</span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              class="btn btn-light fw-boldest"
              @click="passwordFormDisplay = !passwordFormDisplay"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_delete_account"
      aria-expanded="true"
      aria-controls="kt_account_delete_account"
    >
      <div class="card-title m-0">
        <h3 class="fw-boldest m-0">Delete Account</h3>
      </div>
    </div>
    <div id="kt_account_delete_account" class="collapse show">
      <Form
        id="kt_account_delete_account_form"
        v-slot="{ errors }"
        class="form"
        :validation-schema="deleteAccountValidator"
        @submit="deleteAccountFn"
      >
        <div class="card-body border-top p-9">
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"
          >
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <inline-svg src="media/icons/duotune/general/gen044.svg" />
            </span>
            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-bold">
                <h4 class="text-gray-800 fw-bolder">
                  You Are Deleting Your Account
                </h4>
              </div>
            </div>
          </div>
          <div class="form-check form-check-solid fv-row">
            <Field
              id="deleteAccount"
              name="deleteAccount"
              class="form-check-input"
              type="checkbox"
              :value="true"
              :class="{ 'is-invalid': errors.deleteAccount }"
            />
            <label
              class="form-check-label fw-bold ps-2 fs-6"
              for="deleteAccount"
            >
              Confirm Account Deletion
            </label>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_account_delete_account_account_submit"
            type="submit"
            class="btn btn-danger fw-bold"
          >
            <span class="indicator-label">Delete Account</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import * as Yup from 'yup';
import ApiService from '@/core/services/ApiService';
import { useStore } from 'vuex';
import { Actions } from '@/store/enums/StoreEnums';
import router from '@/router/router';

export default defineComponent({
  name: 'AccountSettings',
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const deleteAccountValidator = Yup.object().shape({
      deleteAccount: Yup.bool().required(
        'this is required if u want to delete ur account!'
      ),
    });

    const userDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label('Name'),
      organization: Yup.string().required().label('Organization'),
      phone_number: Yup.string().required().label('phone_number'),
    });

    const changeEmail = Yup.object().shape({
      email: Yup.string().required().email().label('Email'),
      password: Yup.string().required().label('Password'),
    });

    const changePassword = Yup.object().shape({
      current_password: Yup.string().required().label('Current password'),
      password: Yup.string().min(8).required().label('Password'),
      password_confirmation: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Password Confirmation'),
    });

    const saveUserChanges = async (data) => {
      await ApiService.update('/user/users', user.value.id, data)
        .then(async (r) => {
          await store.dispatch(Actions.VERIFY_AUTH);
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    };

    const deleteAccountFn = async (data) => {
      if (data.deleteAccount) {
        await ApiService.delete('/user/users', user.value.id)
          .then(async (r) => {
            await store.dispatch(Actions.LOGOUT);
            await router.push({ name: 'sign-in' });
          })
          .catch((e) => {
            console.log(e.response.data.message);
          });
      }
    };

    const updateEmail = async (data) => {
      await ApiService.put('/user/update/email', data)
        .then(async (r) => {
          await store.dispatch(Actions.VERIFY_AUTH);
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    };

    const updatePassword = async (data) => {
      console.log(data);
      await ApiService.put('/user/password', data)
        .then(async (r) => {
          await store.dispatch(Actions.VERIFY_AUTH);
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    };

    const user = computed(() => {
      return store.getters.currentUser;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs('Settings', ['Account']);
    });

    return {
      user,
      saveUserChanges,
      deleteAccountFn,
      emailFormDisplay,
      passwordFormDisplay,
      userDetailsValidator,
      deleteAccountValidator,
      changeEmail,
      changePassword,
      updateEmail,
      updatePassword,
    };
  },
});
</script>
