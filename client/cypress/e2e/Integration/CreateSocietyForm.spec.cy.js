describe('Test Create Society Form', () => {
  it('Create Society form can be filled', () => {
    cy.visit('/create-society');
    // cy.get('button[name="create-society-button"]').click();
    // cy.contains('Create Society').click();
    cy.get('input[name="societyName"]').type('Test Society');
    cy.get('input[name="email"]').type('teat@email.com');
    cy.get('select[name="category"]').select('Sports');
    cy.get('input[name="website"]').type('https://www.test.com');
    cy.get('input[name="instagram"]').type('https://www.instagram.com');
    cy.get('input[name="twitter"]').type('https://www.twitter.com');
    cy.get('input[name="facebook"]').type('https://www.facebook.com');
    cy.get('input[name="logo"]').type('https://www.logo.com');
    cy.get('input[name="banner"]').type('https://www.banner.com');
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,');
    // cy.get('button').click();
  })
  it('Fill invalid values', () => {
    cy.visit('/create-society');
    cy.get('input[name="societyName"]')
    cy.get('input[name="email"]').type('email.com');
    cy.get('input[name="website"]').type('www.test.com');
    cy.get('input[name="instagram"]').type('www.instagram.com');
    cy.get('input[name="twitter"]').type('www.twitter.com');
    cy.get('input[name="facebook"]').type('www.facebook.com');
    cy.get('input[name="logo"]').type('www.logo.com');
    cy.get('input[name="banner"]').type('www.banner.com');
    cy.get('textarea[name="description"]').type('This is a test society ');
    cy.get('button').click();
  })
  it('Society can be created', () => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const randomString = (length) => {
      let result = '';
      const charactersLength = alphabets.length;
      for (let i = 0; i < length; i++) {
        result += alphabets.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    cy.visit('/login');
    cy.get('input[name="loginEmail"]').type('admin@admin.com');
    cy.get('input[name="loginPassword"]').type('admin123');
    cy.get('button[name="loginbutton"]').click();
    cy.wait(200);
    cy.visit('/create-society');
    cy.get('input[name="societyName"]').type(randomString(10));
    cy.get('input[name="email"]').type(randomString(10) + '@' + randomString(5) + '.com');
    cy.get('textarea[name="description"]').type(randomString(50));

    cy.get('button').click();

    cy.url().should('include', '/society');
  })
})