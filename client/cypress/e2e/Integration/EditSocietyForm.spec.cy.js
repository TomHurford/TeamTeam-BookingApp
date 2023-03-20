describe('Test Edit Society Form', () => {
  it('No forms filled', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').click();
    cy.contains('button','Edit Society').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contains('Please fill in at least one field')
    })
  })
 
  it('Fill invalid website', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').click();

    cy.get('input[name="website"]').type('incorrectwebsite', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('button','Edit Society').click();
    
  })
  
  it('Fill invalid instagram', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('incorrectinstagram', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('button','Edit Society').click();
    
  })

  it('Fill invalid twitter', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('incorrecttwitter', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('Edit Society').click();
    
  })

  it('Fill invalid facebook', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('incorrectfacebook', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('button','Edit Society').click();
    
  })

  it('Fill invalid logo', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('incorrectlogo', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('button','Edit Society').click();
    
  })

  it('Fill invalid banner', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('incorrectbanner', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });
    cy.contains('Must be a valid URL');
    cy.contains('button','Edit Society').click();
  })

  it('Fill invalid description', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society', { force: true });
    cy.contains('button','Edit Society').click();
    cy.contains('Society description must be at least 50 characters');
    
  })


  it('Manipulate committee members', () => {
    cy.visit('/societies');
    cy.contains('Schaden - Wehner').click();
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
    cy.contains('Schaden - Wehner').click();
    cy.contains('Edit Society').parent().click();

    cy.get('input[name="website"]').type('https://www.test.com', { force: true });
    cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
    cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
    cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
    cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
    cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
    cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });

    cy.contains('button','Edit Society').click();
  })

  
})
