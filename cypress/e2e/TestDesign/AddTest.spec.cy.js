import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import DashboardPage from "../../support/PageObject/dashboard.page";
import SuitePage from "../../support/PageObject/suite.page";
import TestPage from "../../support/PageObject/test.page";

describe("AddSuite spec", () => {
  const randomSuiteName = generateRandomString(4);
  const randomTestName = generateRandomString(4)

    beforeEach(() => {
      cy.loginByApi(randomSuiteName);
      cy.visit("/dashboard");
      DashboardPage.AccessToDesignPage();
      SuitePage.addSuite(randomSuiteName);
    });
  
    afterEach(() => {
      SuitePage.deleteSuite(randomSuiteName);
    });

    it("Crear un caso de prueba", () => {
      TestPage.addTestCase(randomSuiteName, randomTestName);
      cy.scrollTo('bottom');
      SuitePage.findSuite(randomSuiteName);
      cy.get('@foundSuite').should("have.text", randomSuiteName);
    });
  });
  