import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const login = createAction('[Login Page] Login', props<{ user: User }>());
export const signIn = createAction('[SignIn Page] Sign In', props<{ user: Required<User> }>());
export const logout = createAction('[User Page] Logout');

export const unauthorized = createAction('[Auth Interceptor] Unauthorized');
