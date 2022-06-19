<template>
  <div id="kt_toolbar" class="toolbar py-10">
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
      class="d-flex flex-stack flex-wrap"
    >
      <div class="page-title d-flex flex-column me-3">
        <h1 class="d-flex text-white fw-bolder my-1 fs-3">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toolbarWidthFluid } from '@/core/helpers/config';

export default defineComponent({
  name: 'KToolbar',
  props: {
    title: { type: String, default: '' },
  },

  setup() {
    return {
      toolbarWidthFluid,
    };
  },
});
</script>
