<template>
  <!--begin::Menu wrapper-->
  <div
    id="kt_header_menu"
    class="header-menu align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="prepend"
    data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
  >
    <!--begin::Menu-->
    <div
      id="#kt_header_menu"
      class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
      data-kt-menu="true"
    >
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <template v-if="!item.heading">
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <div v-if="menuItem.heading" class="menu-item me-lg-1">
              <router-link
                class="menu-link"
                :to="menuItem.route"
                active-class="active"
              >
                <span class="menu-title">
                  {{ translate(menuItem.heading) }}
                </span>
              </router-link>
            </div>
          </template>
        </template>
      </template>
      <!--end::Menu-->
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n/index';
import MainMenuConfig from '@/core/config/MainMenu';
import { headerMenuIcons } from '@/core/helpers/config';
import { version } from '@/core/helpers/documentation';

export default defineComponent({
  name: 'KTMenu',
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      translate,
      version,
    };
  },
});
</script>
