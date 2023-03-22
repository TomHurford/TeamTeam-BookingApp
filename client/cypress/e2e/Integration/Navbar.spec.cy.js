describe('Navbar', () => {
  it('Test Mobile Navbar', () => {
    cy.viewport('iphone-xr')
    cy.visit('/')
    cy.get('div[id="menu"]').should('not.be.visible')
    cy.get('div[id="notMenu"]').should('not.be.visible')
    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click()
    cy.get('div[id="menu"]').should('be.visible')
    cy.get('div[id="notMenu"]').should('be.visible')
    cy.get('div[id="notMenu"]').click()
    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click()
    cy.contains('Close').click()

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({ force: true })
    cy.get('div[id="menu"]').find('ul[class="top"]').find('a').find('li').contains('Events').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({ force: true})
    cy.get('div[id="menu"]').find('ul[class="top"]').find('a').find('li').contains('Societies').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({ force: true })
    cy.get('div[id="menu"]').find('ul[class="top"]').find('a').find('li').contains('Contact').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({force: true}) 
    cy.get('div[id="menu"]').find('ul[class="bottom"]').find('a').find('li').contains('Basket').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({force: true})
    cy.get('div[id="menu"]').find('ul[class="bottom"]').find('a').find('li').contains('Login').wait(500).click({force: true})


    cy.get('input[name="loginEmail"]').type('admin@admin.com')
    cy.get('input[name="loginPassword"]').type('admin123')
    cy.get('button[name="loginbutton"]').click();

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({force: true})
    cy.get('div[id="menu"]').find('ul[class="bottom"]').find('a').find('li').contains('Basket').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({force: true})
    cy.get('div[id="menu"]').find('ul[class="bottom"]').find('a').find('li').contains('Tickets').wait(500).click({force: true})

    cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click({force: true})
    cy.get('div[id="menu"]').find('ul[class="bottom"]').find('a').find('li').contains('Logout').wait(500).click({force: true})
    // cy.contains('Events').click({force: true})

    // cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click()
    // cy.contains('Societies').click({force: true})
    // cy.visit('/')

    // cy.get('nav[class="mobile-navbar"]').find('ul[class="right"]').find('a').click()
    // cy.contains('Contact').click({force: true})
    // cy.visit('/')

  })
})