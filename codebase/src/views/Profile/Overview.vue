<template>
  <div id="kt_profile_details_view" class="card mb-5 mb-xl-10">
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Profile Details</h3>
      </div>
      <router-link
        to="/account/settings"
        class="btn btn-primary align-self-center"
      >
        Edit Profile
      </router-link>
    </div>
    <div class="card-body p-9">
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Full Name</label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">yeet</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Company</label>
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6">Keenthemes</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          Contact Phone
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Phone number must be active"
          ></i>
        </label>
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bolder fs-6 me-2">044 3276 454 935</span>

          <span class="badge badge-success">Verified</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Company Site</label>
        <div class="col-lg-8">
          <a href="#" class="fw-bold fs-6 text-dark text-hover-primary">
            keenthemes.com
          </a>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">
          Country
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Country of origination"
          ></i>
        </label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">Germany</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-bold text-muted">Communication</label>
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">Email, Phone</span>
        </div>
      </div>
      <div class="row mb-10">
        <label class="col-lg-4 fw-bold text-muted">Allow Changes</label>
        <div class="col-lg-8">
          <span class="fw-bold fs-6">Yes</span>
        </div>
      </div>
      <div
        class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
      >
        <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
          <inline-svg src="media/icons/duotune/general/gen044.svg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AccountOverview',
  components: {},
  setup() {
    return {};
  },
});
</script>