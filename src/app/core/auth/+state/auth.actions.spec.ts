import { login, logout, signIn, unauthorized } from './auth.actions';

describe('Auth Actions', () => {
  it('should create Login action', () => {
    const action = login({ user: { email: 'test@test.com', password: 'test' } });
    expect(action.type).toEqual('[Login Page] Login');
    expect(action.user.email).toEqual('test@test.com');
    expect(action.user.password).toEqual('test');
  });

  it('should create Sign In action', () => {
    const action = signIn({ user: { email: 'test@test.com', password: 'test', name: 'test' } });
    expect(action.type).toEqual('[SignIn Page] Sign In');
    expect(action.user.email).toEqual('test@test.com');
    expect(action.user.password).toEqual('test');
    expect(action.user.name).toEqual('test');
  });

  it('should create Logout action', () => {
    const action = logout();
    expect(action.type).toEqual('[User Page] Logout');
  });

  it('should create Unauthorized action', () => {
    const action = unauthorized();
    expect(action.type).toEqual('[Auth Interceptor] Unauthorized');
  });
});
