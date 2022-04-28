import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import store from '@/store';

export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!store.getters.isUserAuthenticated) {
    return next({
      path: '/dashboard',
    });
  }
  return next();
};
