import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthToken, LoginRequest, SignInRequest, User, UsersApiResponse } from '../models';

describe('AuthService', () => {
  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('should login fail if bad request', async (done) => {
    const service = setup();
    const req: LoginRequest = { email: 'test@test.com', password: '' };

    service.login(req).subscribe(
      () => EMPTY,
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should login fail beacause not prev signIn', async (done) => {
    const service = setup();
    const req: LoginRequest = { email: 'test@test.com', password: 'test' };

    service.login(req).subscribe(
      () => EMPTY,
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should login with prev signIn', async (done) => {
    const service = setup();
    const signIn: SignInRequest = { name: 'test', email: 'test@test.com', password: 'test' };
    const req: LoginRequest = { email: 'test@test.com', password: 'test' };

    service
      .signIn(signIn)
      .pipe(
        exhaustMap((signInResponse: UsersApiResponse<User>) => {
          expect(signInResponse).toBeTruthy();
          expect(signInResponse.code).toBe(201);
          return service.login(req);
        }),
      )
      .subscribe((res: UsersApiResponse<AuthToken>) => {
        expect(res).toBeTruthy();
        expect(res.code).toBe(200);
        expect(res.message.Authorization).toBeTruthy();
        done();
      });
  });

  it('should logout', async (done) => {
    const service = setup();

    service.logout().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should signIn fail if bad request', async (done) => {
    const service = setup();
    const req: SignInRequest = { name: '', email: 'test@test.com', password: '' };

    service.signIn(req).subscribe(
      () => EMPTY,
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should signIn fail if mail admin@admin.com', async (done) => {
    const service = setup();
    const req: SignInRequest = { name: 'admin', email: 'admin@admin.com', password: 'admin' };

    service.signIn(req).subscribe(
      () => EMPTY,
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should signIn role user', async (done) => {
    const service = setup();
    const req: SignInRequest = { name: 'test', email: 'test@test.com', password: 'test' };

    service.signIn(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(201);
      expect(res.message).toBeTruthy();
      expect(res.message.name).toBe(req.name);
      expect(res.message.email).toBe(req.email);
      expect(res.message.roles).toEqual(['user']);
      done();
    });
  });

  it('should signIn role admin', async (done) => {
    const service = setup();
    const req: SignInRequest = { name: 'test', email: 'testadmin@test.com', password: 'test' };

    service.signIn(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(201);
      expect(res.message).toBeTruthy();
      expect(res.message.name).toBe(req.name);
      expect(res.message.email).toBe(req.email);
      expect(res.message.roles).toEqual(['admin', 'user']);
      done();
    });
  });
});

function setup(): AuthService {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({ imports: [HttpClientModule] });
  return TestBed.inject(AuthService);
}
