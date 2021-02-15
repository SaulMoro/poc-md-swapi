import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const enterLoginSidebar = createAction('[Login Sidebar] Enter Login Sidebar');
export const login = createAction('[Login Sidebar] Login', props<{ user: User }>());

export const enterSignInPage = createAction('[SignIn Page] Enter Sign In Page');
export const signIn = createAction('[SignIn Page] Sign In', props<{ user: User }>());
export const loginOnSignInPage = createAction('[SignIn Page] Click Login On Sign In Page');

export const logout = createAction('[User Page] Logout');

export const unauthorized = createAction('[Auth Interceptor] Unauthorized');
