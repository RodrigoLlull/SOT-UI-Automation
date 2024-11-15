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

  // Esto seria la funcion findSuiteButtonByName() dividida en dos
  /* findSuiteButtonByName(suiteNameTarget) {
    getSuites();
    cy.get("@suites").then((suites) => {
      
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      )
      // esta es la parte que no logre solucionar
      if (targetSuite) {
        const { suiteId } = targetSuite
        return suiteId
      }});
      
  }

  clickOnDeleteButtonBySuiteName(suiteName) {
    const suiteObject = this.findSuiteButtonByName(suiteName)
    return cy.get(`button[data-testid="deleteSuiteButton${suiteObject}"]`).click()
  } 
  data-testid="addCaseButton1731303760068"  
  */

  clickOnDeleteButtonBySuiteName(suiteNameTarget) {
    cy.getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );

      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="deleteSuiteButton${suiteId}"]`)
          .as("deleteSuiteButton")
          .click();
      } else {
        throw new Error(`Suite with name "${suiteNameTarget}" not found`);
      }
    });
  }

  clickOnEditButtonBySuiteName(suiteNameTarget) {
    cy.getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );

      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="editSuiteButton${suiteId}"]`)
          .as("editSuiteButton")
          .click();
      } else {
        throw new Error(`Suite with name "${suiteNameTarget}" not found`);
      }
    });
  }

  clickOnNestedButtonBySuiteName(suiteNameTarget) {
    cy.getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );
      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="addNestedSuiteButton${suiteId}"]`).click();
      } else {
        throw new Error(`Suite with name "${suiteNameTarget}" not found`);
      }
    });
  }

  addSuite(name) {
    this.addSuiteButton.click();
    this.suiteNameInput.clear().type(name);
    this.SuiteConfirmButton.click();
  }

  deleteSuite(suiteName) {
    /* Asi llamariamos a la funcion y la linea cy.get("@foundDeleteSuiteButton").click(); pasaria a estar comentada
    Ademas al usar esta forma deleteSuite() pasaria a recibir un parametro deleteSuite(suiteName)
     */
    this.clickOnDeleteButtonBySuiteName(suiteName);
    this.suiteNameToConfirmDelete.then(($strong) => {
      const strongContent = $strong.text();
      this.suiteNameInput.clear().type(strongContent);
      this.SuiteConfirmButton.click();
    });
  }

  editSuite(suiteName, nameForEdit) {
    this.clickOnEditButtonBySuiteName(suiteName);
    this.suiteEditInput.clear().type(nameForEdit);
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

  addNestedSuite(suiteName, nestedName) {
    this.clickOnNestedButtonBySuiteName(suiteName);
    this.suiteNameInput.clear().type(nestedName);
    this.SuiteConfirmButton.click();
  }
}

export default new SuitePage();
