class DashboardPage {

    get TestDesignButton(){
        return cy.get(".css-19i0a4t")
    }
    get TestRunButton(){
        return cy.get(".ccss-1czjoxd")
    }

    AccessToDesignPage(){
        cy.wait(6000)
        this.TestDesignButton.click()
    }
    AccessToRunPage(){
        cy.wait(6000)
        this.TestDesignButton.click()
    }
}
export default new DashboardPage()