class SuitePage{

    get addSuiteButton() {
        return cy.get('[data-testid="addSuiteButton"]')
    }

    get suiteNameInput() {
        return cy.get('[data-testid="nameInput"]')
    }

    get addSuiteConfirmButton() {
        return cy.get('[data-testid="confirmButton"]')
    }

    get suitesArr() {
        return cy.get('.css-snrx14')
    }

    get lastSuite() {
        return cy.get('.css-snrx14').last()
    }

    

    addSuite(name) {
        this.addSuiteButton.click()
        this.suiteNameInput.clear().type(name)
        this.addSuiteConfirmButton.click()
    }
}

export default new SuitePage()