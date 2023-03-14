describe('Basket', () => {
  it('Test basket without login', () => {
    cy.visit('/');

    // cy.get('nav[class="navbar"]').find('ul[class="right"]').find('li').eq(0).click();

    cy.wait(500)
    cy.contains('Event 1').click({force: true})
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()
    cy.get("div[data-testid='right10']").click()

    cy.contains('Go To Basket').click()

    cy.contains('Log In').click()
  });
});