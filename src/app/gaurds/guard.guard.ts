import { CanActivateFn } from '@angular/router';

export const Guard: CanActivateFn = (route, state) => {
  return true;
};
