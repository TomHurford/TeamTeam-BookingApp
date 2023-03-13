describe('Test Search Societies', () => {
  it('Search societies', () => {
    cy.visit('/societies');
    cy.get('div[data-testid="searchbar"]').children().get('input').type('Society 1', {force:true});
    // cy.get('div[data-testid="searchbar"]').children().find('input',{force:true}).type('Society 1');

    cy.contains('All').click();
    cy.get('div[data-testid="pagination"]').contains('2').click();
    cy.contains('Sports').click({force:true});

    cy.contains('All').click();
    // cy.contains('Society 1').click();
  })
})