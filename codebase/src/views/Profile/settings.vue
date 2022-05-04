<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        :validation-schema="profileDetailsValidator"
        @submit="saveChanges1()"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${profileDetails.avatar})`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  title="Remove avatar"
                  @click="removeImage()"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Full Name
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    v-model="profileDetails.name"
                    type="text"
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    v-model="profileDetails.surname"
                    type="text"
                    name="lname"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6">
              Company
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                v-model="profileDetails.company"
                type="text"
                name="company"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                v-model="profileDetails.contactPhone"
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Company Site
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                v-model="profileDetails.companySite"
                type="text"
                name="website"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company website"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="website" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              Communication
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <!--begin::Options-->
              <div class="d-flex align-items-center mt-3">
                <!--begin::Option-->
                <label
                  class="form-check form-check-inline form-check-solid me-5"
                >
                  <input
                    class="form-check-input"
                    name="communication[]"
                    type="checkbox"
                  />
                  <span class="fw-bold ps-2 fs-6">Email</span>
                </label>
                <!--end::Option-->

                <!--begin::Option-->
                <label class="form-check form-check-inline form-check-solid">
                  <input
                    class="form-check-input"
                    name="communication[]"
                    type="checkbox"
                  />
                  <span class="fw-bold ps-2 fs-6">Phone</span>
                </label>
                <!--end::Option-->
              </div>
              <!--end::Options-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            id="kt_account_profile_details_submit"
            ref="submitButton1"
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
        <!--end::Actions-->
      </Form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
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
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-boldest mb-1">Email Address</div>
            <div class="fs-6 fw-bold text-gray-600">support@keenthemes.com</div>
          </div>

          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <!--begin::Form-->
            <Form
              id="kt_signin_change_email"
              class="form"
              novalidate="novalidate"
              :validation-schema="changeEmail"
              @submit="updateEmail()"
            >
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label
                      for="emailaddress"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Enter New Email Address
                    </label>
                    <Field
                      id="emailaddress"
                      type="email"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      placeholder="Email Address"
                      name="emailaddress"
                      value="support@keenthemes.com"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmemailpassword"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="confirmemailpassword"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="confirmemailpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_signin_submit"
                  ref="updateEmailButton"
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
            <!--end::Form-->
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
        <!--end::Email Address-->

        <!--begin::Password-->
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

            <!--begin::Form-->
            <Form
              id="kt_signin_change_password"
              class="form"
              novalidate="novalidate"
              :validation-schema="changePassword"
              @submit="updatePassword()"
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
                      id="currentpassword"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="currentpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="newpassword"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      New Password
                    </label>
                    <Field
                      id="newpassword"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="newpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmpassword"
                      class="form-label fs-6 fw-bolder mb-3"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      id="confirmpassword"
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-bold fs-6"
                      name="confirmpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  ref="updatePasswordButton"
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
            <!--end::Form-->
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
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--begin::Deactivate Account-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-boldest m-0">Delete Account</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_deactivate" class="collapse show">
      <!--begin::Form-->
      <form
        id="kt_account_deactivate_form"
        class="form"
        @submit.prevent="deactivateAccount()"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"
          >
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <inline-svg src="media/icons/duotune/general/gen044.svg" />
            </span>
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-bold">
                <h4 class="text-gray-800 fw-bolder">
                  You Are Deleting Your Account
                </h4>

                <div class="fs-6 text-gray-600">
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password.
                  <br />
                  <a class="fw-bolder" href="#">Learn more</a>
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>

          <!--begin::Form input row-->
          <div class="form-check form-check-solid fv-row">
            <input
              id="deactivate"
              name="deactivate"
              class="form-check-input"
              type="checkbox"
              value=""
            />
            <label class="form-check-label fw-bold ps-2 fs-6" for="deactivate">
              Confirm Account Deletion
            </label>
          </div>
          <!--end::Form input row-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_account_deactivate_account_submit"
            ref="submitButton5"
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
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Deactivate Account-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as Yup from 'yup';

interface ProfileDetails {
  avatar: string;
  name: string;
  surname: string;
  company: string;
  contactPhone: string;
  companySite: string;
}

export default defineComponent({
  name: 'AccountSettings',
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label('First name'),
      lname: Yup.string().required().label('Last name'),
      company: Yup.string().required().label('Company'),
      phone: Yup.string().required().label('Contact phone'),
      website: Yup.string().label('Webside'),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label('Email'),
      confirmemailpassword: Yup.string().required().label('Password'),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label('Current password'),
      newpassword: Yup.string().min(4).required().label('Password'),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
        .label('Password Confirmation'),
    });

    const profileDetails = ref<ProfileDetails>({
      avatar: 'media/avatars/300-1.jpg',
      name: 'Max',
      surname: 'Smith',
      company: 'Keenthemes',
      contactPhone: '044 3276 454 935',
      companySite: 'keenthemes.com',
    });

    const saveChanges1 = () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          submitButton1.value?.removeAttribute('data-kt-indicator');
        }, 2000);
      }
    };

    const saveChanges2 = () => {
      if (submitButton2.value) {
        // Activate indicator
        submitButton2.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          submitButton2.value?.removeAttribute('data-kt-indicator');
        }, 2000);
      }
    };

    const saveChanges3 = () => {
      if (submitButton3.value) {
        // Activate indicator
        submitButton3.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          submitButton3.value?.removeAttribute('data-kt-indicator');
        }, 2000);
      }
    };

    const saveChanges4 = () => {
      if (submitButton4.value) {
        // Activate indicator
        submitButton4.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          submitButton4.value?.removeAttribute('data-kt-indicator');
        }, 2000);
      }
    };

    const deactivateAccount = () => {
      if (submitButton5.value) {
        // Activate indicator
        submitButton5.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          submitButton5.value?.removeAttribute('data-kt-indicator');

          Swal.fire({
            text: 'Email is successfully changed!',
            icon: 'success',
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-light-primary',
            },
          }).then(() => {
            emailFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute('data-kt-indicator');

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute('data-kt-indicator', 'on');

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute('data-kt-indicator');

          Swal.fire({
            text: 'Password is successfully changed!',
            icon: 'success',
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-light-primary',
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const removeImage = () => {
      profileDetails.value.avatar = 'media/avatars/blank.png';
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs('Settings', ['Account']);
    });

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      saveChanges2,
      saveChanges3,
      saveChanges4,
      deactivateAccount,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
    };
  },
});
</script>
