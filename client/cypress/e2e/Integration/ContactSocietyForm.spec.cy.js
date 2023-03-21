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

  describe('Invalid inputs', () => {
    it('Submit invalid name in contact society form', () => {
      cy.visit('/society/1');
      cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
      cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
      cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
      cy.contains('Submit query').click();
      cy.contains('You must enter your name');
    })

    it('Submit invalid email in contact society form', () => {
      cy.visit('/society/1');
      cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
      cy.contains('Your Email').parent().find('input').type('incorrectEmail', { force: true });
      cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
      cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
      cy.contains('customerEmail must be a valid email');
      cy.contains('Submit query').click();
    });

    it('Submit empty subject in contact society form', () => {
      cy.visit('/society/1');
      cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
      cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
      cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
      cy.contains('Submit query').click();
      cy.contains('A subject is required');
    });

    it('Submit empty query in contact society form', () => {
      cy.visit('/society/1');
      cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
      cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
      cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
      cy.contains('Submit query').click();
      cy.contains('A message is required');
    });

    it('Submit query with less than 50 characters in contact society form', () => {
      cy.visit('/society/1');
      cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
      cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
      cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
      cy.contains('Submit query').parent().find('textarea').type('Test Message description here', { force: true });
      cy.contains('Submit query').click();
      cy.contains('Message must be at least 50 characters long');
    });
  })
});