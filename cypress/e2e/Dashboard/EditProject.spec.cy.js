import generateRandomString from "../../support/Helpers/stringRandomHelpers";
import dashboardPage from "../../support/PageObject/dashboard.page";
import editProjectPage from "../../support/PageObject/editProject.page";

describe("EditProject spec", () => {
    const randomSuiteName = generateRandomString(4);
   // const randomNestedSuiteName = generateRandomString(4);
    
    beforeEach(() => {
      cy.loginByApi(randomSuiteName)
      cy.visit("/dashboard")
      dashboardPage.AccessToEditProjectPage();
    });
  
    // afterEach(()=> {
    //   SuitePage.deleteSuite(randomSuiteName)
    // });
  
    it("@regression - Add user successfully", () => {
      editProjectPage.addUserAdmin("falsoEmail@gmail.com");
      cy.get("tbody").contains("falsoEmail@gmail.com").should("exist");
    });
  
  });