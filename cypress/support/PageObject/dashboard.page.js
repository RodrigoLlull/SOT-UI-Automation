class DashboardPage {

    get TestDesignButton(){
        return cy.get(".css-19i0a4t")
    }
    get TestRunButton(){
        return cy.get(".css-1czjoxd")
    }

    AccessToDesignPage(){
        this.TestDesignButton.click()
    }
    AccessToRunPage(){
        this.TestRunButton.click()
    }
}
export default new DashboardPage()