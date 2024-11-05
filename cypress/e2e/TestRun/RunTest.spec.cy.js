import dashboardPage from "../../support/PageObject/dashboard.page";
import loginPage from "../../support/PageObject/login.page";

describe("AddSuite spec", () => {
    beforeEach(() => {
      loginPage.login(Cypress.env("email"), Cypress.env("password"));
      dashboardPage.AccessToRunPage();
    });
  
    it("Deberia haber un caso de prueba ", () => {});
  });
  