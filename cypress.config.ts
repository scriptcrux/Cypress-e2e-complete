import { defineConfig } from 'cypress';
import * as fs from 'fs/promises';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Generic function to read CSV files
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

      // Generic function to write CSV files
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

      // Generic function to read JSON files
      const readFileJSON = async <T>(filePath: string, config: any): Promise<T> => {
        try {
          const jsonContent = await fs.readFile(filePath, 'utf8');
          return JSON.parse(jsonContent);
        } catch (error) {
          console.error(`Error reading JSON file: ${error}`);
          throw error;
        }
      };

      // Generic function to write JSON files
      const writeFileJSON = async <T>(filePath: string, data: T, config: any): Promise<null> => {
        try {
          await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
          return null;
        } catch (error) {
          console.error(`Error writing JSON file: ${error}`);
          throw error;
        }
      };

      // Register the functions to be used in tests
      on('task', {
        readCSV: (filePath: string) => readFileCSV(filePath, {}),
        writeCSV: ({ filePath, data }: { filePath: string; data: string[][] }) => writeFileCSV(filePath, data, {}),
        readJSON: (filePath: string) => readFileJSON(filePath, {}),
        writeJSON: ({ filePath, data }: { filePath: string; data: any }) => writeFileJSON(filePath, data, {}),
      });
    },
  },
});
