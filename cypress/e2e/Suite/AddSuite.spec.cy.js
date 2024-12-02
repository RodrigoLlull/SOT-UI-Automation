import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import DashboardPage from "../../support/PageObject/dashboard.page";

describe("AddSuite spec", () => {
  const randomSuiteName = generateRandomString(4);

  beforeEach(() => {
    cy.loginByApi(randomSuiteName);
    cy.visit("/dashboard");
    DashboardPage.AccessToDesignPage();
    // if (this.currentTest.title.includes("@smoke")) {
    //   cy.visit("/dashboard");
    //   DashboardPage.AccessToDesignPage();
    // } else {
    //   cy.visit("/test-design?id=PROJECT1726858662783&name=GROUP+06");
    // }
  });

  afterEach(function () {
    if (!this.currentTest.title.includes("mock")) {
      cy.deleteSuite(randomSuiteName);
    }
  });

  it("@smoke - Add suite successfully", () => {
    SuitePage.addSuite(randomSuiteName);
    cy.scrollTo("bottom");
    SuitePage.findSuiteInDOM(randomSuiteName);
    cy.get("@foundSuite").should("have.text", randomSuiteName);
  });

  it("@smoke - Add mock suite successfully", () => {
    cy.getMockSuite();
    SuitePage.addMockSuite();
    cy.wait("@postMockedSuite").then(({ response }) => {
      expect(response.body.suiteName).to.equal("New Suite Mock");
    });
    cy.wait("@getMockedSuites").then(() => {
      SuitePage.findSuiteInDOM("New Suite Mock");
      cy.get("@foundSuite").should("have.text", "New Suite Mock");
    });
  });
});
