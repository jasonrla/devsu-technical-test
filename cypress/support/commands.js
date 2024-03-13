Cypress.Commands.add('addProductToCart', (product, text, productDetailsPageTemplate) => {
    cy.contains(product.name).should('exist')
    cy.contains(product.price).should('exist')
    cy.contains(product.name).click()
    cy.url().should('include', `${productDetailsPageTemplate}${product.id}`)
    
    cy.contains(text.addToCartText).click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal(text.productAddedText)
    })
});

Cypress.Commands.add('fillAndSubmitForm', (selectors, fixturePath, products, text) => {
    cy.get(selectors.orderModal).within(() => {
    cy.contains(products.reduce((a, b) => a + parseInt(b.price), 0).toString()).should('exist')

    cy.fixture(fixturePath).then((data) => {
    cy.get(selectors.nameInput).type(data.name)
    cy.wait(500)
    cy.get(selectors.countryInput).type(data.country)
    cy.get(selectors.cityInput).type(data.city)
    cy.get(selectors.cardInput).type(data.card)
    cy.get(selectors.monthInput).type(data.month)
    cy.get(selectors.yearInput).type(data.year)
    })

    cy.contains(text.purchaseButtonText).click()
})
});