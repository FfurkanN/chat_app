import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const JWTInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  // if (authService.isLoggedIn()) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //     },
  //   });
  //   // console.log('HTTP request captured ', req);
  //   return next(req);
  // }

  return next(req);
};
