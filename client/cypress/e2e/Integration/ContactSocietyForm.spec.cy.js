describe('Contact Society Form', () => {
  it('Fill in valid contact society form', () => {
    cy.visit('/society/1');

    // cy.get('[data-testid="contact-society-form"]').within(() => {
    //   cy.get('input[name="CustomerName"]').type('Test Name');
    // });
    // cy.get('[data-testid="contact-society-form"]').children().within(() => {
    //   cy.get('input[name="CustomerName"]').type('Test Name');
    // })
    // cy.get('[data-testid="contact-society-form"]').find('input[name="CustomerName"]').type('Test Name');
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
    cy.contains('Submit query').click();
  });

  it('Invalid name in contact society form', () => {
    cy.visit('/society/1');
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
    cy.contains('Submit query').click();
    cy.contains('You must enter your name');

  })

  it('Invalid email in contact society form', () => {
    cy.visit('/society/1');
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('incorrectEmail', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
    cy.contains('customerEmail must be a valid email').should('be.visible');
    cy.contains('Submit query').click();
  });

  it('Empty subject in contact society form', () => {
    cy.visit('/society/1');
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
    cy.contains('Submit query').click();
    cy.contains('A subject is required');
  });

  it('Empty query in contact society form', () => {
    cy.visit('/society/1');
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Submit query').click();
    cy.contains('A message is required');
  });

  it('Query with less than 50 characters in contact society form', () => {
    cy.visit('/society/1');
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Submit query').parent().find('textarea').type('Test Message description here', { force: true });
    cy.contains('Submit query').click();
    cy.contains('Message must be at least 50 characters long');
  });
});