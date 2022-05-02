<template>
  <!--begin::Toolbar-->
  <div id="kt_toolbar" class="toolbar py-5 py-lg-15">
    <!--begin::Container-->
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
      class="d-flex flex-stack flex-wrap"
    >
      <!--begin::Page title-->
      <div class="page-title d-flex flex-column me-3">
        <!--begin::Title-->
        <h1 class="d-flex text-white fw-bolder my-1 fs-3">
          {{ title }}
        </h1>
        <!--end::Title-->

        <!--begin::Breadcrumb
        <ul
          v-if="breadcrumbs"
          class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"
        >
          <li class="breadcrumb-item text-white opacity-75">
            <router-link to="/dashboard" class="text-white">Home</router-link>
          </li>
          <li class="breadcrumb-item text-white opacity-75">
            <span class="bullet bg-gray-200 w-5px h-2px"></span>
          </li>
          <template v-for="(item, index) in breadcrumbs" :key="index">
            <li class="breadcrumb-item text-white opacity-75">
              {{ item }}
            </li>
            <li class="breadcrumb-item text-white opacity-75">
              <span class="bullet bg-gray-200 w-5px h-2px"></span>
            </li>
          </template>
          <li class="breadcrumb-item text-white opacity-75">
            {{ title }}
          </li>
        </ul>
        end::Breadcrumb-->
      </div>
      <!--end::Page title-->

      <!--begin::Actions
      <div class="d-flex align-items-center py-3 py-md-1">
        <div class="me-4">
          <a
            href="#"
            class="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
              <inline-svg src="media/icons/duotune/general/gen031.svg" />
            </span>
            Filter
          </a>

          <Dropdown1></Dropdown1>
        </div>
        <a
          id="kt_toolbar_primary_button"
          href="#"
          class="btn btn-bg-white btn-active-color-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_create_app"
        >
          Create
        </a>
      </div>
      end::Actions-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Dropdown1 from '@/components/dropdown/Dropdown1.vue';
import { toolbarWidthFluid } from '@/core/helpers/config';

export default defineComponent({
  name: 'KToolbar',
  components: {
    // Dropdown1,
  },
  props: {
    breadcrumbs: Array,
    title: String,
  },

  setup() {
    return {
      toolbarWidthFluid,
    };
  },
});
</script>
