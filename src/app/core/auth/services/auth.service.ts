import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@md-starwars/environment';
import { LoginRequest, SignInRequest, UsersResponse } from '../models';

const API_PATCH = '/api/v1/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<UsersResponse> {
    return this.http.post<UsersResponse>(`${environment.authUrl}/login`, user);
  }

  signIn(user: SignInRequest): Observable<UsersResponse> {
    return this.http.post<UsersResponse>(`${environment.authUrl}${API_PATCH}`, user);
  }

  logout(): Observable<boolean> {
    // mock api response always true
    return of(true);
  }
}
