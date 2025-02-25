import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  const token = localStorage.getItem('accessToken');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
