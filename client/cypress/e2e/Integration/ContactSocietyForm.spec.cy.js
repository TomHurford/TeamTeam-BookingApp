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
    cy.contains('Your Name').parent().find('input').type('John Doe');
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com');
    cy.contains('Subject of your query').parent().find('input').type('Test Subject');
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................');
    cy.contains('Submit query').click();
  });

  it('Fill in invalid contact society form', () => {
    cy.visit('/society/1');

    cy.contains('Submit query').click();
  });
});