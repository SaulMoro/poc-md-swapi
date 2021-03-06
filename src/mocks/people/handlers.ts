import { rest } from 'msw';
import { data } from './data';

const API_PATCH = 'https://swapi.dev/api/people/';

export const PeopleHandlers = [
  // details
  rest.get(`${API_PATCH}:id/`, (req, res, ctx) => {
    const { id } = req.params;
    const people = data.find((p) => p.url.endsWith(`/${id}/`));

    return people
      ? res(ctx.delay(), ctx.status(200), ctx.json(people))
      : res(ctx.delay(), ctx.status(404), ctx.json({ error: 'not found' }));
  }),
];
