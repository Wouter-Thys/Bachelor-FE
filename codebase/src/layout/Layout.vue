<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">
    <div id="kt_wrapper" class="wrapper d-flex flex-column flex-row-fluid">
      <KTHeader :title="pageTitle" />

      <!-- begin:: Content Head -->
      <KTToolbar
        v-if="subheaderDisplay"
        :breadcrumbs="breadcrumbs"
        :title="pageTitle"
      />
      <!-- end:: Content Head -->

      <!-- begin:: Content -->
      <div
        id="kt_content"
        class="d-flex flex-column-fluid align-items-start"
        :class="{
          'container-fluid': contentWidthFluid,
          'container-xxl': !contentWidthFluid,
        }"
      >
        <!-- begin:: Aside Left -->

        <!-- end:: Aside Left -->
        <!-- begin:: Content Body -->
        <div class="content flex-row-fluid">
          <router-view />
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <KTFooter />
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import KTHeader from '@/layout/header/Header.vue';
import KTFooter from '@/layout/footer/Footer.vue';
import HtmlClass from '@/core/services/LayoutService';
import KTToolbar from '@/layout/toolbar/Toolbar.vue';
import KTScrollTop from '@/layout/extras/ScrollTop.vue';
import KTLoader from '@/components/Loader.vue';
import { Actions } from '@/store/enums/StoreEnums';
import { MenuComponent } from '@/assets/ts/components';
import { reinitializeComponents } from '@/core/plugins/keenthemes';
import { removeModalBackdrop } from '@/core/helpers/dom';
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from '@/core/helpers/config';

export default defineComponent({
  name: 'MasterLayout',
  components: {
    KTHeader,
    KTFooter,
    KTToolbar,
    KTScrollTop,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    // show page loading
    // store.dispatch(Actions.ADD_BODY_CLASSNAME, 'page-loading');

    // initialize html element classes
    HtmlClass.init();

    const pageTitle = computed(() => {
      return store.getters.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return store.getters.pageBreadcrumbPath;
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, 'page-loading');
      }, 500);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        removeModalBackdrop();
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      pageTitle,
      breadcrumbs,
      themeLightLogo,
      themeDarkLogo,
    };
  },
});
</script>
