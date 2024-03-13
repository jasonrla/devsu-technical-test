# E2E and API Testing Project

This project contains E2E and API tests using Cypress, in both cases the option 1 was chosen: `demoblaze.com`.

In order to have the code mantainable, data and selectors have their own file.

In case of E2E tests, the data is stored in `fixtures/e2e/fixtures.json`, and the list of products to be tested are in `fixtures/e2e/products.json`. 

To interact with the DOM the selectors used are in `integration/e2e/selectors.js`, and finally customized functions to 'add to cart' and 'fill the form' were created in `support/commands.js`.

For API tests, the data used is stored in `fixtures/api/testData.json`.


## Requirements

- Node.js installed on your system `v21.6.2`.
- Cypress installed in your project `v13.7.0`. If you do not have it installed, you can do it with the following command:

```bash
npm install cypress --save-dev
```

## Running the tests
### E2E Tests
To run the E2E tests, follow these steps:

1. Open your terminal.
2. Navigate to your project directory.
3. Run the following command:

```bash
npx cypress open
```

4. In the Cypress window that opens, select E2E Testing option.
5. Let chrome as default browser and then click on `Start E2E Testing in Chrome` option
6. A Chrome browser will open, click on `spec.cy.js`, to run the E2E tests.

**Note:**
To run in headless mode:

```bash
npx cypress run --spec "cypress/integration/e2e/spec.cy.js"
```

### API Tests
To run the API tests:

1. Follow the previous five steps
2. In the Cypress window that opens, click on `api.cy.js` to run the API tests.

**Note:**
To run in headless mode:

```bash
npx cypress run --spec "cypress/integration/api/api.cy.js"
```