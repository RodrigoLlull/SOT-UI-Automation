import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import DashboardPage from "../../support/PageObject/dashboard.page";

describe("AddSuite spec", () => {
  const randomSuiteName = generateRandomString(4);
  const randomNestedSuiteName = generateRandomString(4);
  
  beforeEach(() => {
    cy.loginByApi(randomSuiteName)
    cy.visit("/dashboard")
    DashboardPage.AccessToDesignPage();
    SuitePage.addSuite(randomSuiteName);
  });

  afterEach(()=> {
    SuitePage.deleteSuite(randomSuiteName)
  });

  it("Add nested suite successfully", () => {
    cy.scrollTo('bottom');
    SuitePage.addNestedSuite(randomSuiteName, randomNestedSuiteName);
    cy.scrollTo('bottom');
    SuitePage.findSuite(randomNestedSuiteName);
    cy.get('@foundSuite').should("have.text", randomNestedSuiteName);
  });

});
