import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@md-starwars/environment';
import { LoginRequest, LoginResponse, SignInRequest, SignInResponse } from '../models';

const API_PATCH = '/api/v1/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authUrl}/login`, user);
  }

  signIn(user: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.authUrl}${API_PATCH}`, user);
  }

  logout(): Observable<boolean> {
    // mock api response always true
    return of(true);
  }
}
