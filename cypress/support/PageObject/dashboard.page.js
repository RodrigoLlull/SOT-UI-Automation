class DashboardPage {

    get groupButton(){
        return cy.get(".css-19i0a4t")
    }

    AccessToDesignPage(){
        cy.wait(8000)
        this.groupButton.click()
    }
}
export default new DashboardPage()