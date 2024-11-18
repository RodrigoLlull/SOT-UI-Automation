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

  /**
   Este metodo sirve para obtener los id suite. Controla que existan en la peticion del back. 
   Aclarar que los return, funcionan como un enlace entre funcion anidada, sin ellos, la funcion superior no sabe que hizo su funcion hija, 
   y devuelve undefined.
   */
  foundSuitesByName(suiteNameTarget) {
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
    this.addSuiteButton.click();
    this.suiteNameInput.clear().type(name);
    this.SuiteConfirmButton.click();
  }

  //Tanto aqui, como en editSuite, se utiliza el nuevo metodo de found SuiteID.
  deleteSuite(suiteName) {
    this.foundSuitesByName(suiteName).then((suiteId) => {
      cy.log(`Suite ID obtenido: ${suiteId}`);
      this.clickOnDeleteButtonBySuiteId(suiteId);
    });
    this.suiteNameToConfirmDelete.then(($strong) => {
      const strongContent = $strong.text();
      this.suiteNameInput.clear().type(strongContent);
      this.SuiteConfirmButton.click();
    });
  }

  editSuite(suiteName, nameForEdit) {
    this.foundSuitesByName(suiteName).then((suiteId) => {
      cy.log(`Suite ID obtenido: ${suiteId}`);
      this.clickOnEditSuiteButtonBySuiteId(suiteId);
    });
    this.suiteEditInput.clear().type(nameForEdit);
    this.SuiteConfirmButton.click();
  }

  addNestedSuite(suiteName, nestedName) {
    this.foundSuitesByName(suiteName).then((suiteId) => {
      cy.log(`Suite ID obtenido: ${suiteId}`);
      this.clickOnNestedButtonBySuiteId(suiteId);
    });
    this.suiteNameInput.clear().type(nestedName);
    this.SuiteConfirmButton.click();
  }

  findSuite(name) {
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
