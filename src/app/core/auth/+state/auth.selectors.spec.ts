import { AuthState, AUTH_FEATURE_KEY, initialState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { User } from '../models';

describe('Auth Selectors', () => {
  it('should select Auth State', () => {
    const state = setup();

    expect(AuthSelectors.selectAuthState(state)).toEqual(initialState);
  });

  it('should select Loading', () => {
    const stateLoading = setup({ loading: true });
    const stateNotLoading = setup({ loading: false });

    expect(AuthSelectors.selectLoading(stateLoading)).toBe(true);
    expect(AuthSelectors.selectLoading(stateNotLoading)).toBe(false);
  });

  it('should select Error', () => {
    const state = setup();
    const stateError = setup({ error: 'test' });

    expect(AuthSelectors.selectError(state)).toBe(initialState.error);
    expect(AuthSelectors.selectError(stateError)).toBe('test');
  });

  it('should select User', () => {
    const user = { email: 'test@test.com' };
    const state = setup();
    const stateUser = setup({ user });

    expect(AuthSelectors.selectUser(state)).toBe(initialState.user);
    expect(AuthSelectors.selectUser(stateUser)).toBe(user);
  });

  it('should select Role', () => {
    const norole = { email: 'test@test.com' };
    const role: User = { email: 'admin@test.com', roles: ['admin', 'user'] };
    const stateNoRole = setup({ user: norole });
    const stateRole = setup({ user: role });

    expect(AuthSelectors.selectRoles(stateNoRole)).toEqual([]);
    expect(AuthSelectors.selectRoles(stateRole)).toBeTruthy();
  });

  it('should select Is Admin', () => {
    const client: User = { email: 'client@test.com', roles: ['user'] };
    const admin: User = { email: 'admin@test.com', roles: ['admin', 'user'] };
    const stateClient = setup({ user: client });
    const stateAdmin = setup({ user: admin });

    expect(AuthSelectors.selectIsAdmin(stateClient)).toBe(false);
    expect(AuthSelectors.selectIsAdmin(stateAdmin)).toBe(true);
  });

  it('should select Token', () => {
    const token = { Authorization: 'test' };
    const state = setup();
    const stateTokenized = setup({ token });

    expect(AuthSelectors.selectToken(state)).toBe(initialState.token);
    expect(AuthSelectors.selectToken(stateTokenized)).toBe(token);
  });

  it('should select Authenticated', () => {
    const token = { Authorization: 'test' };
    const state = setup();
    const stateTokenized = setup({ token });

    expect(AuthSelectors.selectAuthenticated(state)).toBe(false);
    expect(AuthSelectors.selectAuthenticated(stateTokenized)).toBe(true);
  });
});

function setup(state?: Partial<AuthState>) {
  return {
    [AUTH_FEATURE_KEY]: { ...initialState, ...state },
  };
}
