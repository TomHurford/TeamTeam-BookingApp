describe('Create Events', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.contains('Create Event').click()
  })
  afterEach(() => {
    cy.contains('Logout').click()
  })

  describe('Test empty inputs', () => {
    it('Enter empty name', () => {
      cy.get('input[name="eventName"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event name is required')
    })

    it('Enter empty description', () => {
      cy.get('textarea[name="description"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event description is required')
    })

    it('Enter empty date', () => {
      cy.get('input[name="date"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event date is required')
    })

    it('Enter empty time', () => {
      cy.get('input[type="time"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event time is required')
    })

    it('Enter empty location', () => {
      cy.get('input[name="location"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event location is required')
    })

    it('Enter empty society id', () => {
      cy.get('input[name="societyId"]').click({force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Society ID is required')
    })

    it('Enter empty ticket name', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Type Name").parent().find('input').click({force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Ticket name is required')
    })

    it('Enter empty ticket price', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').click({force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Ticket price is required')
    })
    
    it('Enter empty quantity available', ()=>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').click({force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Ticket quantity is required')
    })

  })
  
  describe('Test invalid inputs', () => {
    it('Invalid event description - less than 30 char', () => {
      cy.get('textarea[name="description"]').type('Test', {force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Event description must be at least 30 characters')
    })

    it('Invalid event description - exactly 30 char', () => {
      cy.get('textarea[name="description"]').type('Test Test Tes  Test Test Tes', {force:true})
      cy.contains('Create Event').click({force:true})
    })

    it('Invalid date - Enter past date', () => {
      cy.get('input[name="date"]').type('2020-01-01', {force:true})
      cy.contains('Event Date').click({force:true})
      cy.contains('Event date must be in the future')
    })

    it('Invalid Society ID - type in string', () => {
      cy.get('input[name="societyId"]').type('Test', {force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('societyId must be a `number`')
    })
    
    it('Invalid Society ID - type in negative number', () => {
      cy.get('input[name="societyId"]').type('-1', {force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Society ID must be positive')
    })

    it('Invalid Society ID - type in 0', () => {
      cy.get('input[name="societyId"]').type('0', {force:true})
      cy.contains('Create Event').click({force:true})
      cy.contains('Society ID must be positive')
    })

    it('Invalid ticket price - type in negative number', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('-1', {force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Price must be positive')
    })

    it('Invalid ticket price - type in 0', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('0', {force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Price must be positive')
    })

    //ticketInfo[0].quantity must be a `number` type

    it('Invalid quantity - type in negative number', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('-1', {force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Ticket quantity must be positive')
    })

    it('Invalid quantity - type in 0', () =>{
      cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('0', {force:true});
      cy.contains('Create Event').click({force:true})
      cy.contains('Ticket quantity must be positive')
    })
  })

  describe('Test whitespace inputs', () => {
    it('Error thrown for whitespace input in Name field', () =>{
      cy.contains('Event Name').parent().find('input').type(' ',{force:true})
      cy.contains('Event Name').click({force: true})
      cy.contains('Event Name must be at least 3 characters')
    })

    it('Error thrown for whitespace input in Description field', () =>{
      cy.contains('Event Description').parent().find('textarea').type(' ', {force:true})
      cy.contains('Event Description').click({force: true})
      cy.contains('Event description must be at least 30 characters')
    })
    
    it('Error thrown for whitespace input in Location field', () =>{
      cy.contains('Event Location').parent().find('input').type(' ', {force:true})
      cy.contains('Event Location').click({force: true})
      cy.contains('Event location must be at least 3 characters')
    })
    it('Error thrown for whitespace input in Society ID field', () =>{
      cy.contains('Society ID').parent().find('input').type(' ', {force:true})
      cy.contains('Society ID').click({force: true})
      cy.contains('societyId must be a `number` type,')
    })
    it('Error thrown for whitespace input in Ticket Name field', () =>{
      cy.contains('Ticket Type Name').parent().find('input').type(' ', {force:true})
      cy.contains('Ticket Type Name').click({force: true})
      cy.contains('Ticket name must be at least 3 characters')
    })
  })

  describe('Test valid inputs', () => {
  it('should create an event', () => {
    cy.url().should('include', 'create-event')

    cy.get('input[name="eventName"]').type('DevOps Event', {force:true})
    cy.get('textarea[name="description"]').type('DevOps Event Description .......', {force:true})
    cy.get('input[name="date"]').type('2023-12-12', {force:true})
    cy.get('input[type="time"]').type('12:00', {force:true})
    cy.get('input[name="location"]').type('DevOps Event Location', {force:true})
    cy.get('input[name="societyId"]').type('1')

    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Type Name").parent().find('input').type('Early Bird Ticket', {force:true});
    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Price").parent().find('input').type('10', {force:true});
    cy.get('div[data-testid="ticketInfo.0.name"]').contains("Ticket Quantity").parent().find('input').type('25', {force:true});
    cy.contains('Add Ticket Type').click({force:true});

    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Type Name").parent().find('input').type('Standard Ticket', {force:true});
    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Price").parent().find('input').type('25', {force:true});
    cy.get('div[data-testid="ticketInfo.1.name"]').contains("Ticket Quantity").parent().find('input').type('50', {force:true});
    cy.contains('Add Ticket Type').click({force:true});

    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Type Name").parent().find('input').type('Premium Ticket', {force:true});
    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Price").parent().find('input').type('50', {force:true});
    cy.get('div[data-testid="ticketInfo.2.name"]').contains("Ticket Quantity").parent().find('input').type('10', {force:true});
    cy.contains('Add Ticket Type').click({force:true});

    cy.get('div[data-testid="ticketInfo.3.name"]').contains('Remove Ticket Type').click({force:true});

    cy.get('form').contains('Create Event').click({force:true});
  })
})
})