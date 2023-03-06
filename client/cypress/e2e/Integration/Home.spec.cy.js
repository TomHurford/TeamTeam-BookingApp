describe('Home', () => {
  it('Simulate purchase', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Welcome to Ticketopia')

    cy.contains('Event 1').click({force: true})

    cy.url().should('include', 'event-details?eventId=1')

    cy.get("button[name='PAID']").click()
    cy.get("button[name='PAID']").click()
    cy.get("button[name='PAID']").click()

    cy.get('[data-testid="basket-icon"]').click()
    
    cy.url().should('include', 'basket')

    cy.contains('Remove').click()

    cy.contains('Total: $20')
  })
})