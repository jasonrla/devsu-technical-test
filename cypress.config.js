const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.js',
    baseUrl: 'https://demoblaze.com',
    apiBaseUrl: 'https://api.demoblaze.com',
    setupNodeEvents(on, config) {
    },
    "defaultCommandTimeout": 5000
  },
  
});
