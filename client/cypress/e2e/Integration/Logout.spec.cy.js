describe('Logout', () => {
  it('should logout', () => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()

    cy.contains('Logout').click({force: true})
    // cy.visit('/logout')
  })
})