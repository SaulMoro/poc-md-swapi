import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, concatMap, exhaustMap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import * as AuthApiActions from './auth-api.actions';
import { AuthService } from '../services/auth.service';
import { ErrorResponse } from '../models';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap(({ user }) =>
        this.authService.login(user).pipe(
          map(({ message }) => AuthApiActions.loginSuccess({ token: message })),
          catchError((error: unknown) => of(AuthApiActions.loginFailure({ error: (error as ErrorResponse).message }))),
        ),
      ),
    ),
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap(({ user }) =>
        this.authService.signIn(user).pipe(
          map(({ message }) => AuthApiActions.signInSuccess({ user: message })),
          catchError((error: unknown) => of(AuthApiActions.signInFailure({ error: (error as ErrorResponse).message }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => this.authService.logout()),
      ),
    { dispatch: false },
  );

  redirectToLoginOnSignInORLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.signInSuccess, AuthActions.logout, AuthActions.unauthorized),
        exhaustMap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
