import LoginPage from "../../support/PageObject/login.page";

describe('Login spec', () => {

  it('@smoke - Login successfully', () => {
    LoginPage.login(Cypress.env("email"), Cypress.env("password"))
    cy.url().should("eq", "https://d2yqnm7qbjnp0v.cloudfront.net/dashboard")
  })

  it('@regression - Login with wrong credentials', () => {
    LoginPage.login(Cypress.env("email"), "password")
    LoginPage.errorMessage.should("have.text", "Incorrect username or password.")
  })

  it('@regression - Login with no credentials', () => {
    LoginPage.login(" ", " ")
    LoginPage.errorMessage.should("have.text", "Email and password must be filled.")
  })

  it('@regression - Login with an upperCase email', () => {
    LoginPage.login(Cypress.env("email").toUpperCase(), Cypress.env("password"))
    LoginPage.errorMessage.should("have.text", "Incorrect username or password.")
  })
})