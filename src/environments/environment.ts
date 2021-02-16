import { worker } from '../mocks/browser';

// add msw mock on dev environment && e2e tests
worker.start();

export const environment = {
  production: false,
  apiUrl: 'https://swapi.dev/api',
  authUrl: 'https://rest-api-slim-php.herokuapp.com',
  swapiAssets: 'https://starwars-visualguide.com/assets/img/starships/',
  supportedLanguages: ['es'],
  defaultLanguage: 'es',
};
