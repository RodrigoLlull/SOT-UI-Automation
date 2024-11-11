export default function getProject(){
    const ProjectUrl = 'https://b02a6jye04.execute-api.us-east-1.amazonaws.com/dev/projects'
    cy.loginByApi().then(() => {
        cy.request({
            method: 'GET',
            url: ProjectUrl,
            headers: {
                authorization: Cypress.env("Authorization"),
            }
        }).then((response) => {
            const project = response.body.projects.map(({ projectId }) => ({ projectId }));
            cy.wrap(project).as('project');
        })
    })
}
