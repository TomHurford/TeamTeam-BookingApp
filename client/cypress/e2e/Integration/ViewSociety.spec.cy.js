describe('Test View Society', () => {
  it('Follow/UnFollow society - President', () => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/society/1');
    cy.get('button[data-testid="followButton"]').click({force: true});
    cy.wait(500);
    cy.get('button[data-testid="unfollowButton"]').click({force: true});
    cy.wait(500);
    cy.visit('/logout')
  })
  it('Follow society - User', () => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('student@kcl.ac.uk')
    cy.get('input[name="loginPassword"]').type('student')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/society/1');
    cy.get('button[data-testid="followButton"]').click({force: true});
    cy.wait(500);
    // cy.get('button[data-testid="unfollowButton"]').click({force: true});
    cy.wait(500);
    cy.visit('/logout')
  })
  it('Unfollow society - User', () => {
    cy.visit('/login')
    cy.get('input[name="loginEmail"]').type('student@kcl.ac.uk')
    cy.get('input[name="loginPassword"]').type('student')
    cy.get('button[name="loginbutton"]').click()
    cy.wait(500)
    cy.visit('/society/1');
    cy.get('button[data-testid="unfollowButton"]').click({force: true});
    cy.wait(500);
    cy.visit('/logout')
  })
  it('Click on society event', () => {
    cy.wait(500)
    cy.visit('/society/1');
    cy.wait(1000);
    cy.get('div[data-testid="event1"]').click({force: true});
  })
})