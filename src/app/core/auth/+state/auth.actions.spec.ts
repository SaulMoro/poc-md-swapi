import {
  enterLoginSidebar,
  enterSignInPage,
  login,
  loginOnSignInPage,
  logout,
  signIn,
  unauthorized,
} from './auth.actions';

describe('Auth Actions', () => {
  it('should create Enter Login Sidebar action', () => {
    const action = enterLoginSidebar();
    expect(action.type).toEqual('[Login Sidebar] Enter Login Sidebar');
  });

  it('should create Login action', () => {
    const action = login({ user: { email: 'test@test.com', password: 'test' } });
    expect(action.type).toEqual('[Login Sidebar] Login');
    expect(action.user.email).toEqual('test@test.com');
    expect(action.user.password).toEqual('test');
  });

  it('should create Enter Sign In Page action', () => {
    const action = enterSignInPage();
    expect(action.type).toEqual('[SignIn Page] Enter Sign In Page');
  });

  it('should create Click Login On Sign In Page action', () => {
    const action = loginOnSignInPage();
    expect(action.type).toEqual('[SignIn Page] Click Login On Sign In Page');
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
