describe('Create Events', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.contains('Create Event').click()
  })

  describe('Test empty inputs', () => {
    it('Enter empty name', () => {
      cy.get('input[name="eventName"]').click()
      cy.contains('Create Event').click()
      cy.contains('Event name is required')
    })

    it('Enter empty description', () => {
      cy.get('textarea[name="description"]').click()
      cy.contains('Create Event').click()
      cy.contains('Event description is required')
    })

    it('Enter empty date', () => {
      cy.get('input[name="date"]').click()
      cy.contains('Create Event').click()
      cy.contains('Event date is required')
    })

    it('Enter empty time', () => {
      cy.get('input[type="time"]').click()
      cy.contains('Create Event').click()
      cy.contains('Event time is required')
    })

    it('Enter empty location', () => {
      cy.get('input[name="location"]').click()
      cy.contains('Create Event').click()
      cy.contains('Event location is required')
    })

    it('Enter empty society id', () => {
      cy.get('input[name="societyId"]').click()
      cy.contains('Create Event').click()
      cy.contains('Society ID is required')
    })

    it('Enter empty ticket name', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Type Name").parent().find('input').click();
      cy.contains('Create Event').click()
      cy.contains('Ticket name is required')
    })

    it('Enter empty ticket price', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').click();
      cy.contains('Create Event').click()
      cy.contains('Ticket price is required')
    })
    
    it('Enter empty quantity available', ()=>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').click();
      cy.contains('Create Event').click()
      cy.contains('Ticket quantity is required')
    })

  })
  
  describe('Test invalid inputs', () => {
    it('Invalid event description - less than 30 char', () => {
      cy.get('textarea[name="description"]').type('Test')
      cy.contains('Create Event').click()
      cy.contains('Event description must be at least 30 characters')
    })

    it('Invalid event description - exactly 30 char', () => {
      cy.get('textarea[name="description"]').type('Test Test Tes  Test Test Tes')
      cy.contains('Create Event').click()
    })

    it('Invalid Society ID - type in string', () => {
      cy.get('input[name="societyId"]').type('Test')
      cy.contains('Create Event').click()
      cy.contains('societyId must be a `number`')
    })
    
    it('Invalid Society ID - type in negative number', () => {
      cy.get('input[name="societyId"]').type('-1')
      cy.contains('Create Event').click()
      cy.contains('Society ID must be positive')
    })

    it('Invalid Society ID - type in 0', () => {
      cy.get('input[name="societyId"]').type('0')
      cy.contains('Create Event').click()
      cy.contains('Society ID must be positive')
    })

    it('Invalid ticket price - type in string', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('Test');
      cy.contains('Create Event').click()
      cy.contains('ticketInfo[0].price must be a `number` type')
    })

    it('Invalid ticket price - type in negative number', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('-1');
      cy.contains('Create Event').click()
      cy.contains('Price must be positive')
    })

    it('Invalid ticket price - type in 0', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('0');
      cy.contains('Create Event').click()
      cy.contains('Price must be positive')
    })

    //ticketInfo[0].quantity must be a `number` type

    it('Invalid quantity - type in string', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('Test');
      cy.contains('Create Event').click()
      cy.contains('ticketInfo[0].quantity must be a `number` type')
    })

    it('Invalid quantity - type in negative number', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('-1');
      cy.contains('Create Event').click()
      cy.contains('Ticket quantity must be positive')
    })

    it('Invalid quantity - type in 0', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('0');
      cy.contains('Create Event').click()
      cy.contains('Ticket quantity must be positive')
    })
    
  })

  describe('Test valid inputs', () => {
  it('should create an event', () => {
    //login
    // cy.visit('http://localhost:3000/login')
    // cy.get('input[name="loginEmail"]').type('admin@admin.com')
    // cy.get('input[name="loginPassword"]').type('admin123')
    // cy.get('button[name="loginbutton"]').click()

    //fill in form
    // cy.visit('http://localhost:3000/create-event')
    // cy.contains('Create Event').click()
    cy.url().should('include', 'create-event')

    cy.get('input[name="eventName"]').type('DevOps Event')
    cy.get('textarea[name="description"]').type('DevOps Event Description .......')
    cy.get('input[name="date"]').type('2023-12-12')
    cy.get('input[type="time"]').type('12:00')
    cy.get('input[name="location"]').type('DevOps Event Location')
    cy.get('input[name="societyId"]').type('1')

    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Type Name").parent().find('input').type('Early Bird Ticket');
    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('10');
    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('25');
    cy.contains('Add Ticket Type').click();

    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Type Name").parent().find('input').type('Standard Ticket');
    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Price").parent().find('input').type('25');
    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Quantity").parent().find('input').type('50');
    cy.contains('Add Ticket Type').click();

    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Type Name").parent().find('input').type('Premium Ticket');
    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Price").parent().find('input').type('50');
    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Quantity").parent().find('input').type('10');
    cy.contains('Add Ticket Type').click();

    cy.get('div[data-testid="ticketInfo.3.name"]').contains('Remove Ticket Type').click();

    cy.get('form').contains('Create Event').click();

    //add tickets
    // cy.get('input[data-testid="ticketName0"]').type('DevOps Ticket')
    // cy.get('input[data-testid="ticketPrice0"]').type('20')
    // cy.get('input[data-testid="ticketQuantity0"]').type('10')
    // cy.get('button[data-testid="addMore"]').click()

    // cy.get('input[data-testid="ticketName1"]').type('DevOps Premium Ticket')
    // cy.get('input[data-testid="ticketPrice1"]').type('50')
    // cy.get('input[data-testid="ticketQuantity1"]').type('5')
    // cy.get('button[data-testid="addMore"]').click()

    // cy.get('input[data-testid="ticketName2"]').type('DevOps Early Ticket')
    // cy.get('input[data-testid="ticketPrice2"]').type('10')
    // cy.get('input[data-testid="ticketQuantity2"]').type('3')
    // cy.get('button[data-testid="addMore"]').click()

    // cy.get('button[data-testid="removeRow3"]').click()

    // cy.get('button[type="submit"]').click()

    // cy.url().should('include', 'event-details?eventId=')
  })
})
})