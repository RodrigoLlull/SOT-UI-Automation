import dashboardPage from "../../support/PageObject/dashboard.page";
import loginPage from "../../support/PageObject/login.page";

describe.skip("AddSuite spec", () => {
    beforeEach(() => {
      cy.loginByApi(randomSuiteName)
      cy.visit("/dashboard")
      dashboardPage.AccessToRunPage();
    });
  
    it("Deberia haber un caso de prueba ", () => {});
  });
  