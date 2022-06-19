<template>
  <!--begin::Header-->
  <div
    id="kt_header"
    class="header align-items-stretch"
    :data-kt-sticky="isHeaderSticky"
    data-kt-sticky-name="header"
    data-kt-sticky-offset="{default: '200px', lg: '300px'}"
  >
    <!--begin::Container-->
    <div
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
      class="d-flex align-items-center"
    >
      <!--begin::Aside mobile toggle-->
      <div
        class="d-flex topbar align-items-center d-lg-none ms-n2 me-3"
        title="Show aside menu"
      >
        <div
          id="kt_header_menu_mobile_toggle"
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
      </div>
      <!--end::Aside mobile toggle-->

      <!--begin::Mobile logo-->
      <div class="header-logo me-2 me-md-4">
        <router-link to="/dashboard">
          <img
            alt="Logo"
            src="media/grasshopper-transparent.png"
            class="logo-default h-50px"
          />
        </router-link>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
      >
        <!--begin::Navbar-->
        <div id="kt_header_nav" class="d-flex align-items-stretch">
          <KTMenu></KTMenu>
        </div>
        <!--end::Navbar-->

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0">
          <KTTopbar></KTTopbar>
        </div>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import KTTopbar from '@/layout/header/Topbar.vue';
import KTMenu from '@/layout/header/Menu.vue';

import {
  headerWidthFluid,
  headerFixed,
  headerFixedOnMobile,
  headerLeft,
  asideDisplay,
} from '@/core/helpers/config';

export default defineComponent({
  name: 'KTHeader',
  components: {
    KTTopbar,
    KTMenu,
  },
  props: {
    title: { type: String, required: true },
  },
  setup() {
    const isHeaderSticky = computed(() => {
      if (window.innerWidth > 768) {
        return headerFixed.value;
      } else {
        return headerFixedOnMobile.value;
      }
    });

    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      isHeaderSticky,
    };
  },
});
</script>
