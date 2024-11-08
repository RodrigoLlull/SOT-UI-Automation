import getSuitesIds from "../../support/Helpers/getSuitesIdsHelpers";
class SuitePage {

  get addSuiteButton() {
    return cy.get('[data-testid="addSuiteButton"]');
  }

  get suiteNameInput() {
    return cy.get('[data-testid="nameInput"]');
  }

  get addSuiteConfirmButton() {
    return cy.get('[data-testid="confirmButton"]');
  }

  get addNestedSuiteButton() {
    return cy.get('[data-testid="addNestedSuiteButton1730783026310"]');
  }

  get suitesArr() {
    return cy.get(".css-snrx14");
  }

  get lastSuite() {
    return cy.get(".css-snrx14").last();
  }

  get suiteNameToConfirmDelete() {
    return cy.get(".css-o3d33y strong")
  }

  findDeleteSuiteButton(suiteIdTarget) {
    getSuitesIds();
    cy.get('@suiteIds').then((suiteIds) =>{
      suiteIds.forEach((suiteId) => {
        if (suiteIdTarget === suiteId) {
          cy.get(`button[data-testid="deleteSuiteButton${suiteId}"]`).as('foundDeleteSuiteButton')
        }
      })
    })
  }

  deleteSuite(){
    cy.get('@foundDeleteSuiteButton').click()
    this.suiteNameToConfirmDelete.then(($strong) =>{
      const strongContent = $strong.text()
      this.suiteNameInput.clear().type(strongContent)
      this.addSuiteConfirmButton.click()
    })
  }
  
  addSuite(name) {
    this.addSuiteButton.click();
    this.suiteNameInput.clear().type(name);
    this.addSuiteConfirmButton.click();
  }

  findSuite(name) {
    let foundSuite = ''

    this.suitesArr.each((elem) =>{
      if (elem.text() === name) {
        foundSuite = elem
      }
    }).then (() => {
      cy.wrap(foundSuite).as('foundSuite')
    })
  }

  addNestedSuite(name) {
    this.addNestedSuiteButton.click();
    this.suiteNameInput.clear().type(name);
    this.addSuiteConfirmButton.click();
  }
}

export default new SuitePage();
