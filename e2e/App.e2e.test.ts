import '@testing-library/cypress/add-commands';

describe('App smoke test', () => {
  before(() => {
    cy.visit('/');
  });

  it('should display app', () => {
    cy.findByText(/Este mensaje solo se mostrará la primera vez/i);
  });
});
