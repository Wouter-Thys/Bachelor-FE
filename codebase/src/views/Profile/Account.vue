<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <div class="d-flex justify-content-center">
              <div
                class="rounded-circle bg-info text-white d-flex justify-content-center"
                style="width: 150px; height: 150px"
              >
                <span style="font-size: 100px">
                  {{ user.name.substring(0, 1) }}
                </span>
              </div>
            </div>
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <div
              class="d-flex justify-content-between align-items-start flex-wrap mb-2"
            >
              <div class="d-flex flex-column">
                <div class="d-flex align-items-center mb-2">
                  <h1 class="text-gray-800 text-hover-primary me-2">
                    {{ user.name }}
                  </h1>
                  <span
                    v-for="(role, index) in user.roles"
                    :key="index"
                    class="btn btn-sm btn-light-primary fw-bolder me-1 fs-8 py-1 px-3"
                  >
                    {{ role }}
                  </span>
                </div>
                <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <span
                    v-if="user.phone_number"
                    class="text-black-50 me-1 py-1 px-3"
                  >
                    <i class="fa-solid fa-phone"></i>
                    {{ user.phone_number }}
                    <span
                      v-if="user.phone_number_verified_at"
                      class="btn btn-sm btn-light-success fw-bolder me-1 fs-8 py-1 px-3"
                    >
                      Verified
                    </span>
                    <span
                      v-if="!user.phone_number_verified_at"
                      class="btn btn-sm btn-light-danger fw-bolder me-1 fs-8 py-1 px-3"
                    >
                      Not Verified
                    </span>
                  </span>
                  <span class="text-black-50 me-1 py-1 px-3">
                    <i class="fa-solid fa-envelope"></i>
                    {{ user.email }}
                    <span
                      v-if="user.email_verified_at"
                      class="btn btn-sm btn-light-success fw-bolder me-1 fs-8 py-1 px-3"
                    >
                      Verified
                    </span>
                    <span
                      v-if="!user.email_verified_at"
                      class="btn btn-sm btn-light-danger fw-bolder me-1 fs-8 py-1 px-3"
                    >
                      Not Verified
                    </span>
                  </span>
                  <span class="text-black-50 me-1 py-1 px-3">
                    <i class="fa-solid fa-sitemap"></i>
                    {{ user.organization }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <router-link
                to="/profile/settings"
                class="btn btn-primary align-self-center"
              >
                Edit Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <li class="nav-item">
            <router-link
              v-model:user="user"
              to="/profile/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/profile/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Edit profile
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import store from '@/store';

export default defineComponent({
  name: 'ProfileOverview',
  components: {},
  setup() {
    const user = computed(() => {
      return store.getters.currentUser;
    });
    onMounted(async () => {
      setCurrentPageTitle('');
    });
    return {
      user,
    };
  },
});
</script>
