import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import store from '@/store';
import { User } from '@/store/modules/AuthModule';

export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user: User = store.getters.currentUser;
  if (!store.getters.isUserAuthenticated) {
    return next({
      path: '/dashboard',
    });
  }

  if (user.roles) {
    if (!user.roles.includes('admin')) {
      return next({
        path: '/dashboard',
      });
    }
  }
  return next();
};
