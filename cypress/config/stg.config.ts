import { defineConfig } from 'cypress';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    env: {
      environment: 'stg',
      baseUrl: 'https://stg.example.cypress.io',
      apiUrl: 'https://stg-api.example.com',
      credentials: {
        email: 'stg@example.com',
        password: 'stgpass123'
      }
    },
    defaultCommandTimeout: 5500,
    pageLoadTimeout: 35000,
    requestTimeout: 6000,
    responseTimeout: 35000,
    execTimeout: 70000
  }
});