import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import { Mutations, Actions } from '@/store/enums/StoreEnums';
import admin from '@/router/middleware/Admin';
import landlord from '@/router/middleware/Landlord';
import isAuth from '@/router/middleware/IsAuth';
import user from '@/router/middleware/User';
import isNotAuth from '@/router/middleware/IsNotAuth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        beforeEnter: [isAuth, user],
        path: 'profile',
        name: 'profile',
        redirect: '/profile/overview',
        component: () => import('@/views/Profile/Account.vue'),
        children: [
          {
            path: 'overview',
            name: 'profileOverview',
            component: () => import('@/views/Profile/Overview.vue'),
          },
          {
            path: 'settings',
            name: 'profileSettings',
            component: () => import('@/views/Profile/Settings.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('@/layout/Layout.vue'),
    beforeEnter: [isAuth, admin],
    children: [
      {
        path: 'dashboard',
        name: 'adminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
    ],
  },

  {
    path: '/landlord',
    redirect: '/landlord/dashboard',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        beforeEnter: [isAuth, user],
        path: 'sign-up',
        name: 'landlordSignUp',
        component: () => import('@/views/landlord/SignUp.vue'),
      },
      {
        beforeEnter: [isAuth, user, landlord],
        path: 'dashboard',
        name: 'landlordDashboard',
        component: () => import('@/views/landlord/Dashboard.vue'),
      },
      {
        beforeEnter: [isAuth, user, landlord],
        path: 'add-terrain',
        name: 'landlordAddTerrain',
        component: () => import('@/views/landlord/AddNewTerrain.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/components/page-layouts/Auth.vue'),
    beforeEnter: [isNotAuth],
    children: [
      {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import('@/views/authentication/basic-flow/SignIn.vue'),
      },
      {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/views/authentication/basic-flow/SignUp.vue'),
      },
      {
        path: '/password-reset',
        name: 'password-reset',
        component: () =>
          import('@/views/authentication/basic-flow/PasswordReset.vue'),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: '/404',
    name: '404',
    component: () => import('@/views/authentication/Error404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('going to:', to.fullPath);

  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  const user = store.getters.isUserAuthenticated;
  if (!user) {
    await store.dispatch(Actions.VERIFY_AUTH);
  }

  next();

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
