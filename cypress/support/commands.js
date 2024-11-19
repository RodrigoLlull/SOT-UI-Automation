// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginByApi", (sessionID) => {
  cy.session(
    sessionID,
    () => {
      cy.request({
        method: "POST",
        url: "https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/login",
        body: {
          email: Cypress.env("email"),
          password: Cypress.env("password"),
        },
      }).then((response) => {
        window.localStorage.setItem(".idToken", response.body.object.idToken);
        window.localStorage.setItem(
          ".refreshToken",
          response.body.object.refreshToken
        );
        window.localStorage.setItem("user", Cypress.env("email"));
        const token = response.body.object.idToken;
        Cypress.env("Authorization", token);
      });
    },
    {
      validate() {
        cy.visit("/dashboard");
      },
    }
  );
});

Cypress.Commands.add("getSuites", () => {

  cy.getProjects().then(()=>{
      const suiteUrl = `https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/${Cypress.env("projectId")}/suites`
      cy.request({
        method: "GET",
        url: suiteUrl,
        headers: {
          authorization: Cypress.env("Authorization"),
        },
      }).then((response) => {
        const suites = response.body.suitesInProject.map(
          ({ suiteId, suiteName }) => ({ suiteId, suiteName })
        );
        cy.wrap(suites).as("suites");
      });
  });
});

Cypress.Commands.add("getProjects", () => {
  const suiteUrl = `https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects`;
  cy.request({
    method: "GET",
    url: suiteUrl,
    headers: {
      authorization: Cypress.env("Authorization"),
    },
  }).then((response) => {
    const projectId = response.body.projects[0].projectId; 
    Cypress.env("projectId", projectId);
  });
});


Cypress.Commands.add('createMockSuite', () => {
  const endpoint = 'https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/PROJECT1726858529602/suites'

  cy.fixture('suiteCreated').then((mockSuite) => {
    cy.intercept('POST', endpoint, {
      statusCode: 201,
      body: mockSuite
    }).as('postMockedSuite')
  })
})

Cypress.Commands.add('getMockSuite', () => {
  const getEndpoint = 'https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/PROJECT1726858529602/suites?name='
  cy.fixture("suitesList").then((mockResponse) => {
    
    mockResponse.suitesInProject.push({
      suiteId: "789",
      projectId: "PROJECT1726858529602",
      suiteName: "New Suite Mock",
      suiteTotalCases: 0,
      suiteTotalSuites: 0,
      casesInSuite: [],
      suitesInSuite: [],
      casesInRun: []
    });
    mockResponse.totalSuitesInProject += 1;
    cy.intercept("GET", getEndpoint, {
      statusCode: 200,
      body: mockResponse,
    }).as("getMockedSuites");
  })
})