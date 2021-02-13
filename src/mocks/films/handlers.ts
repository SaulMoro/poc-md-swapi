import { rest } from 'msw';
import { data } from './data';

const API_PATCH = 'https://swapi.dev/api/films/';

export const FilmsHandlers = [
  // details
  rest.get(`${API_PATCH}:id/`, (req, res, ctx) => {
    const { id } = req.params;
    const film = data.filter((f) => f.url.endsWith(`/${id}/`));

    return film ? res(ctx.status(200), ctx.json(film)) : res(ctx.status(404), ctx.json({ error: 'not found' }));
  }),
];
