describe('Test Edit Society Form', () => {
  it('Fill invalid details', () => {
    cy.visit('/societies');

    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('incorrectwebsite', { force: true });
    cy.get('input[name="instagram"]').type('incorrectinstagram', { force: true });
    cy.get('input[name="twitter"]').type('incorrecttwitter', { force: true });
    cy.get('input[name="facebook"]').type('incorrectfacebook', { force: true });
    cy.get('input[name="logo"]').type('incorrectlogo', { force: true });
    cy.get('input[name="banner"]').type('incorrectbanner', { force: true });
    cy.get('textarea[name="description"]').type('incorrectdescription', { force: true });

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

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });

    cy.contains('Save').click();
  })
})