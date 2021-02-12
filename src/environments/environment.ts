import { worker } from '../mocks/browser';

// add msw mock on dev environment && e2e tests
worker.start();

export const environment = {
  production: false,
  apiUrl: 'https://swapi.dev/api',
  supportedLanguages: ['es'],
  defaultLanguage: 'es',
};
