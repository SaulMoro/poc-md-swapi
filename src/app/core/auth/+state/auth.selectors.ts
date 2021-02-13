import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectLoading = createSelector(selectAuthState, (state) => state?.loading);

export const selectError = createSelector(selectAuthState, (state) => state?.error);

export const selectUser = createSelector(selectAuthState, (state) => state?.user);
export const selectRoles = createSelector(selectUser, (user) => user?.roles ?? []);
export const selectIsAdmin = createSelector(selectRoles, (roles) => roles.some((role) => role === 'admin'));

export const selectToken = createSelector(selectAuthState, (state) => state?.token);
export const selectAuthenticated = createSelector(selectToken, (token) => !!token);
