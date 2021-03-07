describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset/')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('#login-form')
      .should('contain', 'Username')
      .and('contain', 'Password')
  })

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        name: 'Purjo Purjonen',
        username: 'purjo',
        password: 'salaisuus'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)  
    })

    it('succeeds with correct credentials', function () {
      cy.get('#login-form')
      cy.get('#username').type('purjo')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-form')
      cy.get('#username').type('wrong')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Invalid')
    })
  })
})
