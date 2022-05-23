<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <div class="symbol symbol-50px me-5">
          <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div class="d-flex flex-column">
          <div class="fw-bolder d-flex align-items-center fs-5">
            {{ user.name }}
          </div>
          <span class="fw-bold text-muted fs-7">
            {{ user.email }}
          </span>
          <span class="fw-bold text-muted fs-7">
            {{ user.organization }}
          </span>
        </div>
      </div>
    </div>
    <div class="separator my-2"></div>
    <div class="menu-item px-5">
      <router-link to="/profile/overview" class="menu-link px-5">
        My Profile
      </router-link>
    </div>
    <div class="separator my-2"></div>
    <div v-if="user.roles.includes('admin')" class="menu-item px-5 my-1">
      <router-link to="/admin" class="menu-link px-5">Admin Portal</router-link>
    </div>
    <div class="menu-item px-5">
      <a class="menu-link px-5" @click="signOut()">Sign Out</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Actions } from '@/store/enums/StoreEnums';
import { User } from '@/store/modules/AuthModule';

export default defineComponent({
  name: 'KtUserMenu',
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const user: User = store.getters.currentUser;

    const signOut = () => {
      store.dispatch(Actions.LOGOUT).then(() => {
        router.go(0);
      });
    };

    return {
      user,
      signOut,
    };
  },
});
</script>
