import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { LoginRequest, SignInRequest } from '../models';

describe('AuthService', () => {
  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('should signIn fail if bad request', () => {
    const service = setup();
    const req: SignInRequest = { name: '', email: 'test@test.com', password: '' };

    service.signIn(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(400);
    });
  });

  it('should signIn fail if mail admin@admin.com', () => {
    const service = setup();
    const req: SignInRequest = { name: 'admin', email: 'admin@admin.com', password: 'admin' };

    service.signIn(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(400);
      expect(res.message).toBe('Email already exists.');
    });
  });

  it('should signIn', () => {
    const service = setup();
    const req: SignInRequest = { name: 'test', email: 'test@test.com', password: 'test' };

    service.signIn(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(200);
      expect(res.message).toBeTruthy();
      expect(res.message.name).toBe(req.name);
      expect(res.message.email).toBe(req.email);
      expect(res.message.role).toBe('user');
    });
  });

  it('should login fail if bad request', () => {
    const service = setup();
    const req: LoginRequest = { email: 'test@test.com', password: '' };

    service.login(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(400);
    });
  });

  it('should login fail beacause not prev signIn', () => {
    const service = setup();
    const req: LoginRequest = { email: 'test@test.com', password: 'test' };

    service.login(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(400);
    });
  });

  it('should login', () => {
    const service = setup();
    const signIn: SignInRequest = { name: 'test', email: 'test@test.com', password: 'test' };
    const req: LoginRequest = { email: 'test@test.com', password: 'test' };

    service.signIn(signIn).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(200);
    });

    service.login(req).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.code).toBe(200);
      expect(res.message.Authorization).toBeTruthy();
    });
  });

  it('should logout', () => {
    const service = setup();

    service.logout().subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });
});

function setup(): AuthService {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({ imports: [HttpClientModule] });
  return TestBed.inject(AuthService);
}
