import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as AuthActions from './auth.actions';
import * as AuthApiActions from './auth-api.actions';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';

const scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));

describe('AuthEffects', () => {
  it('should be created', () => {
    const actions = new Actions(EMPTY);
    const { effects } = setup(actions);

    expect(effects).toBeTruthy();
  });

  describe('login', () => {
    it('should login failure on bad login', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'test@test.com', password: '' };
        const login = AuthActions.login({ user });
        const source = cold('a', { a: login });
        const actions = new Actions(source);
        const { effects } = setup(actions);

        effects.login$.subscribe((action) => {
          expect(action.type).toBe(AuthApiActions.loginFailure.type);
          done();
        });
      });
    });

    it('should login failure on login without signIn', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'test@test.com', password: 'test' };
        const login = AuthActions.login({ user });
        const source = cold('a', { a: login });
        const actions = new Actions(source);
        const { effects } = setup(actions);

        effects.login$.subscribe((action) => {
          expect(action.type).toBe(AuthApiActions.loginFailure.type);
          done();
        });
      });
    });

    it('should login correct on login', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'test@test.com', password: 'test' };
        const login = AuthActions.login({ user });
        const source = cold('a', { a: login });
        const actions = new Actions(source);
        const { effects, authService } = setup(actions);
        jest.spyOn(authService, 'login').mockReturnValue(of({ status: 'success', message: { Authorization: 'test' } }));

        effects.login$.subscribe((action) => {
          expect(action.type).toBe(AuthApiActions.loginSuccess.type);
          done();
        });
      });
    });
  });

  describe('signIn', () => {
    it('should signIn succees on correct signIn', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'test@test.com', password: 'test', name: 'test' };
        const signIn = AuthActions.signIn({ user });
        const source = cold('a', { a: signIn });
        const actions = new Actions(source);
        const { effects } = setup(actions);

        effects.signIn$.subscribe((action) => {
          expect(action.type).toEqual(AuthApiActions.signInSuccess.type);
          done();
        });
      });
    });

    it('should signIn failure on bad signIn', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'test@test.com', password: '', name: '' };
        const signIn = AuthActions.signIn({ user });
        const source = cold('a', { a: signIn });
        const actions = new Actions(source);
        const { effects } = setup(actions);

        effects.signIn$.subscribe((action) => {
          expect(action.type).toEqual(AuthApiActions.signInFailure.type);
          done();
        });
      });
    });

    it('should signIn failure on admin@admin.com signIn', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const user = { email: 'admin@admin.com', password: 'admin', name: 'admin' };
        const signIn = AuthActions.signIn({ user });
        const source = cold('a', { a: signIn });
        const actions = new Actions(source);
        const { effects } = setup(actions);

        effects.signIn$.subscribe((action) => {
          expect(action.type).toEqual(AuthApiActions.signInFailure.type);
          done();
        });
      });
    });
  });

  describe('logout', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const { metadata } = setup(actions);

      expect(metadata.logout$?.dispatch).toBe(false);
    });

    it('should call authService.logout on action logout', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const logoutAction = AuthActions.logout();
        const source = cold('a', { a: logoutAction });
        const actions = new Actions(source);
        const { effects, authService } = setup(actions);
        const spy = jest.spyOn(authService, 'logout');

        effects.logout$.subscribe(() => {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('redirectToLoginOnSignInORLogout', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const { metadata } = setup(actions);

      expect(metadata.redirectToLoginOnSignInORLogout$?.dispatch).toBe(false);
    });

    it('should redirect to / on action signInSuccess', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const signInSuccess = AuthApiActions.signInSuccess({ user: { email: 'test@test.com' } });
        const source = cold('a', { a: signInSuccess });
        const actions = new Actions(source);
        const { effects, router } = setup(actions);
        const spy = jest.spyOn(router, 'navigate');

        effects.redirectToLoginOnSignInORLogout$.subscribe(() => {
          expect(spy).toHaveBeenCalledWith(['/']);
          done();
        });
      });
    });

    it('should redirect to / on action logout', async (done) => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const logout = AuthActions.logout();
        const source = cold('a', { a: logout });
        const actions = new Actions(source);
        const { effects, router } = setup(actions);
        const spy = jest.spyOn(router, 'navigate');

        effects.redirectToLoginOnSignInORLogout$.subscribe(() => {
          expect(spy).toHaveBeenCalledWith(['/']);
          done();
        });
      });
    });
  });

  it('should redirect to / on action unauthorized', async (done) => {
    scheduler.run((helpers) => {
      const { cold } = helpers;
      const unauthorized = AuthActions.unauthorized();
      const source = cold('a', { a: unauthorized });
      const actions = new Actions(source);
      const { effects, router } = setup(actions);
      const spy = jest.spyOn(router, 'navigate');

      effects.redirectToLoginOnSignInORLogout$.subscribe(() => {
        expect(spy).toHaveBeenCalledWith(['/']);
        done();
      });
    });
  });
});

function setup(actions$: Observable<Action>) {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule],
    providers: [AuthEffects, provideMockActions(() => actions$)],
  });

  const router = TestBed.inject(Router);
  const authService = TestBed.inject(AuthService);
  const effects = TestBed.inject(AuthEffects);
  const metadata = getEffectsMetadata(effects);

  return { effects, metadata, router, authService };
}
