import dashboardPage from "../../support/PageObject/dashboard.page";
import loginPage from "../../support/PageObject/login.page";

describe("AddSuite spec", () => {
    beforeEach(() => {
      cy.loginByApi(randomSuiteName)
      cy.visit("/dashboard")
      dashboardPage.AccessToDesignPage();
    });
  
    it("Deberia haber un caso de prueba ", () => {});
  });
  