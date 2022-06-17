<template>
  <div class="row py-20">
    <div class="col-5">
      <div class="card">
        <div class="card-body fs-2">
          <h1 style="font-size: 40px" class="fw-lighter">
            Are you trying to find the perfect terrain?
          </h1>
          <p>
            camp with your friends or even with your youth association? Look no
            further. Grasshopper wil help you find a terrain with help of an
            advance search and google api.
          </p>
          <p class="mt-10">
            <i class="fa-solid fa-circle-dot fa-lg text-primary"></i>
            Easy to find terrains
          </p>
          <p>
            <i class="fa-solid fa-circle-dot fa-lg text-primary"></i>
            A place to rent out your terrains
          </p>
          <p>
            <i class="fa-solid fa-circle-dot fa-lg text-primary"></i>
            Custom rating
          </p>
          <div class="d-flex justify-content-center mt-8">
            <router-link to="/dashboard" class="cbtn-dark py-5 px-6">
              <i class="fa-solid fa-magnifying-glass text-primary"></i>
              Browse terrains
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

export default defineComponent({
  name: 'MainDashboard',
  components: {},
  setup() {
    onMounted(async () => {
      setCurrentPageTitle('');
    });
    return {};
  },
});
</script>
