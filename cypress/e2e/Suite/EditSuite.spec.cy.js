import DashboardPage from "../../support/PageObject/dashboard.page";
import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";

describe("EditSuite spec", () => {
  const randomSuiteName = generateRandomString(4);
  let randomSuiteNameToEdit = generateRandomString(4);

  beforeEach(() => {
    cy.loginByApi(randomSuiteName);
    cy.visit("/dashboard");
    DashboardPage.AccessToDesignPage();
    cy.createSuite(randomSuiteName)
  });

  afterEach(() => {
    cy.deleteSuite(randomSuiteNameToEdit)
  });

  it("@smoke - Edit suite successfuly", () => {
    cy.scrollTo("bottom");
    SuitePage.editSuite(randomSuiteName, randomSuiteNameToEdit)
    cy.scrollTo("bottom");
    SuitePage.findSuiteInDOM(randomSuiteNameToEdit)
    cy.get('@foundSuite').should("have.text", randomSuiteNameToEdit);
  });
});
