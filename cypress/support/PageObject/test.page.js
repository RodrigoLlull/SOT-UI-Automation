class TestPage {
  get name() {
    return cy.get('[data-testid="nameField"]');
  }
  get labels() {
    return cy.get('[data-testid="labelsField"]');
  }
  get priorityDrop() {
    return cy.get('[data-testid="priorityDropdown"]');
  }
  get typeDrop() {
    return cy.get('[data-testid="typeDropdown"]');
  }
  get reference() {
    return cy.get('[data-testid="referenceField"]');
  }
  get preconditionsArea() {
    return cy.get('[name="preconditions"]');
  }

  get stepsArea() {
    return cy.get('[name="steps"]');
  }

  get expectedResultArea() {
    return cy.get('[name="expectedResult"]');
  }

  get addTestButton() {
    return cy.get('[data-testid="add test case"]');
  }

  get suiteModal() {
    return cy.get(".content");
  }

  clickOnAddCaseButtonBySuiteId(suiteId) {
    cy.get(`button[data-testid="addCaseButton${suiteId}"]`)
      .as("AddTestButton")
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

  addTestCase(suiteName, testName) {
    this.foundSuitesByNameInAPIResponse(suiteName).then((suiteId) => {
      this.clickOnAddCaseButtonBySuiteId(suiteId);
    });
    this.name.clear().type(testName);
    this.addTestButton.click()
    this.suiteModal.should('not.be.exist');
  }
}

export default new TestPage();
