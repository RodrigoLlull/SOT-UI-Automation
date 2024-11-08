const suiteUrl = 'https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects/PROJECT1726858529602/suites'

export default function getSuitesIds(){
    cy.loginByApi().then(() => {
        cy.request({
            method: 'GET',
            url: suiteUrl,
            headers: {
                authorization: Cypress.env("Authorization"),
            }
        }).then((response) => {
            const suiteIds = response.body.suitesInProject.map(({ suiteId }) => suiteId);
            cy.wrap(suiteIds).as('suiteIds');
        })
    })
}