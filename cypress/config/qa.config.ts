import { defineConfig } from 'cypress';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    env: {
      environment: 'qa',
      baseUrl: 'https://qa.example.cypress.io',
      apiUrl: 'https://qa-api.example.com',
      credentials: {
        email: 'qa@example.com',
        password: 'qapass123'
      }
    },
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 40000,
    requestTimeout: 7000,
    responseTimeout: 40000,
    execTimeout: 75000
  }
});