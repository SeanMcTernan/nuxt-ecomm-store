describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the hero banner', () => {
    cy.get('section').first().should('be.visible')
  })

  it('should display the product carousel', () => {
    cy.contains('BEST SELLERS').should('be.visible')
  })

  it('should have working navigation links', () => {
    cy.get('a[role="button"]').should('have.length.at.least', 1)
  })
})
