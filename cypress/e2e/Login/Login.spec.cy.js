import LoginPage from "../../support/PageObject/login.page";

describe('Login spec', () => {

  it('Login successfully', () => {
    LoginPage.login(Cypress.env("email"), Cypress.env("password"))
    cy.url().should("eq", "https://d2yqnm7qbjnp0v.cloudfront.net/dashboard")
    cy.wait(6000)
  })

  it('Login with wrong credentials', () => {
    LoginPage.login(Cypress.env("email"), "password")
    LoginPage.errorMessage.should("have.text", "Incorrect username or password.")
    cy.wait(6000)
  })

  it('Login with no credentials', () => {
    LoginPage.login(" ", " ")
    LoginPage.errorMessage.should("have.text", "Email and password must be filled.")
    cy.wait(6000)
  })

  it('Login with an upperCase email', () => {
    LoginPage.login(Cypress.env("email").toUpperCase(), Cypress.env("password"))
    LoginPage.errorMessage.should("have.text", "Incorrect username or password.")
    cy.wait(6000)
  })
})