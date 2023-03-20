/**describe('User Experience', () => {
  it('Simulate a user experience', () => {
    cy.visit('/');
    // cy.wait(1000)

    cy.contains('Login').click();
    // cy.wait(1000)

    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    // cy.wait(1000)

    
    cy.get('input[name="loginPassword"]').type('admin123')
    // cy.wait(1000)
    cy.get('button[name="loginbutton"]').click();

    // cy.wait(1000)

    cy.contains('Event 1').click({force: true})
    // cy.wait(1000)

    cy.get("div[data-testid='right10']").click()
    // cy.wait(500)
    cy.get("div[data-testid='right10']").click()
    // cy.wait(500)
    cy.get("div[data-testid='right10']").click()
    // cy.wait(500)

    cy.contains('Go To Basket').click()
    // cy.wait(500)

    cy.contains('Checkout').click()
  })
})*/