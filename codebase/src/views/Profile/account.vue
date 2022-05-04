<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="media/avatars/300-1.jpg" alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
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
              <!--end::Name-->

              <!--begin::Info-->
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
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="me-2"><i class="fa-solid fa-tents"></i></span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      45
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">Rented terrains</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="me-2">
                      <i class="fa-solid fa-tent"></i>
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      75
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    Most recent terrain
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg src="media/icons/duotune/arrows/arr066.svg" />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      60%
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">Success Rate</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Progress-->
            <!--end::Progress-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Settings
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import useUsers from '@/core/composables/users';
import KTChartWidget1 from '@/components/widgets/charts/Widget1.vue';
import KTListWidget5 from '@/components/widgets/lists/Widget5.vue';
import KTTableWidget5 from '@/components/widgets/tables/Widget5.vue';
import KTListWidget1 from '@/components/widgets/lists/Widget1.vue';

export default defineComponent({
  name: 'ProfileOverview',
  components: {
    // KTChartWidget1,
    // KTListWidget5,
    // KTTableWidget5,
    // KTListWidget1,
  },
  setup() {
    const { user, getMe } = useUsers();
    onMounted(getMe);
    console.log(user);
    onMounted(async () => {
      setCurrentPageTitle('Profile Overview');
    });
    return {
      user,
    };
  },
});
</script>
