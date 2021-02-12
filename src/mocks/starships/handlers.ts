import { rest } from 'msw';
import { environment } from '@md-starwars/environment';
import * as pageOne from './page-one.json';
import * as pageTwo from './page-two.json';

const API_PATCH = `${environment.apiUrl}/starships/`;

const dataPaginated: { [page: string]: any } = {
  '1': pageOne,
  '2': pageTwo,
};

export const StarshipsHandlers = [
  // list
  rest.get(API_PATCH, (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const pageData = page ? dataPaginated[page] : pageOne;

    return pageData ? res(ctx.status(200), ctx.json(pageData)) : res(ctx.status(404), ctx.json('error'));
  }),

  // details
  rest.get(`${API_PATCH}:id/`, (req, res, ctx) => {
    const { id } = req.params;
    const startship = Object.values(dataPaginated).filter((pageData) => pageData.results.url.endsWith(`/${id}/`));

    return startship ? res(ctx.status(200), ctx.json(startship)) : res(ctx.status(404), ctx.json('error'));
  }),
];
