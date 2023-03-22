describe('Contact', () => {
  describe('Test empty inputs', () => {
    it('Enter empty name', () => {
      cy.visit('/contact')
      cy.get('input[name="customerName"]').click()
      cy.contains('Contact Us').click()
      cy.contains('You must enter your name')
    })
    it('Enter empty email', () => {
      cy.visit('/contact')
      cy.get('input[name="customerEmail"]').click()
      cy.contains('Contact Us').click()
      cy.contains('You must enter your email')
    })

    it('Submit empty email', () => {
      cy.visit('/contact')
      cy.get('input[name="customerEmail"]')
      cy.get('button').click()
      cy.contains('You must enter your email')
    })

    it('Enter empty subject', () => {
      cy.visit('/contact')
      cy.get('input[name="messageSubject"]').click()
      cy.contains('Contact Us').click()
      cy.contains('A subject is required')
    })

    it('Submit empty subject', () => {
      cy.visit('/contact')
      cy.get('input[name="messageSubject"]')
      cy.get('button').click()
      cy.contains('A subject is required')
    })
    
    it('Enter empty query', () => {
      cy.visit('/contact')
      cy.get('textarea[name="message"]').click()
      cy.contains('Contact Us').click()
      cy.contains('A message is required')
    })
  })


  describe('Test invalid inputs', () => {
    it('Enter invalid name', () => {
      cy.visit('/contact')
      cy.get('input[name="customerName"]')
      cy.get('button').click()
      cy.contains('You must enter your name')
    })

    it('Submit invalid email', () => {
      cy.visit('/contact')
      cy.get('input[name="customerEmail"]').type('johnemail.com')
      cy.get('button').click()
      cy.contains('customerEmail must be a valid email')
    })

    it('Enter invalid query', () => {
      cy.visit('/contact')
      cy.get('textarea[name="message"]')
      cy.get('button').click()
      cy.contains('A message is required')
    })

    it('Query less than 50 characters long', () => {
      cy.visit('/contact')
      cy.get('textarea[name="message"]').type('Test message')
      cy.get('button').click()
      cy.contains('Message must be at least 50 characters long')
    })
  })
  describe('Whitespace inputs', ()=>{
    it('Whitespace input for name', ()=>{
      cy.visit('/contact')
      cy.get('input[name="customerName"]').type('    ')
      cy.contains('Contact Us').click()
      cy.contains('Name must be at least 3 characters long')
    })
    it('Whitespace input for email', ()=>{
      cy.visit('/contact')
      cy.get('input[name="customerEmail"]').type('    ')
      cy.contains('Contact Us').click()
      cy.contains('customerEmail must be a valid email')
    })
    it('Whitespace input for subject of query', ()=>{
      cy.visit('/contact')
      cy.get('input[name="messageSubject"]').type('    ')
      cy.contains('Contact Us').click()
      cy.contains('Subject must be at least 3 characters long')
    })
    it('Whitespace input for query', () =>{
      cy.visit('/contact')
      cy.get('textarea[name="message"]').type('    ')
      cy.contains('Contact Us').click()
      cy.contains('Message must be at least 50 characters long')
    })

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