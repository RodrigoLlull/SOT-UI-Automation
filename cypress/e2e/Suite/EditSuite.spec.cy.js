import DashboardPage from "../../support/PageObject/dashboard.page";
import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";

describe("EditSuite spec", () => {
  const randomSuiteName = generateRandomString(4);
  let randomSuiteNameToEdit = generateRandomString(4);

  beforeEach(() => {
    cy.loginByApi(randomSuiteName)
    cy.visit("/dashboard")
    DashboardPage.AccessToDesignPage();
    SuitePage.addSuite(randomSuiteName);
  });

  afterEach(()=> {
    SuitePage.findSuiteButtonByName(randomSuiteNameToEdit)
    SuitePage.deleteSuite()
  });

  it("Deberia haber un caso de prueba", () => {
    SuitePage.findSuiteButtonByName(randomSuiteName)
    SuitePage.editSuite(randomSuiteNameToEdit)
    cy.wait(4000)
    SuitePage.findSuite(randomSuiteNameToEdit);
    cy.get('@foundSuite').should("have.text", randomSuiteNameToEdit);
  });

  it.skip("Deberia haber un caso de prueba", () => {
    SuitePage.findSuiteButtonByName(randomSuiteName)
    randomSuiteNameToEdit="    ";
    SuitePage.editSuite(randomSuiteNameToEdit)
    cy.wait(4000)
    SuitePage.findSuite(randomSuiteNameToEdit);
    cy.get('@foundSuite').should("have.text", randomSuiteNameToEdit);
  });
});
