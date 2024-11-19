import SuitePage from "../../support/PageObject/suite.page.js";
import DashboardPage from "../../support/PageObject/dashboard.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";

describe("Delete spec", () => {
  const randomSuiteName = generateRandomString(4);

  beforeEach(() => {
    cy.loginByApi(randomSuiteName)
    cy.visit("/dashboard")
    DashboardPage.AccessToDesignPage();
    SuitePage.addSuite(randomSuiteName);
  });

  it("Delete suit successfully ", () =>{
    cy.scrollTo('bottom');
    SuitePage.deleteSuite(randomSuiteName)
    cy.get('@deleteSuiteButton').should('not.exist');
  })
});
