import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import { Mutations, Actions } from '@/store/enums/StoreEnums';
import admin from '@/router/middleware/admin';
import landlord from '@/router/middleware/landlord';
import isAuth from '@/router/middleware/isAuth';

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
    ],
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('@/layout/Layout.vue'),
    beforeEnter: [admin],
    children: [
      {
        path: 'dashboard',
        name: 'adminDashboard',
        component: () => import('@/views/AdminDashboard.vue'),
      },
    ],
  },

  {
    path: '/landlord',
    redirect: '/landlord/sign-up',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        beforeEnter: [landlord],
        path: 'sign-up',
        name: 'landlordSignUp',
        component: () => import('@/views/landlord/SignUp.vue'),
      },
      {
        path: 'dashboard',
        name: 'landlordDashboard',
        component: () => import('@/views/landlord/LandlordDashboard.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/components/page-layouts/Auth.vue'),
    beforeEnter: [isAuth],
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
