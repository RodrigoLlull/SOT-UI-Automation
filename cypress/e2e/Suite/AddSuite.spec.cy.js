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


  afterEach(function () {
    if (this.currentTest.title !== "Add mock suite successfully") {
      return SuitePage.deleteSuite(randomSuiteName);
    }
  });

  it("Add suite successfully", () => {
    SuitePage.addSuite(randomSuiteName);
    cy.scrollTo('bottom');
    SuitePage.findSuiteInDOM(randomSuiteName);
    cy.get('@foundSuite').should("have.text", randomSuiteName);
  });


  it.only("Add mock suite successfully", () => {
    cy.getMockSuite();
    SuitePage.addMockSuite();
    cy.wait("@postMockedSuite").then(({ response }) => {
      expect(response.body.suiteName).to.equal("New Suite Mock");
    });
    cy.wait("@getMockedSuites")
    SuitePage.findSuiteInDOM('New Suite Mock');
    cy.get('@foundSuite').should("have.text", "New Suite Mock");
  });

});


