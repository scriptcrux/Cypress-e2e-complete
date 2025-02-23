import { defineConfig } from 'cypress';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    env: {
      environment: 'dev',
      baseUrl: 'https://example.cypress.io',
      apiUrl: 'https://dev-api.example.com',
      credentials: {
        email: 'dev@example.com',
        password: 'devpass123'
      }
    },
    defaultCommandTimeout: 6000,
    pageLoadTimeout: 45000,
    requestTimeout: 8000,
    responseTimeout: 45000,
    execTimeout: 90000
  }
});