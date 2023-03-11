describe('Test Edit Society Form', () => {
  it('Fill invalid details', () => {
    cy.visit('/societies');

    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('incorrectwebsite');
    cy.get('input[name="instagram"]').type('incorrectinstagram');
    cy.get('input[name="twitter"]').type('incorrecttwitter');
    cy.get('input[name="facebook"]').type('incorrectfacebook');
    cy.get('input[name="logo"]').type('incorrectlogo');
    cy.get('input[name="banner"]').type('incorrectbanner');
    cy.get('textarea[name="description"]').type('incorrectdescription');

    cy.contains('Save').click();
  })
  it('Manipulate committee members', () => {
    cy.visit('/societies');

    cy.contains('Edit Society').parent().click();
    
    cy.contains('Committee Members').parent().find('input').type('test');
    cy.contains('Committee Members').parent().contains('Add Member').parent().find('button').click();

    cy.contains('Committee Members').parent().find('input').type('test@email.com');
    cy.contains('Committee Members').parent().contains('Add Member').parent().find('button').click();

    cy.contains('Committee Members').parent().contains('Remove').parent().find('button').click();

    cy.contains('Committee Members').parent().contains('Remove').parent().find('button').click();
    cy.contains('Committee Members').parent().contains('Remove').parent().find('button').click();
    cy.contains('Committee Members').parent().contains('Remove').parent().find('button').click();
  })
  it('Fill valid details', () => {
    cy.visit('/societies');

    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('https://www.test.com');
    cy.get('input[name="instagram"]').type('https://www.instagram.com');
    cy.get('input[name="twitter"]').type('https://www.twitter.com');
    cy.get('input[name="facebook"]').type('https://www.facebook.com');
    cy.get('input[name="logo"]').type('https://www.logo.com');
    cy.get('input[name="banner"]').type('https://www.banner.com');
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,');

    cy.contains('Save').click();
  })
})