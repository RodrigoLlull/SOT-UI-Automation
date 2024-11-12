import DashboardPage from "../../support/PageObject/dashboard.page";
import LoginPage from "../../support/PageObject/login.page";
import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";

describe("EditSuite spec", () => {
  const RandomSuitename = generateRandomString(4);
  let RandomSuitenameToEdit = generateRandomString(4);

  beforeEach(() => {
    LoginPage.login(Cypress.env("email"), Cypress.env("password"));
    DashboardPage.AccessToDesignPage();
    SuitePage.addSuite(RandomSuitename);
  });

  afterEach(()=> {
    SuitePage.findSuiteButtonByName(RandomSuitenameToEdit)
    SuitePage.deleteSuite()
  });

  it("Deberia haber un caso de prueba", () => {
    SuitePage.findSuiteButtonByName(RandomSuitename)
    SuitePage.editSuite(RandomSuitenameToEdit)
    cy.wait(4000)
    SuitePage.findSuite(RandomSuitenameToEdit);
    cy.get('@foundSuite').should("have.text", RandomSuitenameToEdit);
  });

  it.skip("Deberia haber un caso de prueba", () => {
    SuitePage.findSuiteButtonByName(RandomSuitename)
    RandomSuitenameToEdit="    ";
    SuitePage.editSuite(RandomSuitenameToEdit)
    cy.wait(4000)
    SuitePage.findSuite(RandomSuitenameToEdit);
    cy.get('@foundSuite').should("have.text", RandomSuitenameToEdit);
  });
});
