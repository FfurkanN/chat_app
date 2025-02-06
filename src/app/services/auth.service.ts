import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable, map } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

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
          return response;
        })
      );
  }
  register(credentials: RegisterRequest): Observable<User> {
    return this.httpClient
      .post<User>('https://localhost:7292/api/Auth/Register', credentials)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.httpClient
      .post<LoginResponse>('https://localhost:7292/refresh', { refreshToken })
      .pipe(
        map((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          // document.cookie = `refreshToken=${response.refreshToken};`;
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
