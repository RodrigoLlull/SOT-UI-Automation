import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import DashboardPage from "../../support/PageObject/dashboard.page";

describe("AddSuite spec", () => {
  const randomSuiteName = generateRandomString(4);

  beforeEach(() => {
    cy.loginByApi(randomSuiteName)
    cy.visit("/dashboard")
    DashboardPage.AccessToDesignPage();
  });


  afterEach(() => {
    SuitePage.deleteSuite(randomSuiteName);
  });

  it("Add suite successfully", () => {
    SuitePage.addSuite(randomSuiteName);
    cy.scrollTo('bottom');
    SuitePage.findSuiteInDOM(randomSuiteName);
    cy.get('@foundSuite').should("have.text", randomSuiteName);
  });

});
