import LoginPage from "../../support/PageObject/login.page";
import SuitePage from "../../support/PageObject/suite.page.js";
import DashboardPage from "../../support/PageObject/dashboard.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";

describe("Delete spec", () => {
  const randomSuiteName = generateRandomString(4);

  beforeEach(() => {
    LoginPage.login(Cypress.env("email"), Cypress.env("password"));
    DashboardPage.AccessToDesignPage();
    SuitePage.addSuite(randomSuiteName);
  });

  it("Delete suit successfully ", () =>{
    cy.scrollTo('bottom');
    cy.wait(4000)
    SuitePage.findSuiteButtonByName(randomSuiteName)
    SuitePage.deleteSuite()
    cy.wait(4000)
    cy.get('@foundDeleteSuiteButton').should('not.exist');
  })
});
