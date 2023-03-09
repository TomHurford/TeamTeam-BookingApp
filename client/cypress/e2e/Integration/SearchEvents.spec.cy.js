describe('Test Search Events', () => {
  it('No events are shown if nothing is typed in', () => {
    cy.visit('/');
    cy.get('[data-testid="search-bar"]').trigger('keydown', { keyCode: 13, which: 13 });
    cy.url().should('include', '?name=');
    cy.get('[data-testid="search-bar"]').type('Event 1').trigger('keydown', { keyCode: 13, which: 13 });
    cy.url().should('include', '?name=Event%201');
    cy.contains('Event 1').click({force: true});
  })
  it('Events can be searched if typed in', () => {
    cy.visit('/');
    cy.get('[data-testid="search-bar"]').type('Event 1').trigger('keydown', { keyCode: 13, which: 13 });
    cy.url().should('include', '?name=Event%201');
  })
})