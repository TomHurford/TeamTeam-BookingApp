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
      cy.get('input[name="loginEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="loginEmail"]').should('have.value', 'john.doe@kcl.ac.uk')
      cy.get('input[name="loginPassword"]').type('password')
      cy.get('input[name="loginPassword"]').should('have.value', 'password')
    })
    it('Login form submits', () => {
      cy.visit('/login');
      cy.get('input[name="loginEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="loginPassword"]').type('password')
      cy.get('button[name="loginbutton"]').click();
    })
  })
  // describe('Test Sign Up', () => {
    // cy.wait(1000)
    it('Sign Up form can be filled', () => {
      // cy.wait(1000)
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('input[name="signupName"]').type('John Doe')
      cy.get('input[name="signupName"]').should('have.value','John Doe')
      cy.get('input[name="signupEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="signupEmail"]').should('have.value','john.doe@kcl.ac.uk')
      cy.get('input[name="signupPassword"]').type('password')
      cy.get('input[name="signupPassword"]').should('have.value','password')
      cy.get('input[name="signupConfirmPassword"]').type('password')
      cy.get('input[name="signupConfirmPassword"]').should('have.value','password')
    })
    it('Sign Up form submits', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('input[name="signupName"]').type('John Doe')
      cy.get('input[name="signupEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="signupPassword"]').type('password')
      cy.get('input[name="signupConfirmPassword"]').type('password')
      cy.get('button[name="signup-button"]').click();
    })

    it('Sign up form password mismatch', () => {
      cy.visit('/login');
      cy.contains('Not A User? Sign Up').click();
      cy.get('input[name="signupName"]').type('John Doe')
      cy.get('input[name="signupEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="signupEmail"]').should('have.value','john.doe@kcl.ac.uk')
      cy.get('input[name="signupPassword"]').type('password')
      cy.get('input[name="signupPassword"]').should('have.value','password')
      cy.get('input[name="signupConfirmPassword"]').type('password1')
      cy.get('input[name="signupConfirmPassword"]').should('have.value','password1')
      cy.get('button[name="signup-button"]').click();
      cy.contains('Passwords Do Not Match')
    })
    
  // })
  // describe('Test Forgot Password', () => {
    it('Forgot Password form can be filled', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.get('input[name="forgotEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('input[name="forgotEmail"]').should('have.value','john.doe@kcl.ac.uk')
    })
    it('Forgot Password form submits', () => {
      cy.visit('/login');
      cy.contains('Forgot Your Password?').click();
      cy.get('input[name="forgotEmail"]').type('john.doe@kcl.ac.uk')
      cy.get('button[name="forgot-button"]').click();
    })
  // })
})