const { randomUserCredential } = require('../api/utils');

const API_BASE_URL = Cypress.config('apiBaseUrl');
const SIGNUP_URL = `${API_BASE_URL}/signup`;
const LOGIN_URL = `${API_BASE_URL}/login`;

describe('API Tests', () => {

    let testData;

    before(() => {
        cy.fixture('api/testData.json').then((data) => {
            testData = data;
        });
    });

    it('Create new user', () => {
        const item = randomUserCredential();

        cy.request('POST', SIGNUP_URL, item)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.include(testData.newUser.expectedResult.response)
            });
    });

    it('Try creating existing user', () => {
        cy.request('POST', SIGNUP_URL, testData.existingUser.credentials)
            .then((response) => {
                cy.log(response.body);
                expect(response.status).to.eq(testData.existingUser.expectedResult.status);
                expect(response.body).to.deep.equal(testData.existingUser.expectedResult.response);
            });
    });

    it('Login with correct credentials', () => {
        cy.request('POST', LOGIN_URL, testData.correctCredentials.credentials)
            .then((response) => {
                cy.log(response.body);
                expect(response.status).to.eq(testData.correctCredentials.expectedResult.status);
                expect(response.body).to.include(testData.correctCredentials.expectedResult.response)
            });
    });

    it('Login with incorrect credentials', () => {
        cy.request('POST', LOGIN_URL, testData.incorrectCredentials.credentials)
            .then((response) => {
                cy.log(response.body);
                expect(response.status).to.eq(testData.incorrectCredentials.expectedResult.status);
                expect(response.body).to.deep.equal(testData.incorrectCredentials.expectedResult.response);
            });
    });
});

