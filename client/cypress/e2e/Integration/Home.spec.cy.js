/**describe('Home', () => {
  it('Simulate purchase', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Perfect Tickets? Perfect Time.')

    cy.contains('Event 1').click({force: true})

    cy.url().should('include', 'event-details?eventId=1')

    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='left10']").click()

    // cy.get('[data-testid="basket-icon"]').click()
    cy.visit('/basket')
    
    cy.url().should('include', 'basket')

    // cy.contains('Remove').click()

    // cy.contains('Total: £30')
  })
})*/