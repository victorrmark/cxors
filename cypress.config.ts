import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://cxors.vercel.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
