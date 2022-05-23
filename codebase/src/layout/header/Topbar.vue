<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="topbar d-flex align-items-stretch flex-shrink-0">
      <div
        id="#kt_header_menu"
        class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-white menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in MainMenuConfig" :key="i">
          <template v-if="!item.heading">
            <template v-for="(menuItem, j) in item.pages" :key="j">
              <div
                v-if="menuItem.heading && !isAuthenticated"
                class="menu-item me-lg-1"
              >
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
      </div>

      <!--begin::User-->
      <div
        v-if="isAuthenticated"
        id="kt_header_user_menu_toggle"
        class="d-flex align-items-center me-n3 ms-1 ms-lg-3"
      >
        <!--begin::Menu-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <div class="d-flex justify-content-center">
            <div
              class="rounded-circle bg-info text-white d-flex justify-content-center"
              style="width: 30px; height: 30px"
            >
              <span style="font-size: 20px">
                {{ user.name.substring(0, 1) }}
              </span>
            </div>
          </div>
        </div>
        <KTUserMenu></KTUserMenu>
        <!--end::Menu-->
      </div>
      <!--end::User -->
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KTSearch from '@/layout/header/partials/Search.vue';
import KTUserMenu from '@/layout/header/partials/UserMenu.vue';
import MainMenuConfig from '@/core/config/TopbarMenu';
import { useI18n } from 'vue-i18n/index';
import { useStore } from 'vuex';
import { User } from '@/store/modules/AuthModule';
import store from '@/store';

export default defineComponent({
  name: 'LayoutTopbar',
  components: {
    KTUserMenu,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = store.getters.isUserAuthenticated;
    const user: User = store.getters.currentUser;

    const { t, te } = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    return {
      isAuthenticated,
      MainMenuConfig,
      translate,
      user,
    };
  },
});
</script>
