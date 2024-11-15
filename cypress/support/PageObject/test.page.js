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

  get addTestButton(){
    return cy.get('[data-testid="add test case"]')
  }

  clickOnAddTestButtonBySuiteName(suiteNameTarget) {
    cy.getSuites();
    cy.get("@suites").then((suites) => {
      const targetSuite = suites.find(
        (suite) => suite.suiteName === suiteNameTarget
      );

      if (targetSuite) {
        const { suiteId } = targetSuite;
        cy.get(`button[data-testid="addCaseButton${suiteId}"]`)
          .as("AddTestButton")
          .click();
      } else {
        throw new Error(`Suite with name "${suiteNameTarget}" not found`);
      }
    });
  }

  addTest(suiteName, testName) {
    this.clickOnAddTestButtonBySuiteName(suiteName);
    this.name.clear().type(testName);
    this.addTestButton.click()
  }
}

export default new TestPage();
