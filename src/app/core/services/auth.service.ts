import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { Observable, map, throwError } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = new Router();
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.apiUrl + '/Auth/Login', credentials)
      .pipe(
        map((response) => {
          console.log('response', response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          // document.cookie = `refreshToken=${response.refreshToken};`;
          this.router.navigate(['/chat']);
          return response;
        })
      );
  }
  register(credentials: RegisterRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.apiUrl + '/Auth/Register', credentials)
      .pipe(
        map((response) => {
          console.log(response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.router.navigate(['/chat']);
          return response;
        })
      );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token not found!'));
    }

    return this.httpClient
      .post<LoginResponse>(
        `${environment.apiUrl}/Auth/RefreshToken`,
        { refreshToken }, // JSON formatında gönderiyoruz
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(
        map((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          return response;
        })
      );
  }

  // private getRefreshTokenFromCookie(): string | null {
  //   const cookieString = document.cookie;
  //   const cookieArray = cookieString.split(';');

  //   for (const cookie in cookieArray) {
  //     const [name, value] = cookie.split('=');

  //     if (name == 'refreshToken') {
  //       return value;
  //     }
  //   }
  //   return null;
  // }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
}
