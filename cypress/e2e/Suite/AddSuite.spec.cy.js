import loginPage from "../../support/PageObject/login.page";
import SuitePage from "../../support/PageObject/suite.page";
import generateRandomString from "../../support/Helpers/stringRandomHelpers";


describe('AddSuite spec', () => {

    beforeEach(() => {
            loginPage.login(Cypress.env("email"), Cypress.env("password"))
    })

    it('Add suite successfully', () => {
        const randomStringName = generateRandomString(10)
        cy.wait(8000)
        SuitePage.addSuite(randomStringName)
        cy.wait(8000)

        SuitePage.lastSuite.should("have.text", randomStringName)
        
        /* SuitePage.suitesArr.each((elem) =>{
            if (elem.text() === randomStringName) {
            expect(elem.text()).to.equal(randomStringName)
            }
        }) */
    })
})