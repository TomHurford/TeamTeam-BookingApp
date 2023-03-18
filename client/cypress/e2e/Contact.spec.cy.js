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
    cy.contains('You must enter your name')
  })

  it('Enter invalid email', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('johnemail.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
    cy.contains('customerEmail must be a valid email')
  })

  it('Enter empty email', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
    cy.contains('You must enter your email')
  })

  it('Enter invalid subject', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
    cy.contains('A subject is required')
  })

  it('Enter invalid query', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]')
    cy.get('button').click()
    cy.contains('A message is required')
  })

  it('Query less than 50 characters long', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test message')
    cy.get('button').click()
    cy.contains('Message must be at least 50 characters long')
  })

  it('Enter valid details', () => {
    cy.visit('/contact')
    cy.get('input[name="customerName"]').type('John')
    cy.get('input[name="customerEmail"]').type('john@email.com')
    cy.get('input[name="messageSubject"]').type('Test')
    cy.get('textarea[name="message"]').type('Test  message  description  here ................. ')
    cy.get('button').click()
  })
});