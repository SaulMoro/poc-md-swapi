import '@testing-library/cypress/add-commands';

describe('App smoke test', () => {
  before(() => {
    cy.visit('/');
  });
});
