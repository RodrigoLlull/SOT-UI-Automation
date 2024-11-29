class DashboardPage {

    get groupSubMenu() {
        return cy.get('[data-testid="optionsButton"]');
      }

    get editProject(){
      return cy.get('[data-testid="optionsButton-edit"]');
    }

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

    AccessToEditProjectPage(){
        this.groupSubMenu.click()
        this.editProject.click()
    }
}
export default new DashboardPage()