import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as AuthApiActions from './auth-api.actions';
import { AuthToken, User } from '../models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, () => ({ ...initialState, loading: true })),
  on(AuthActions.signIn, (state, { user: { email, name } }) => ({
    ...state,
    user: { email, name }, // Skip save password
    loading: true,
    error: null,
  })),
  on(AuthActions.logout, AuthActions.unauthorized, () => initialState),

  on(AuthApiActions.loginSuccess, (state, { token }) => ({ ...state, token, loading: false })),
  on(AuthApiActions.signInSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthApiActions.loginFailure, AuthApiActions.signInFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
