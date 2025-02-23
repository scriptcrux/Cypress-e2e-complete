describe('login test', () => {
  it('visit kitchen sink', () => {
    // Using environment-specific baseUrl from config
    cy.visit(Cypress.env('baseUrl'));
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');

    // Using environment-specific credentials
    cy.get('.action-email').type(Cypress.env('credentials.email'));

    // cy.get('.action-email').should('have.value', Cypress.env('credentials.email'));

    /* 2 
      added test-suite.ts file for handling suites and test
      added env file for each environment
      added scripts for each environment
    */

    //* 3 added jenkins file */

    /* 4 added GH actions file */

    /* 5 added gitlab CICD file */
  });
});
