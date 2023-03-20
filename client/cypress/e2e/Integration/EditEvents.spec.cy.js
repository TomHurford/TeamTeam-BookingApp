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

  describe('Test empty inputs', () => {
    it('Shows alert on empty inputs', () => {
      cy.contains('Update Event').click()
      cy.on('window:alert', (str) => {
        expect(str).to.contains('Please fill in at least one field to update the event')
      })
    })
  })

})