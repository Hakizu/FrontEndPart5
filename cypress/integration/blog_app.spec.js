const { checkPropTypes } = require("prop-types")

describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Hakizu',
      username: 'hakizu',
      password: 'salts'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('Username')
  })

  describe('Loggin testing', function() {
    it('User can successfully login', function () {
      cy.get('[data-cy = username]').type('hakizu')
      cy.get('[data-cy = password]').type('salts')
      cy.get('[data-cy = loginButton]').click()
      cy.contains('Hakizu logged in')
    })

    it('User with wrong credentials', function () {
      cy.get('[data-cy = username]').type('hakizu')
      cy.get('[data-cy = password]').type('wrong')
      cy.get('[data-cy = loginButton]').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.Login({ username: 'hakizu', password: 'salts' })
      cy.contains('Hakizu logged in')
    })

    it('User can create Blog', function() {
      cy.get('#newBlogButton').click()

      cy.get('[data-cy = blogInput]').type('a cypress blog')
      cy.get('[data-cy = authorInput]').type('The Cyress Team')
      cy.get('[data-cy = urlInput]').type('https://docs.cypress.io/')
      cy.get('[data-cy = likesInput]').type('99')
      cy.get('[data-cy = saveBlogButton]').click()

      cy.contains('a cypress blog')
    })
    it('User can like an existing blog', function () {
      cy.createBlog({ blog:'a cypress blog', author: 'The Cypress Team',
        url: 'https://docs.cypress.io', likes: '99' })

      cy.contains('a cypress blog')
      cy.get('#viewButton').click()
      cy.get('[data-cy=likeButton]').click()
    })
    it('User can delete blog', function () {
      cy.createBlog({ blog:'a cypress blog', author: 'The Cypress Team',
        url: 'https://docs.cypress.io', likes: '99' })
      cy.get('#viewButton').click()
      cy.get('[data-cy=deleteBlogButton]').click()

      cy.visit('http://localhost:3000')
      cy.get('html').should('not.contain', 'a cypress blog')
    })
  })
  describe.only('Are blogs sorted via likes', function() {
    beforeEach(function() {
      cy.Login({ username: 'hakizu', password: 'salts' })
      cy.contains('Hakizu logged in')
    })

    it('Creation and sorting', function() {
      cy.createBlog({ blog: 'third', url: 'third.com', likes: 1000 })
      cy.createBlog({ blog: 'fourth', url: 'fourth.com', likes: 1 })
      cy.createBlog({ blog: 'first', url: 'first.com', likes: 2000 })
      cy.createBlog({ blog: 'second', url: 'second.com', likes: 1500 })

      cy.get('.allBlogs').then(blogs => {
        cy.wrap(blogs[0]).contains(2000)
        cy.wrap(blogs[1]).contains(1500)
        cy.wrap(blogs[2]).contains(1000)
        cy.wrap(blogs[3]).contains(1)
      })
    })
  })
})