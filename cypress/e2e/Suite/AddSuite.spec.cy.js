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

  afterEach(()=> {
    SuitePage.findSuiteButtonByName(randomSuiteName)
    SuitePage.deleteSuite()
  });

  it("Add suite successfully", () => {
    SuitePage.addSuite(randomSuiteName);
    cy.wait(4000)
    cy.scrollTo('bottom');
    SuitePage.findSuite(randomSuiteName);
    cy.get('@foundSuite').should("have.text", randomSuiteName);
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
