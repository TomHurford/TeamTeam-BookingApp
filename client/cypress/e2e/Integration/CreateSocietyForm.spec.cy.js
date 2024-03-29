describe('Test Create Society Form', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/create-society');
  })
  afterEach(() => {
    cy.contains('Logout').click()
  })


    it('Create Society form can be filled', () => {
      cy.get('input[name="societyName"]').type('Test Society');
      cy.get('input[name="email"]').type('test@email.com');
      cy.get('select[name="category"]').select('Sports', {force: true});
      cy.get('input[name="website"]').type('https://www.test.com');
      cy.get('input[name="instagram"]').type('https://www.instagram.com');
      cy.get('input[name="twitter"]').type('https://www.twitter.com');
      cy.get('input[name="facebook"]').type('https://www.facebook.com');
      cy.get('input[name="logo"]').type('https://www.logo.com');
      cy.get('input[name="banner"]').type('https://www.banner.com');
      cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,');
      // cy.get('button').click();
    })
  describe('Empty inputs', () => {
    it('Empty value submit', () => {;
      cy.get('button').click();
      cy.contains('Society name is required')
      cy.contains('Must be a valid email address')
      cy.contains('Society description is required')
    })
  })
  describe('Whitespace inputs', () => {
    it('Whitespace name', () => {
      cy.get('input[name="societyName"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Society name must be at least 3 characters long')
    })
    it('Whitespace email', () => {
      
      cy.get('input[name="email"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid email address')
    })
    it('Whitespace website', () => {
     
      cy.get('input[name="website"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace instagram', () => {
      
      cy.get('input[name="instagram"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace twitter', () => {
      
      cy.get('input[name="twitter"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace facebook', () => {
      
      cy.get('input[name="facebook"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace logo', () => {
     
      cy.get('input[name="logo"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace banner', () => {
      
      cy.get('input[name="banner"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Whitespace description', () => {
   
      cy.get('textarea[name="description"]').type(' ');
      cy.contains('Create Society').click();
      cy.contains('Society description must be at least 50 characters.')
    })
  })
  describe('Invalid input', () => {
    
    it('Fill invalid name', () => {
      cy.get('input[name="societyName"]').type('FT');
      cy.contains('Create Society').click();
      cy.contains('Society name must be at least 3 characters long')
    })
    it('Fill invalid email', () => {
     
      cy.get('input[name="email"]').type('testemail.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid email address')
    })
    it('Fill invalid website', () => {
      cy.get('input[name="website"]').type('testwebsite.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill invalid instagram', () => {
      cy.get('input[name="instagram"]').type('testinstagram.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill invalid twitter', () => {
      cy.get('input[name="twitter"]').type('testtwitter.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill invalid facebook', () => {
      cy.get('input[name="facebook"]').type('testfacebook.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill invalid logo', () => {
      cy.get('input[name="logo"]').type('testlogo.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill invalid banner', () => {
      cy.get('input[name="banner"]').type('testbanner.com');
      cy.contains('Create Society').click();
      cy.contains('Must be a valid URL')
    })
    it('Fill description with less than 50 characters', () => {
      cy.get('textarea[name="description"]').type('This is a test society');
      cy.contains('Create Society').click();
      cy.contains('Society description must be at least 50 characters.')
    })

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
    cy.get('input[name="societyName"]').type(randomString(10));
    cy.get('input[name="email"]').type(randomString(10) + '@' + randomString(5) + '.com');
    cy.get('textarea[name="description"]').type(randomString(50));

    cy.get('button').click();

    cy.url().should('include', '/society');
  })
})