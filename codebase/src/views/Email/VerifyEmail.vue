<template>
  <div class="row py-20">
    <div class="col-5">
      <div class="card">
        <div class="card-body fs-2">
          <h1 style="font-size: 40px" class="fw-lighter">Email is verified!</h1>
          <div class="d-flex justify-content-center mt-8">
            <router-link to="/dashboard" class="cbtn-dark py-5 px-6">
              <i class="fa-solid fa-magnifying-glass text-primary"></i>
              Browser terrains
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="d-flex justify-content-center">
        <img
          alt="Landing page image"
          src="media/LandingPage1-edit2.png"
          class="img-fluid"
          style="height: 600px"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import ApiService from '@/core/services/ApiService';
import { Actions } from '@/store/enums/StoreEnums';
import store from '@/store';

export default defineComponent({
  name: 'VerifyEmail',
  components: {},
  setup() {
    onMounted(async () => {
      ApiService.get('/verify/email')
        .then((r) => {
          store.dispatch(Actions.VERIFY_AUTH);
        })
        .catch(() => {});
      setCurrentPageTitle('');
    });
    return {};
  },
});
</script>
