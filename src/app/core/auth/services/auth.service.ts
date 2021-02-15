import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@md-starwars/environment';
import { AuthToken, LoginRequest, SignInRequest, User, UsersApiResponse } from '../models';
import { isAdmin } from '../utils/roles.util';

const API_PATCH = '/api/v1/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<UsersApiResponse<AuthToken>> {
    return this.http.post<UsersApiResponse<AuthToken>>(`${environment.authUrl}/login`, user);
  }

  signIn(user: SignInRequest): Observable<UsersApiResponse<User>> {
    return this.http.post<UsersApiResponse<User>>(`${environment.authUrl}${API_PATCH}`, user).pipe(
      // mock roles of user by email
      map((response) => ({
        ...response,
        message: { ...response.message, roles: isAdmin(response.message.email) ? ['admin', 'client'] : ['client'] },
      })),
    );
  }

  logout(): Observable<boolean> {
    // mock api response always true
    return of(true);
  }
}
