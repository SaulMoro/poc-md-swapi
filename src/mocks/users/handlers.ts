import { rest } from 'msw';
import { AuthToken, LoginRequest, SignInRequest, User, UsersApiResponse } from '@md-starwars/core/auth/models';

const API_PATCH = 'https://rest-api-slim-php.herokuapp.com';

export const UsersHandlers = [
  // login
  rest.post(`${API_PATCH}/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res(ctx.delay(2000), ctx.status(400), ctx.json({ status: 'error' }));
    }
    if (!sessionStorage.getItem('is-signin')) {
      return res(ctx.delay(2000), ctx.status(400), ctx.json({ status: 'error', message: 'Login failed.' }));
    }

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        code: 200,
        status: 'success',
        message: {
          Authorization: 'Bearer XQiOjE2MTMyMTc4ODIsImV4cCI6MTY',
        },
      } as UsersApiResponse<AuthToken>),
    );
  }),

  // create
  rest.post(`${API_PATCH}/api/v1/users`, (req, res, ctx) => {
    const { email, password, name } = req.body as SignInRequest;

    if (!email || !password || !name) {
      return res(ctx.delay(2000), ctx.status(400), ctx.json({ status: 'error' }));
    }
    if (email === 'admin@admin.com') {
      return res(ctx.delay(2000), ctx.status(400), ctx.json({ status: 'error', message: 'Email already exists.' }));
    }

    sessionStorage.setItem('is-signin', 'true');
    return res(
      ctx.delay(),
      ctx.status(201),
      ctx.json({ code: 201, status: 'success', message: { name, email } } as UsersApiResponse<User>),
    );
  }),
];
