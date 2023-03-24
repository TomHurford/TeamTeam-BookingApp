const { after } = require("lodash");

describe('Ticket Purchase page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    // cy.contains('Tickets').click()
    cy.visit('/tickets')
    cy.wait(1000)
  });
  afterEach(() => {
    cy.wait(1000)
    cy.contains('Logout').click()
  });

  it('Should display the Past Events Purchases header', () => {
    cy.contains('Past Event Purchases')
  });

  it('Should display the Upcoming Events Purchases header', () => {
    cy.contains('Upcoming Event Purchases')
  });

  it('Should display the Past Events Purchases table', () => {
    cy.contains('Past Event Purchases').parent()
  });

  it('Should display the Upcoming Events Purchases table', () => {
    cy.contains('Upcoming Event Purchases').parent()
  });
});