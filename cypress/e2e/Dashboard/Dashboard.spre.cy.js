import dashboardPage from "../../support/PageObject/dashboard.page"
import loginPage from "../../support/PageObject/login.page"

describe('Dashboard spec', () => {

    beforeEach(() => {
        cy.loginByApi(randomSuiteName)
        cy.visit("/dashboard")
    })

    it('Acces to Test-Design', () => {
        dashboardPage.AccessToDesignPage();
        cy.wait(4000)
        cy.url().should("eq", "https://d2yqnm7qbjnp0v.cloudfront.net/test-design?id=PROJECT1726858662783&name=GROUP+06")        
    })

})