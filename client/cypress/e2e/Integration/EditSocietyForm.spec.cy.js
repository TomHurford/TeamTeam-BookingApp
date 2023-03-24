describe('Test Edit Society Form', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(1000)
    cy.visit('/societies');
    cy.get('div[data-testid="searchbar"]').children().get('input').type('Society 1', {force:true});
    cy.wait(1000)
  })
  afterEach(() => {
    cy.wait(500)
    cy.contains('Logout').click()
  })

  it('No forms filled', () => {
    cy.contains('Society 1').click({force:true});
    cy.wait(500);
    cy.contains('Edit Society').click({force:true});
    cy.contains('button','Edit Society').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contains('Please fill in at least one field')
    })
  })

  describe('Whitecase inputs', () =>{
    it('Whitespace input for website field', ()=>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="website"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for instagram field', () =>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="instagram"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for twitter field', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="twitter"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for facebook field', () =>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="facebook"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for logo field', () =>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="logo"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for banner field', ()=>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="banner"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for description field', ()=>{
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('textarea[name="description"]').type('       ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Society description must be at least 50 characters');

    })
  })

  describe('Invalid inputs', () => {
    it('Fill invalid website', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500)
      cy.contains('Edit Society').click({force:true});
      cy.get('input[name="website"]').type('incorrectwebsite', { force: true});
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL'); 
    })
    
    it('Fill invalid instagram', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500)
      cy.contains('Edit Society').click({force:true});
      cy.get('input[name="instagram"]').type('incorrectinstagram', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid twitter', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').click({force:true});
      cy.get('input[name="twitter"]').type('incorrecttwitter', { force: true });
      cy.contains('Edit Society').click({force:true});
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid facebook', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500)
      cy.contains('Edit Society').click({force:true});
      cy.get('input[name="facebook"]').type('incorrectfacebook', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid logo', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="logo"]').type('incorrectlogo', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid banner', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="banner"]').type('incorrectbanner', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })

    it('Fill invalid description', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('textarea[name="description"]').type('This is a test society', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Society description must be at least 50 characters');
      
    })

    it('Fill valid details', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500);
      cy.contains('Edit Society').parent().click({force:true});
      cy.get('input[name="website"]').type('https://www.test.com', { force: true });
      cy.get('input[name="instagram"]').type('https://www.instagram.com', { force: true });
      cy.get('input[name="twitter"]').type('https://www.twitter.com', { force: true });
      cy.get('input[name="facebook"]').type('https://www.facebook.com', { force: true });
      cy.get('input[name="logo"]').type('https://www.logo.com', { force: true });
      cy.get('input[name="banner"]').type('https://www.banner.com', { force: true });
      cy.get('textarea[name="description"]').type('This is a test society Lorem ipsum dolor sit amet,', { force: true });

      cy.contains('button','Edit Society').click();
    })


    it('Manipulate committee members', () => {
      cy.contains('Society 1').click({force:true});
      cy.wait(500)
      cy.contains('Edit Society').parent().click({force:true});
      
      cy.contains('Committee Members').parent().find('input').type('test');
      cy.contains('Committee Members').parent().contains('Add Member').parent().find('button').click();

      cy.contains('admin@admin.com').parent().contains('Remove').click();

      cy.contains('Committee Members').parent().find('input').clear();

      cy.contains('Committee Members').parent().find('input').type('student@kcl.ac.uk');
      cy.contains('Committee Members').parent().contains('Add Member').parent().find('button').click();

      cy.contains('Committee Members').parent().find('input').type('professor@kcl.ac.uk');
      cy.contains('Committee Members').parent().contains('Add Member').parent().find('button').click();

      cy.contains('student@kcl.ac.uk').parent().contains('Remove').click();

      cy.contains('professor@kcl.ac.uk').parent().contains('Make President').click();
      cy.wait(500);

      // Uncomment once functionality is implemented
      cy.visit('/logout');
      cy.wait(500);

      cy.visit('/login');
      cy.get('input[name="loginEmail"]').type('professor@kcl.ac.uk');
      cy.get('input[name="loginPassword"]').type('professor');
      cy.get('button[name="loginbutton"]').click();
      cy.wait(500);
      cy.visit('/societies');
      cy.get('div[data-testid="searchbar"]').children().get('input').type('Society 1', {force:true});
      cy.wait(1000);

      cy.contains('Society 1').click({force:true});
      cy.wait(1000);
      cy.contains('Edit Society').parent().click({force:true});

      cy.contains('admin@admin.com').parent().contains('Make President').click();
      cy.wait(500);

    })
  })
})
