import { worker } from '../mocks/browser';

// add msw mock on dev environment && e2e tests
worker.start();

export const environment = {
  production: false,
  apiUrl: 'https://swapi.dev/api',
  authUrl: 'https://rest-api-slim-php.herokuapp.com',
  supportedLanguages: ['es'],
  defaultLanguage: 'es',
};
