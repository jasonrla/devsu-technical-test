const { getCurrentDate } = require('../e2e/utils');
const { selectors, text } = require('../e2e/selectors');

const fixturePath = 'e2e/fixtures.json';
const producsPath = 'e2e/products.json';
const mainPagePath = '/index.html';
const productDetailsPageTemplate = 'prod.html?idp_=';

describe('E-commerce Purchase Process', () => {

  let products;

  beforeEach(() => {
    cy.visit('/')
    cy.fixture(producsPath).then((loadedProducts) => {
      products = loadedProducts;
    });
  });

  it('Completes form and initiates purchase', () => {
    products.forEach(product => {
      cy.addProductToCart(product, text, productDetailsPageTemplate);
      cy.contains(text.homeTabText).click() 
    });

    cy.contains(text.cartTabText).click() 

    products.forEach(product => {
      cy.contains(product.name).should('exist')
      cy.contains(product.price).should('exist')
    });

    cy.contains(text.placeOrderText).click()

    cy.fillAndSubmitForm(selectors, fixturePath, products, text);

    cy.get(selectors.alert).within(() => {
      cy.contains(text.purchaseSuccessText).should('exist')
      cy.contains(products.reduce((a, b) => a + parseInt(b.price), 0).toString() + ' USD').should('exist')
      cy.fixture(fixturePath).then((data) => {
        cy.contains(data.name)
        cy.contains(data.card)
        cy.contains(getCurrentDate())
      })
      cy.contains(text.purchaseOKText).click()
    })

    cy.url().should('eq', Cypress.config().baseUrl + mainPagePath)
  })
});
