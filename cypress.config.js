import { defineConfig } from 'cypress';

export default defineConfig({
  pageLoadTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8888/',
    experimentalSessionAndOrigin: true,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
  video: false,
  screenshotOnRunFailure: true,
});
