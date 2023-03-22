describe('Test Edit Society Form', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/societies');
    cy.get('div[data-testid="searchbar"]').children().get('input').type('Society 1', {force:true});
  })
  afterEach(() => {
    cy.contains('Logout').click()
  })

  it('No forms filled', () => {
    cy.contains('Society 1').click();
    cy.contains('Edit Society').click();
    cy.contains('button','Edit Society').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contains('Please fill in at least one field')
    })
  })

  describe('Invalid inputs', () => {
    it('Fill invalid website', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').click();
      cy.get('input[name="website"]').type('incorrectwebsite', { force: true});
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL'); 
    })
    
    it('Fill invalid instagram', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').click();
      cy.get('input[name="instagram"]').type('incorrectinstagram', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid twitter', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').click();
      cy.get('input[name="twitter"]').type('incorrecttwitter', { force: true });
      cy.contains('Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid facebook', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').click();
      cy.get('input[name="facebook"]').type('incorrectfacebook', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid logo', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="logo"]').type('incorrectlogo', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
      
    })

    it('Fill invalid banner', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="banner"]').type('incorrectbanner', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })

    it('Fill invalid description', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('textarea[name="description"]').type('This is a test society', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Society description must be at least 50 characters');
      
    })


    it('Manipulate committee members', () => {
      cy.contains('Society 1').click();
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
      cy.contains('Society 1').click();
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
  describe('Whitecase inputs', () =>{
    it('Whitespace input for website field', ()=>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="website"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for instagram field', () =>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="instagram"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for twitter field', () => {
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="twitter"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for facebook field', () =>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="facebook"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for logo field', () =>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="logo"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for banner field', ()=>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('input[name="banner"]').type(' ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Must be a valid URL');
    })
    it('Whitespace input for description field', ()=>{
      cy.contains('Society 1').click();
      cy.contains('Edit Society').parent().click();
      cy.get('textarea[name="description"]').type('       ', { force: true });
      cy.contains('button','Edit Society').click();
      cy.contains('Society description must be at least 50 characters');

    })
  })
})
