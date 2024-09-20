import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://cxors.vercel.app",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
