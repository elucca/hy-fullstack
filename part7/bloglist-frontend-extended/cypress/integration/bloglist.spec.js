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
        password: 'salaisuus',
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

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#login-form')
        cy.get('#username').type('purjo')
        cy.get('#password').type('salaisuus')
        cy.get('#login-button').click()
      })

      it('a blog can be created', function () {
        cy.get('#togglable-button').click() // Not ideal, breaks if another toggleable is added

        cy.get('#title').type('A Blog')
        cy.get('#author').type('The Author')
        cy.get('#url').type('website')
        cy.get('#likes').type(0)

        cy.get('#submit-blog-button').click()

        cy.contains('A Blog')
      })

      describe('When a blog has been added', function () {
        beforeEach(function () {
          cy.get('#togglable-button').click() // Not ideal, breaks if another toggleable is added

          cy.get('#title').type('A Blog')
          cy.get('#author').type('The Author')
          cy.get('#url').type('website')
          cy.get('#likes').type(0)

          cy.get('#submit-blog-button').click()
        })

        it('it can be liked', function () {
          cy.get('#show-blog-button').click()
          cy.get('#like-button').click()
          cy.get('#detailed-blog').should('contain', '1')
        })

        it('it can be deleted', function () {
          cy.get('#show-blog-button').click()
          cy.get('#delete-blog-button').click()
          cy.get('#detailed-blog').should('not.exist')
        })
      })

      describe.only('When multiple blog have been added', function () {
        beforeEach(function () {
          // lol copypaste
          cy.get('#togglable-button').click() // Not ideal, breaks if another toggleable is added
          cy.get('#title').type('First')
          cy.get('#author').type('The Author')
          cy.get('#url').type('website')
          cy.get('#likes').type(10)
          cy.get('#submit-blog-button').click()

          cy.get('#togglable-button').click()
          cy.get('#title').type('Third')
          cy.get('#author').type('The Author')
          cy.get('#url').type('website')
          cy.get('#likes').type(2)
          cy.get('#submit-blog-button').click()

          cy.get('#togglable-button').click()
          cy.get('#title').type('Second')
          cy.get('#author').type('The Author')
          cy.get('#url').type('website')
          cy.get('#likes').type(7)
          cy.get('#submit-blog-button').click()
        })

        it('they are sorted by number of likes', function () {
          cy.wait(500) // Chill for a bit to let the blogs get sorted
          cy.get('#blog-list').children('#blog').then(blogs => {
            expect(blogs[0]).to.contain("First")
            expect(blogs[1]).to.contain("Second")
            expect(blogs[2]).to.contain("Third")
          })
        })
      })
    })
  })
})
