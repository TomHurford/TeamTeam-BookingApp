describe('Login', () => {
  describe('Test toggle buttons', () => {
    it('should go to login page', () => {
      cy.visit('/login');
      cy.get('h1').should('contain', 'Log In');
    })
    it('Switch to Sign Up', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('h1').should('contain', 'Sign Up');
    })
    it('Switch to Log In', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.contains('Already a User? Log In').click();
      cy.get('h1').should('contain', 'Log In');
    })
    it('Switch to Forgot Password', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.get('h1').should('contain', 'Forgot Password');
    })
    it('Switch to Remember Password', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.contains('Remember Your Password?').click();
      cy.get('h1').should('contain', 'Log In');
    })
  })
  describe('Test Login', () => {
    it('Login form can be filled', () => {
      cy.visit('/login');
      cy.get('input[name="login-email"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="login-email"]').should('have.value', 'john.doe@kcl.ac.uk')
      cy.get('input[name="login-password"]').type('password')
      cy.get('input[name="login-password"]').should('have.value', 'password')
    })
    it('Login form submits', () => {
      cy.visit('/login');
      cy.get('input[name="login-email"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="login-password"]').type('password')
      cy.get('button[name="login-button"]').click();
    })
  })
  describe('Test Sign Up', () => {
    it('Sign Up form can be filled', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('input[name="signup-name"]').type('John Doe')
      cy.get('input[name="signup-name"]').should('have.value','John Doe')
      cy.get('input[name="signup-email"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="signup-email"]').should('have.value','john.doe@kcl.ac.uk')
      cy.get('input[name="signup-password"]').type('password')
      cy.get('input[name="signup-password"]').should('have.value','password')
      cy.get('input[name="signup-confirmPassword"]').type('password')
      cy.get('input[name="signup-confirmPassword"]').should('have.value','password')
    })
    it('Sign Up form submits', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('input[name="signup-name"]').type('John Doe')
      cy.get('input[name="signup-email"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="signup-password"]').type('password')
      cy.get('input[name="signup-confirmPassword"]').type('password')
      cy.get('button[name="signup-button"]').click();
    })
  })
  describe('Test Forgot Password', () => {
    it('Forgot Password form can be filled', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.get('input[name="forgot-email"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="forgot-email"]').should('have.value','john.doe@kcl.ac.uk')
    })
    it('Forgot Password form submits', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.get('input[name="forgot-email"]').type('john.doe@kcl.ac.uk')
      cy.get('button[name="forgot-button"]').click();
    })
  })
})