import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { ApiError } from '../interfaces/validation-error';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://localhost:44376/api/Account';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_INFO_KEY = 'userInfo';

  constructor(private readonly HttpCLient: HttpClient) {}

  // AuthResponse is just jSON message a Which is Created In the Backend, When Status is 200 ,
  // Backend get AuthResponse { Status : True , Message : Login/Signup success}
  
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.HttpCLient.post<AuthResponse>(
      `${this.API_URL}/Login`,
      data,
    ).pipe(
      tap((response) => {
        if (response.isSuccess) {
          this.setToken(response.token);
          this.setUserInfo(this.decodeToken(response.token));
        }
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.HttpCLient.post<AuthResponse>(
      `${this.API_URL}/Register`,
      data,
    ).pipe(catchError((err) => this.handleError(err)));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_INFO_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  private setUserInfo(userInfo: any): void {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
  }

  getAllUsers() {
    return this.HttpCLient.get<User[]>(`${this.API_URL}/all`);
  }

  deleteUser(id: string) {
    return this.HttpCLient.delete(`${this.API_URL}/${id}`).pipe(
      catchError((err) => {
        return this.handleError(err);
      }),
    );
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      const apiError = error.error as ApiError | any;

      if (error.status === 400) {
        if (apiError?.errors && typeof apiError.errors === 'object') {
          const errorItems = Object.entries(apiError.errors).map(
            ([key, messages]) =>
              `<li>${key}: ${(messages as string[]).join(', ')}</li>`,
          );
          errorMessage = `Validation Errors:<ul>${errorItems.join('')}</ul>`;
        } else if (Array.isArray(apiError)) {
          const errorItems = apiError.map(
            (err: { code: string; description: string }) =>
              `<li>${err.description}</li>`,
          );
          errorMessage = `Please fix the following issues:<ul>${errorItems.join('')}</ul>`;
        } else if (apiError?.title) {
          errorMessage = apiError.title;
        } else {
          errorMessage = 'Registration failed due to validation issues.';
        }
      } else if (error.status === 401) {
        errorMessage = 'Invalid credentials. Please check email and password.';
      } else {
        errorMessage = `Server error: ${error.status}. Please try again later.`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
