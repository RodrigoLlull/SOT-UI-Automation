class SuitePage {
  get addSuiteButton() {
    return cy.get('[data-testid="addSuiteButton"]');
  }

  get suiteNameInput() {
    return cy.get('[data-testid="nameInput"]');
  }

  get SuiteConfirmButton() {
    return cy.get('[data-testid="confirmButton"]');
  }

  get suitesArr() {
    return cy.get(".css-snrx14");
  }

  get lastSuite() {
    return cy.get(".css-snrx14").last();
  }

  get suiteNameToConfirmDelete() {
    return cy.get(".css-o3d33y strong");
  }

  get suiteEditInput() {
    return cy.get('[data-testid="editInput"]');
  }

  get suiteModal() {
    return cy.get(".content");
  }

  get suiteModal() {
    return cy.get(".content");
  }

  clickOnEditSuiteButtonBySuiteId(suiteId) {
    cy.get(`button[data-testid="editSuiteButton${suiteId}"]`)
      .as("editSuiteButton")
      .click();
  }

  clickOnDeleteButtonBySuiteId(suiteId) {
    cy.get(`button[data-testid="deleteSuiteButton${suiteId}"]`)
      .as("deleteSuiteButton")
      .click();
  }

  clickOnNestedButtonBySuiteId(suiteId) {
    cy.get(`button[data-testid="addNestedSuiteButton${suiteId}"]`)
      .as("addNestedSuiteButton")
      .click();
  }

  foundSuitesByNameInAPIResponse(suiteNameTarget) {
    return cy.getSuites().then(() => {
      return cy.get("@suites").then((suites) => {
        const targetSuite = suites.find(
          (suite) => suite.suiteName === suiteNameTarget
        );
        if (targetSuite) {
          return targetSuite.suiteId;
        } else {
          throw new Error(`Suite with name "${suiteNameTarget}" not found`);
        }
      });
    });
  }

  addSuite(name) {
    cy.createMockSuite();
    this.addSuiteButton.click();
    this.suiteNameInput.clear().type(name);
    this.SuiteConfirmButton.click();
    this.suiteModal.should("not.be.exist");
  }

  addMockSuite() {
    cy.createMockSuite();
    this.addSuiteButton.click();
    this.suiteNameInput.clear().type("New Suite Mock");
    this.SuiteConfirmButton.click();
    this.suiteModal.should("not.be.exist");
  }

  //Tanto aqui, como en editSuite, se utiliza el nuevo metodo de found SuiteID.
  deleteSuite(suiteName) {
    this.foundSuitesByNameInAPIResponse(suiteName).then((suiteId) => {
      this.clickOnDeleteButtonBySuiteId(suiteId);
    });
    this.suiteNameToConfirmDelete.then(($strong) => {
      const strongContent = $strong.text();
      this.suiteNameInput.clear().type(strongContent);
      this.SuiteConfirmButton.click();
    });
  }

  editSuite(suiteName, nameForEdit) {
    this.foundSuitesByNameInAPIResponse(suiteName).then((suiteId) => {
      this.clickOnEditSuiteButtonBySuiteId(suiteId);
    });
    this.suiteEditInput.clear().type(nameForEdit);
    this.SuiteConfirmButton.click();
    this.suiteModal.should("not.be.exist");
  }

  addNestedSuite(suiteName, nestedName) {
    this.foundSuitesByNameInAPIResponse(suiteName).then((suiteId) => {
      this.clickOnNestedButtonBySuiteId(suiteId);
    });
    this.suiteNameInput.clear().type(nestedName);
    this.SuiteConfirmButton.click();
    this.suiteModal.should("not.be.exist");
  }

  findSuiteInDOM(name) {
    let foundSuite = "";
    this.suitesArr
      .each((elem) => {
        if (elem.text() === name) {
          foundSuite = elem;
        }
      })
      .then(() => {
        cy.wrap(foundSuite).as("foundSuite");
      });
  }
}

export default new SuitePage();
