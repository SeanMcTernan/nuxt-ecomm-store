describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
    // Set viewport to mobile size
    cy.viewport('iphone-x')
  })

  it('should show mobile menu button when in mobile view', () => {
    cy.get('button[aria-label="Open menu"]').should('be.visible')
  })

  it('should open mobile menu when clicking menu button', () => {
    // Click the menu button
    cy.get('button[aria-label="Open menu"]').click()

    // Verify menu is open
    cy.get('div.mobile-menu').should('be.visible')
    cy.get('button[aria-label="Close menu"]').should('be.visible')

    // Verify navigation links are visible
    cy.contains('Mens').should('be.visible')
    cy.contains('Womens').should('be.visible')
    cy.contains('Accessories').should('be.visible')
    cy.contains('Sale').should('be.visible')
  })

  it('should close mobile menu when clicking close button', () => {
    // Open the menu first
    cy.get('button[aria-label="Open menu"]').click()
    cy.get('div.mobile-menu').should('be.visible')

    // Click close button
    cy.get('button[aria-label="Close menu"]').click()

    // Verify menu is closed
    cy.get('div.mobile-menu').should('not.exist')
    cy.get('button[aria-label="Open menu"]').should('be.visible')
  })

  it('should close mobile menu when clicking a navigation link', () => {
    // Open the menu
    cy.get('button[aria-label="Open menu"]').click()
    cy.get('div.mobile-menu').should('be.visible')

    // Click a navigation link
    cy.contains('Mens').click()

    // Verify menu is closed
    cy.get('div.mobile-menu').should('not.exist')
    cy.get('button[aria-label="Open menu"]').should('be.visible')

    // Verify navigation occurred
    cy.url().should('include', '/mens')
  })

  it('should hide mobile menu in desktop view', () => {
    // Switch to desktop viewport
    cy.viewport(1024, 768)

    // Verify mobile menu elements are not visible
    cy.get('button[aria-label="Open menu"]').should('not.be.visible')
    cy.get('div.mobile-menu').should('not.exist')

    // Verify desktop navigation is visible
    cy.get('div.hidden.md\\:flex').within(() => {
      cy.contains('Mens').should('be.visible')
      cy.contains('Womens').should('be.visible')
      cy.contains('Accessories').should('be.visible')
      cy.contains('Sale').should('be.visible')
    })
  })
})
