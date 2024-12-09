import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';

export const Guard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const platformId = inject(PLATFORM_ID);
  const _router = inject(Router);
  let token: string;
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }
  const protectedRoute: string[] = [
    '/pipeline/edit/:projectId',
    '/pipeline/list',
  ];

  if (protectedRoute.includes(state.url) && !token) {
    _router.navigate(['/']);
    return false;
  }

  return true;
};
