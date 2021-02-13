import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import * as AuthApiActions from './auth-api.actions';

describe('Auth Reducer', () => {
  it('should return the previous state if unknown action', () => {
    const action = {} as any;
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should initial state and loading on login', () => {
    const user = { email: 'test@test.com', password: 'test' };
    const action = AuthActions.login({ user });
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(initialState.error);
    expect(state.token).toBe(initialState.token);
    expect(state.user).toBe(initialState.user);
  });

  it('should set user, loading, and no password on signIn', () => {
    const user = { email: 'test@test.com', password: 'test', name: 'test' };
    const action = AuthActions.signIn({ user });
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.token).toBe(null);
    expect(state.user?.name).toBe(user.name);
    expect(state.user?.email).toBe(user.email);
    expect(state.user?.password).toBeUndefined();
  });

  it('should initial state on logout', () => {
    const action = AuthActions.logout();
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should initial state on unauthorized', () => {
    const action = AuthActions.unauthorized();
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set token and loading false on login success', () => {
    const token = { Authorization: 'test' };
    const action = AuthApiActions.loginSuccess({ token });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.token).toBe(token);
  });

  it('should set error and loading false on login failure', () => {
    const error = 'error test';
    const action = AuthApiActions.loginFailure({ error });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should set user on and loading false signIn success', () => {
    const user = { email: 'test@test.com', name: 'test' };
    const action = AuthApiActions.signInSuccess({ user });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toBe(user);
  });

  it('should set error and loading false on signIn failure', () => {
    const error = 'error test';
    const action = AuthApiActions.signInFailure({ error });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
