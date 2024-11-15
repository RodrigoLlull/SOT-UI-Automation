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
    SuitePage.addSuite(randomSuiteName);
  });

  afterEach(() => {
    SuitePage.deleteSuite(randomSuiteNameToEdit);
  });

  it("Edit suite successfuly", () => {
    cy.wait(3000);
    cy.scrollTo("bottom");
    SuitePage.editSuite(randomSuiteName, randomSuiteNameToEdit)
    cy.wait(3000);//Si no hago un wait aqui, nuestro find suite, no encuentra el elemento, porque el programa demora en responder que actualizo la lista.
    cy.scrollTo("bottom");
    SuitePage.findSuite(randomSuiteNameToEdit);
    cy.get('@foundSuite').should("have.text", randomSuiteNameToEdit);
  });
});
