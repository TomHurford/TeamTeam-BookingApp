describe('Contact Society Form', () => {
  beforeEach(() => {
    cy.wait(500);
    cy.visit('/society/1');
    cy.wait(500);
  });

  it('Fill in valid contact society form', () => {
    cy.contains('Your Name').parent().find('input').type('John Doe', { force: true });
    cy.contains('Your Email').parent().find('input').type('john.doe@email.com', { force: true });
    cy.contains('Subject of your query').parent().find('input').type('Test Subject', { force: true });
    cy.contains('Your query').parent().find('textarea').type('Test Message description here .....................', { force: true });
    cy.contains('Submit query').click();
  });

  describe('Invalid inputs', () => {
    it('Submit invalid name in contact society form', () => {
      cy.contains('Submit query').click();
      cy.contains('You must enter your name');
    })

    it('Submit invalid email in contact society form', () => {
      cy.contains('Your Email').parent().find('input').type('incorrectEmail', { force: true });
      cy.contains('Submit query').click();
      cy.contains('customerEmail must be a valid email');
    });

    it('Submit empty subject in contact society form', () => {
      cy.contains('Submit query').click();
      cy.contains('A subject is required');
    });

    it('Submit empty query in contact society form', () => {
      cy.contains('Submit query').click();
      cy.contains('A message is required');
    });

    it('Submit query with less than 50 characters in contact society form', () => {
      cy.contains('Submit query').parent().find('textarea').type('Test Message description here', { force: true });
      cy.contains('Submit query').click();
      cy.contains('Message must be at least 50 characters long');
    });
  });
    describe('Whitespace inputs', ()=>{
      it('Whitespace input for name', ()=>{
        cy.contains('Your Name').parent().find('input').type('   ', { force: true });
        cy.contains('Submit query').click();
        cy.contains('Name must be at least 3 characters long')
      })
      it('Whitespace input for email', ()=>{
        cy.contains('Your Email').parent().find('input').type('   ', { force: true });
        cy.contains('Submit query').click();
        cy.contains('customerEmail must be a valid email');
      })
      it('Whitespace input for subject of query', ()=>{
        cy.contains('Subject of your query').parent().find('input').type('    ', { force: true });
        cy.contains('Submit query').click();
        cy.contains('Subject must be at least 3 characters long')
      })
      it('Whitespace input for query', ()=>{
        cy.contains('Your query').parent().find('textarea').type('   ', { force: true });
        cy.contains('Submit query').click();
        cy.contains('Message must be at least 50 characters long')
      })
    })
});