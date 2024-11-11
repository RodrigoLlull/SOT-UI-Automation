import getSuites from "../../support/Helpers/getSuitesIdsHelpers";

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
    return cy.get(".css-1x5jdmq");
  }

  findSuiteButtonByName(suiteNameTarget) {
    getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );

      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="deleteSuiteButton${suiteId}"]`).as(
          "foundDeleteSuiteButton"
        );
        cy.get(`button[data-testid="editSuiteButton${suiteId}"]`).as(
          "foundEditSuiteButton"
        );
      } else {
        throw new Error(`Suite with name "${suiteNameTarget}" not found`);
      }
    });
  }

  findNestedSuiteButtonByName(suiteNameTarget) {
    getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );
      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="addNestedSuiteButton${suiteId}"]`).as(
          "foundNestedSuiteButton"
        );
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

  deleteSuite() {
    cy.get("@foundDeleteSuiteButton").click();
    this.suiteNameToConfirmDelete.then(($strong) => {
      const strongContent = $strong.text();
      this.suiteNameInput.clear().type(strongContent);
      this.SuiteConfirmButton.click();
    });
  }

  editSuite(nameForEdit) {
    cy.get("@foundEditSuiteButton").click();
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

  addNestedSuite(name) {
    cy.get("@foundNestedSuiteButton").click();
    this.suiteNameInput.clear().type(name);
    this.SuiteConfirmButton.click();
  }
}

export default new SuitePage();
