import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const requiresAdmin = route.routeConfig?.path === 'users';

  if (requiresAdmin) {
    const userInfo = authService.getUserInfo();
    if (!userInfo || userInfo.role !== 'Admin') {
      router.navigate(['/employees']);
      return false;
    }
  }

  return true;
};
