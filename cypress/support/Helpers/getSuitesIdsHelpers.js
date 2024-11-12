import getProject from "./getProjectId";

export default function getSuites(){
const suiteUrl = `https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/${Cypress.env("projectId")}/suites`

    // getProject().then(()=>{
    //     suiteUrl = `https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/${Cypress.env("projectId")}/suites`
    // });
    //Deberia utilizar get project para modificar el url dependiendo del proyecto.
    cy.loginByApi().then(() => {
        cy.request({
            method: 'GET',
            url: suiteUrl,
            headers: {
                authorization: Cypress.env("Authorization"),
            }
        }).then((response) => {
            const suites = response.body.suitesInProject.map(({ suiteId, suiteName }) => ({ suiteId, suiteName }));
            cy.wrap(suites).as('suites');
        })
    })
}
