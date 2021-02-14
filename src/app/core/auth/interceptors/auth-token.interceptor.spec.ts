import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { environment } from '@md-starwars/environment';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { selectToken } from '../+state/auth.selectors';
import { AuthToken } from '../models';
import { AuthService } from '../services/auth.service';

const API_PATCH = '/api/v1/users';

describe('AuthTokenInterceptor', () => {
  it('should be created', () => {
    const interceptor = setup(null);

    expect(interceptor).toBeTruthy();
  });

  it('should add authorization if token exists', () => {
    const token = { Authorization: 'Bearer test' };
    const { authService, httpMock } = setup(token);

    authService.signIn({ email: 'test@test.com', name: 'test', password: 'test' }).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.authUrl}${API_PATCH}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(token.Authorization);
  });

  it('should doest add token if not authenticated', () => {
    const { authService, httpMock } = setup(null);

    authService.signIn({ email: 'test@test.com', name: 'test', password: 'test' }).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.authUrl}${API_PATCH}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});

function setup(token: AuthToken | null) {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectToken,
            value: token,
          },
        ],
      }),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthTokenInterceptor,
        multi: true,
      },
    ],
  });

  const authService = TestBed.inject(AuthService);
  const httpMock = TestBed.inject(HttpTestingController);
  return { authService, httpMock };
}
