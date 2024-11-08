import loginPage from "../../support/PageObject/login.page";
import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import dashboardPage from "../../support/PageObject/dashboard.page";

describe("AddSuite spec", () => {
  beforeEach(() => {
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    dashboardPage.AccessToDesignPage();
    cy.wait(6000)
  });

  it("Add suite successfully", () => {
    const randomStringName = generateRandomString(10);
    SuitePage.addSuite(randomStringName);
    cy.scrollTo('bottom');
    cy.wait(5000)
    SuitePage.findSuite(randomStringName);
    cy.get('@foundSuite').should("have.text", randomStringName);
  });

  /*it.skip("Add Nested-suite successfully", () => {
    const randomStringName = generateRandomString(10);
    cy.wait(6000);
    SuitePage.addNestedSuite(randomStringName);
    cy.wait(6000);

    SuitePage.lastSuite.should("have.text", randomStringName);

     SuitePage.suitesArr.each((elem) =>{
            if (elem.text() === randomStringName) {
            expect(elem.text()).to.equal(randomStringName)
            }
        }) 
  });*/
});
