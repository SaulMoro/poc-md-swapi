import { rest } from 'msw';
import { pageOne } from './page-one.data';
import { pageTwo } from './page-two.data';

const API_PATCH = 'https://swapi.dev/api/starships/';

const dataPaginated: { [page: string]: any } = {
  '1': pageOne,
  '2': pageTwo,
};

export const StarshipsHandlers = [
  // list
  rest.get(API_PATCH, (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const pageData = page ? dataPaginated[page] : pageOne;

    return pageData
      ? res(ctx.delay(1500), ctx.status(200), ctx.json(pageData))
      : res(ctx.delay(1500), ctx.status(404), ctx.json({ error: 'not found' }));
  }),

  // details
  rest.get(`${API_PATCH}:id/`, (req, res, ctx) => {
    const { id } = req.params;
    const [starship] = Object.values(dataPaginated).map((pageData) =>
      (pageData as typeof pageOne | typeof pageTwo).results.find((ship) => ship.url.endsWith(`/${id}/`)),
    );

    return starship
      ? res(ctx.delay(1500), ctx.status(200), ctx.json(starship))
      : res(ctx.delay(1500), ctx.status(404), ctx.json({ error: 'not found' }));
  }),
];
