describe('Contact', () => {
  it('should display the contact page', () => {
    cy.visit('/contact')
    cy.get('h1').contains('Who are we')
    cy.get('p').contains('Ticketopia is...')
  })
  it('Enter invalid name', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test message  description  here ................. ')
    cy.get('button').click()
  })

  it('Enter invalid email', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
  })

  it('Enter invalid subject', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
  })

  it('Enter invalid query', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]')
    cy.get('button').click()
  })

  it('Enter valid details', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
  })
})