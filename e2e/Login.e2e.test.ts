import '@testing-library/cypress/add-commands';

describe('Login', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1251, 882);
  });

  describe('given error if login with bad user', () => {
    before(() => {
      cy.findByRole('button', { name: /Iniciar/i }).click();
    });

    it('should display form', () => {
      cy.findByText(/Introduzca su correo y contraseña/i);
    });

    it('should fail if login without prev sign in', () => {
      cy.findByLabelText(/E-mail/i).type('test@test.com');
      cy.findByLabelText(/Contraseña/i).type('testtest{enter}');
      cy.findByText(/La combinación de usuario /i);
    });
  });
});
