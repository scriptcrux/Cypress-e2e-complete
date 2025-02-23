export const testSuites = {
  all: {
    description: "Run all tests",
    specs: ["cypress/e2e/**/*.cy.ts"], // Runs all tests
  },
  regression: {
    description: 'Full regression test suite',
    specs: [
      'cypress/e2e/**/*.cy.ts'
    ]
  },
  smoke: {
    description: 'Critical path smoke tests',
    specs: [
      'cypress/e2e/spec.cy.ts',
      'cypress/e2e/spec.handlingEnv.cy.ts'
    ]
  }
};