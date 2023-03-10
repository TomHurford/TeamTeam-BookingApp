describe('Test Search Societies', () => {
  it('Search societies', () => {
    cy.visit('/societies');
    cy.get('div[data-testid="searchbar"]').type('Society 1');

    cy.contains('All').click();
    cy.get('div[data-testid="pagination"]').contains('2').click();
    cy.contains('Sports').click();
  })
})