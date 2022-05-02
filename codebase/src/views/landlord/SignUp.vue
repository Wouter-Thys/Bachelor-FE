<template>
  <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
    <!--begin::Wrapper-->
    <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1
          v-if="!user.roles.includes('pending-landlord')"
          class="text-dark mb-3"
        >
          Become landlord
        </h1>
        <h1 v-else class="text-dark mb-3">
          Wait for an admin to review your landlord request.
        </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          and start renting out your terrains!
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->
      <!--begin::Separator-->
      <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 w-100"></div>
      </div>
      <!--end::Separator-->

      <h1 class="text-dark mb-3">
        Send us a picture of your face while holding your ID next to your face
      </h1>
      <div class="text-gray-400 fw-bold fs-4">
        Make sure your ID and face is visible in the picture!
      </div>
      <Form
        id="kt_login_signin_form"
        class="form w-100"
        enctype="multipart/form-data"
        :validation-schema="landlordSignUp"
        @submit="onSubmit"
      >
        <div class="fv-row mb-7 mt-7">
          <label class="form-label fw-bolder text-dark fs-6">Image</label>
          <Field
            ref="fileInputRef"
            class="form-control form-control-lg form-control-solid"
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg"
          />
        </div>

        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="image" />
          </div>
        </div>
        <!--begin::Actions-->
        <div class="text-center">
          <button
            v-if="!user.roles.includes('pending-landlord')"
            class="btn btn-lg btn-primary"
            type="submit"
          >
            <span class="indicator-label">Submit</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button v-else disabled class="btn btn-lg btn-primary">
            <span class="indicator-label">Next</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </Form>
      <!--end::Actions-->
    </div>
    <!--end::Wrapper-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { PasswordMeterComponent } from '@/assets/ts/components';
import ApiService from '@/core/services/ApiService';
import { User } from '@/store/modules/AuthModule';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { object, mixed } from 'yup';

export default defineComponent({
  name: 'SignUpLandlord',
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup: function () {
    const store = useStore();
    const router = useRouter();
    const user: User = store.getters.currentUser;

    const landlordSignUp = object().shape({
      image: mixed().required('You need to provide a file'),
    });

    const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append('file', data.image[0]);

      await ApiService.post('/request-landlord', formData)
        .then((data) => {
          if (data.status === 201) {
            // store.dispatch(Actions.VERIFY_AUTH);
            router.push({ name: 'dashboard' });
          }
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
    };
    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });
    return {
      user,
      landlordSignUp,
      onSubmit,
    };
  },
});
</script>
