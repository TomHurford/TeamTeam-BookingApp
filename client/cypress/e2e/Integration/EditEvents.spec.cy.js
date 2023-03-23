describe('Edit Events', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/event-details?eventId=1')
    cy.contains('Edit Event').click()
  })
  afterEach(() => {
    cy.contains('Logout').click()
  })

  describe('Test empty inputs', () => {
    it('Shows alert on empty inputs', () => {
      cy.contains('Update Event').click()
      cy.on('window:alert', (str) => {
        expect(str).to.contains('Please fill in at least one field to update the event')
      })
    })
    it('Shows alert on empty date but filled in time', () => {
      cy.contains('Time').parent().find('input').type('12:00')
      cy.on('window:alert', (str) => {
        expect(str).to.contains('Please fill in the date of the event')
      })
      cy.contains('Update Event').click()
   })
    it('Shows alert on empty time but filled in date', () =>{
      cy.contains('Date').parent().find('input').type('2023-05-05')
      cy.on('window:alert', (str) => {
        expect(str).to.contains('Please fill in the time of the event')
      })
      cy.contains('Update Event').click()
    })
  })

  describe('Test invalid inputs', () => {
    it('Error thrown for whitespace input in Name field', () =>{
      cy.contains('Name').parent().find('input').type(' ')
      // cy.contains('Name').click()
      cy.contains('Description').click()
      cy.contains('Event name must be at least 3 characters')
    })
    it('Shows error on invalid description', () => {
      cy.contains('Description').parent().find('textarea').type('a')
      cy.contains('Description').click()
      cy.contains('Event description must be at least 30 characters')
    })
    it('Error thrown for whitespace input in Description field', () =>{
      cy.contains('Description').parent().find('textarea').type(' ')
      cy.contains('Description').click()
      cy.contains('Event description must be at least 30 characters')
    })
    it('Error thrown for whitespace input in Location field', () =>{
      cy.contains('Location').parent().find('input').type(' ')
      cy.contains('Location').click()
      cy.contains('Event location must be at least 3 characters')
    })

    it('Error thrown for past date as input in Date field', () =>{
      cy.contains('Date').parent().find('input').type('2023-03-01')
      cy.contains('Date').click()
      cy.contains('Event date must be in the future.')
    })
    // it('Error thrown for whitespace input in Time field', () =>{
    //   cy.contains('').parent().find('input').type(' ')
    //   cy.contains('').parent().click()
    //   cy.contains('Event location must be at least 3 characters')
    // })
  })

  describe('Test valid inputs', () => {
    it('Valid name input', () => {
      cy.contains('Name').parent().find('input').type('Bush House Coding Event')
      cy.contains('Update Event').click()
      cy.url().should('include', '/event-details?eventId=')
    })
    it('Valid description input', () => {
      cy.contains('Description').parent().find('textarea').type('This is a test event in KCL........................')
      cy.contains('Update Event').click()
      cy.url().should('include', '/event-details?eventId=')
    })
    it('Valid location input', () => {
      cy.contains('Location').parent().find('input').type('Bush House campus')
      cy.contains('Update Event').click()
      cy.url().should('include', '/event-details?eventId=')
    })
    it('Valid Date and Time input', () => {
      cy.contains('Date').parent().find('input').type('2023-04-19')
      cy.contains('Time').parent().find('input').type('12:00')
      cy.contains('Update Event').click()
      cy.url().should('include', '/event-details?eventId=')
    })
    it('Valid input for all forms filled', () =>{
      cy.contains('Name').parent().find('input').type('Event 1')
      cy.contains('Description').parent().find('textarea').type('This is a special hackathon event in KCL...................')
      cy.contains('Location').parent().find('input').type('Strand campus')
      cy.contains('Date').parent().find('input').type('2023-05-20')
      cy.contains('Time').parent().find('input').type('13:00')
      cy.contains('Update Event').click()
      cy.url().should('include', '/event-details?eventId=')
    })
  })
})