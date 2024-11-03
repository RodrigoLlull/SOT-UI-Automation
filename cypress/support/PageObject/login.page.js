class LoginPage {

    get emailInput(){
        return cy.get(".css-1x5jdmq")
    }

    get passWordInput(){
        return cy.get(".css-1uvydh2")
    }

    get loginButton(){
        return cy.get(".css-11kbwr")
    }

    get errorMessage(){
        return cy.get(".css-1dcn4bj")
    }

    login(email, password){
        cy.visit("/")
        this.emailInput.clear().type(email)
        this.passWordInput.clear().type(password)
        this.loginButton.click()
    }
}
export default new LoginPage()