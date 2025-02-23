import { defineConfig } from 'cypress';
import * as fs from 'fs/promises';
import { testSuites } from './test-suites';

export const baseConfig = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // File operation utility functions
      const readFileCSV = async (filePath: string, config: any): Promise<string[][]> => {
        try {
          const csvContent = await fs.readFile(filePath, 'utf8');
          const rows = csvContent
            .trim()
            .split('\n')
            .map((row) => row.split(','));
          return rows;
        } catch (error) {
          console.error(`Error reading CSV file: ${error}`);
          throw error;
        }
      };

      const writeFileCSV = async (filePath: string, data: string[][], config: any): Promise<null> => {
        try {
          const csvContent = data.map((row) => row.join(',')).join('\n');
          await fs.writeFile(filePath, csvContent, 'utf8');
          return null;
        } catch (error) {
          console.error(`Error writing CSV file: ${error}`);
          throw error;
        }
      };

      const readFileJSON = async <T>(filePath: string, config: any): Promise<T> => {
        try {
          const jsonContent = await fs.readFile(filePath, 'utf8');
          return JSON.parse(jsonContent);
        } catch (error) {
          console.error(`Error reading JSON file: ${error}`);
          throw error;
        }
      };

      const writeFileJSON = async <T>(filePath: string, data: T, config: any): Promise<null> => {
        try {
          await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
          return null;
        } catch (error) {
          console.error(`Error writing JSON file: ${error}`);
          throw error;
        }
      };

      // Register file operation tasks
      on('task', {
        readCSV: (filePath: string) => readFileCSV(filePath, {}),
        writeCSV: ({ filePath, data }: { filePath: string; data: string[][] }) => writeFileCSV(filePath, data, {}),
        readJSON: (filePath: string) => readFileJSON(filePath, {}),
        writeJSON: ({ filePath, data }: { filePath: string; data: any }) => writeFileJSON(filePath, data, {}),
      });

      // Handle test suite configuration
      const testSuiteName = process.env.CYPRESS_TEST_SUITE || 'all';
      const suite = testSuites[testSuiteName];

      if (suite) {
        config.specPattern = suite.specs;
        console.log(`Running test suite: ${testSuiteName}`);
        console.log(`Suite description: ${suite.description}`);
        console.log(`Spec pattern: ${suite.specs}`);
      }

      return config;
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://example.cypress.io',
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 30000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    execTimeout: 60000,
  },
});
