import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      config.env.baseUrl = process.env.CYPRESS_BASE_URL || 'http://localhost:3000';
      config.env.email = process.env.CYPRESS_EMAIL || config.env.email;
      config.env.password = process.env.CYPRESS_PASSWORD || config.env.password;
      return config
      // implement node event listeners here
    },
  },

  component: {
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
