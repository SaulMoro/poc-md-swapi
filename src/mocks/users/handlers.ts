import { rest } from 'msw';
import { LoginRequest, SignInRequest, UsersResponse } from '@md-starwars/core/auth';

const API_PATCH = 'https://rest-api-slim-php.herokuapp.com';

export const UsersHandlers = [
  // login
  rest.post(`${API_PATCH}/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ status: 'error' }));
    }
    if (!sessionStorage.getItem('is-signin')) {
      return res(ctx.status(400), ctx.json({ status: 'error', message: 'Login failed.' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: {
          Authorization: 'Bearer XQiOjE2MTMyMTc4ODIsImV4cCI6MTY',
        },
      } as UsersResponse),
    );
  }),

  // create
  rest.post(`${API_PATCH}/api/v1/users`, (req, res, ctx) => {
    const { email, password, name } = req.body as SignInRequest;

    if (!email || !password || !name) {
      return res(ctx.status(400), ctx.json({ status: 'error' }));
    }
    if (email === 'admin@admin.com') {
      return res(ctx.status(400), ctx.json({ status: 'error', message: 'Email already exists.' }));
    }

    sessionStorage.setItem('is-signin', 'true');
    return res(ctx.status(201), ctx.json({ status: 'success', message: { name, email } } as UsersResponse));
  }),
];
