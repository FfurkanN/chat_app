import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Error Interceptor');
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!req.url.includes('/login')) {
            return this.handle401Error(req, next);
          } else {
            return throwError(() => error);
          }
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return req;
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        return next.handle(this.addToken(req));
      }),
      catchError((error) => {
        console.error('Failed refresh token:', error);
        this.authService.logout();
        return throwError(() => error);
      })
    );
  }
}
