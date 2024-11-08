import loginPage from "../../support/PageObject/login.page";
import SuitePage from "../../support/PageObject/suite.page";
import dashboardPage from "../../support/PageObject/dashboard.page";

describe("AddSuite spec", () => {
  beforeEach(() => {
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    dashboardPage.AccessToDesignPage();
  });

  it.only("Delete suit successfully ", () =>{
    SuitePage.findDeleteSuiteButton("1729256227708")
    SuitePage.deleteSuite()
    cy.wait(4000)
    cy.get('@foundDeleteSuiteButton').should('not.exist');
  })
});
