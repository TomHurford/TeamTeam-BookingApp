describe('Basket', () => {

  it('Simulate purchase with login',() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/event-details?eventId=1')

    cy.wait(500)
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()

    cy.wait(500)
    cy.contains('Go To Basket').click()

    cy.wait(500)
    cy.get("div[data-testid='left10']").click()

    cy.contains('Checkout').click()

    cy.wait(500)
    cy.url().should('include', '/tickets')

    cy.contains('Logout').click()
  })

  it('Simulate purchase without login',() => {
    cy.visit('/event-details?eventId=1')

    cy.wait(500)
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()

    cy.wait(500)
    cy.contains('Go To Basket').click()

    cy.wait(500)
    cy.contains('Log In').click()
  });

  it('Add tickets of a different event to basket',() => {
    cy.visit('/event-details?eventId=1')

    cy.wait(500)
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()

    cy.wait(500)

    cy.visit('/event-details?eventId=3')
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
  })

  it('Click remove ticket button on empty basket',() => {
    cy.visit('/event-details?eventId=1')
    cy.wait(500)

    cy.get("div[data-testid='left10']").click()
    cy.get("div[data-testid='left10']").click()
  })
})