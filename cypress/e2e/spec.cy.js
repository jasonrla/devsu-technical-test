const { getCurrentDate } = require('../../utils');

describe('E-commerce Purchase Process', () => {

  let products;

  const addProductToCart = (product) => {
    cy.contains(product.name).should('exist')
    cy.contains(product.price).should('exist')
    cy.contains(product.name).click()
    cy.url().should('include', `prod.html?idp_=${product.id}`)
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added')
    })
  };

  beforeEach(() => {
    cy.visit('/')
    cy.fixture('products.json').then((loadedProducts) => {
      products = loadedProducts;
    });
  });

  it('Gets, types and asserts', () => {
    products.forEach(product => {
      addProductToCart(product);
      cy.contains('Home').click()
    });

    cy.contains('Cart').click()

    products.forEach(product => {
      cy.contains(product.name).should('exist')
      cy.contains(product.price).should('exist')
    });

    cy.contains('Place Order').click()

    cy.get('#orderModal').within(() => {
      cy.contains(products.reduce((a, b) => a + parseInt(b.price), 0).toString()).should('exist')
      
      cy.fixture('fixtures.json').then((data) => {
        cy.get('#name').type(data.name)
        cy.wait(500)
        cy.get('#country').type(data.country)
        cy.get('#city').type(data.city)
        cy.get('#card').type(data.card)
        cy.get('#month').type(data.month)
        cy.get('#year').type(data.year)
      })

      cy.contains('Purchase').click()
    })

    cy.get('.sweet-alert.visible.showSweetAlert').within(() => {
      cy.contains('Thank you for your purchase!').should('exist')
      cy.contains(products.reduce((a, b) => a + parseInt(b.price), 0).toString() + ' USD').should('exist')
      cy.fixture('fixtures.json').then((data) => {
        cy.contains(data.name)
        cy.contains(data.card)
        cy.contains(getCurrentDate())
      })
      cy.contains('OK').click()
    })

    cy.url().should('eq', Cypress.config().baseUrl + '/index.html')
  })
});
