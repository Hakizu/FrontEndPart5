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

})
// describe('Login testing', function () {
//   it('User can successfully login', function() {
//     cy.Login({ username: 'hakizu', password: 'salts' })
//     cy.contains('Hakizu logged in')
//   })

