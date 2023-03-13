describe('Test Search Events', () => {
  it('No events are shown if nothing is typed in', () => {
    // cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-testid="search-bar"]').trigger('keydown', { keyCode: 13, which: 13 });
    cy.url().should('include', '?name=');
    cy.get('[data-testid="search-bar"]').type('Event 1',{force:true}).trigger('keydown', { keyCode: 13, which: 13, force: true});
    cy.url().should('include', '?name=Event%201');
    cy.contains('Event 1').click({force: true});
  })
  it('Events can be searched if typed in', () => {
    cy.visit('/');
    // cy.get('[data-testid="search-bar"]').type('Event 1').trigger('keydown', { keyCode: 13, which: 13 });
    // cy.get('[data-testid="search-bar"]').type('Event 1');
    // cy.get('[data-testid="search-bar"]').type('Event',{force:true}).trigger('keydown', { keyCode: 13, which: 13, force: true})
    cy.get('[data-testid="search-bar"]').type('Event 1').wait(1000).trigger('keydown', { keyCode: 13, which: 13 });
    cy.url().should('include', '?name=Event%201');
  })
})