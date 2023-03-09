describe('Test Create Society Form', () => {
  it('Create Society form can be filled', () => {
    cy.visit('/create-society');
    cy.get('button[name="create-society-button"]').click();
  })
})