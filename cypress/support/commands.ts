// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { fakerEN as faker } from '@faker-js/faker';

// Custom command to read and write JSON files
Cypress.Commands.add('readJSONFile' as keyof Cypress.Chainable, (filePath: string, data?: Record<string, unknown>) => {
  return cy.task('readJSON', filePath).then((jsonContent) => {
    if (data) {
      const updatedJson = Array.isArray(jsonContent) ? [...jsonContent, data] : [data];
      return cy.task('writeJSON', {
        filePath,
        data: updatedJson,
      });
    }
    return jsonContent;
  });
});

// Custom command to read and write CSV files
Cypress.Commands.add('readCSVFile' as keyof Cypress.Chainable, (filePath: string, data?: Record<string, unknown>) => {
  return cy.task('readCSV', filePath).then((csvRows) => {
    if (data) {
      const newRow = Object.values(data).map((value) => String(value));
      (csvRows as string[][]).push(newRow);
      return cy.task('writeCSV', {
        filePath,
        data: csvRows,
      });
    }
    return csvRows;
  });
});

// Custom command for login session
Cypress.Commands.add('loginSession', (cacheKey = 'userAuth') => {
  cy.session(cacheKey, () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.visit('https://ecommerce-playground.lambdatest.io/index.php');
    cy.get('.dropdown-hoverable').find('.info').find('span').filter(':contains("My account")').trigger('mouseover');
    cy.get('.mz-sub-menu-96').find('.info').find('span').filter(':contains("Login")').click();
    cy.contains('E-Mail Address').siblings('.form-control').type(email);
    cy.contains('Forgotten Password').prev('[placeholder="Password"]').type(password);
    cy.get('form').children('input[type="submit"]').click();
  });
});

// Extend the Cypress namespace
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      readJSONFile(filePath: string, data?: Record<string, unknown>): Chainable<any>;
      readCSVFile(filePath: string, data?: Record<string, unknown>): Chainable<any>;
      loginSession(cacheKey?: string): Chainable<void>;
    }
  }
}
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
