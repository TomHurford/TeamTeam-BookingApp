describe('Test Create Society Form', () => {
  it('Create Society form can be filled', () => {
    cy.visit('/create-society');
    // cy.get('button[name="create-society-button"]').click();
    // cy.contains('Create Society').click();
    cy.get('input[name="societyName"]').type('Test Society');
    cy.get('input[name="website"]').type('https://www.test.com');
    cy.get('input[name="instagram"]').type('https://www.instagram.com');
    cy.get('input[name="twitter"]').type('https://www.twitter.com');
    cy.get('input[name="facebook"]').type('https://www.facebook.com');
    cy.get('input[name="logo"]').type('https://www.logo.com');
    cy.get('input[name="banner"]').type('https://www.banner.com');
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim ipsum vitae neque rhoncus, vitae feugiat metus lobortis. Phasellus et. ');
    cy.get('button').click();
  })
  it('Fill invalid values', () => {
    cy.visit('/create-society');
    cy.get('input[name="societyName"]')
    cy.get('input[name="website"]').type('www.test.com');
    cy.get('input[name="instagram"]').type('www.instagram.com');
    cy.get('input[name="twitter"]').type('www.twitter.com');
    cy.get('input[name="facebook"]').type('www.facebook.com');
    cy.get('input[name="logo"]').type('www.logo.com');
    cy.get('input[name="banner"]').type('www.banner.com');
    cy.get('textarea[name="description"]').type('This is a test society ');
    cy.get('button').click();
  })
})