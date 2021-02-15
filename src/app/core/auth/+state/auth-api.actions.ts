import { createAction, props } from '@ngrx/store';
import { AuthToken, User } from '../models';

export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: User; token: AuthToken }>());
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: string }>());

export const signInSuccess = createAction('[Auth API] signIn Success', props<{ user: User }>());
export const signInFailure = createAction('[Auth API] signIn Failure', props<{ error: string }>());
