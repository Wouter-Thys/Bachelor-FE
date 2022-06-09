<template>
  <!--begin::Footer-->
  <div id="kt_footer" class="footer py-4 d-flex flex-lg-column">
    <!--begin::Container-->
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <!--begin::Copyright-->
      <div class="text-primary order-2 order-md-1 d-flex align-items-center">
        <img
          alt="Logo"
          src="media/grasshopper-transparent.png"
          class="logo-default h-40px"
        />
        Grasshopper
      </div>
    </div>
    <!--end::Container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { footerWidthFluid } from '@/core/helpers/config';

export default defineComponent({
  name: 'KTFooter',
  setup() {
    return {
      footerWidthFluid,
    };
  },
});
</script>
