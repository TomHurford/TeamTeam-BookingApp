describe('Test View Society', () => {
  it('View society', () => {
    cy.visit('/society/1');
    cy.get('div[data-testid="event1"]').children().click();
  })
})