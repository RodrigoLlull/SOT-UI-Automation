class EditProjectPage {

    get mailInput() {
        return cy.get('[data-testid="email"]');
      }

    get rolBasic(){
      return cy.get('[value="Basic"]');
    }

    get rolAdmin(){
      return cy.get('[value="Admin"]');
    }

    get AddUserButton(){
      return cy.get('.css-166rx80')
    }

    addUserAdmin(email) {
      this.mailInput.clear().type(email);
      this.rolAdmin.click();
      this.AddUserButton.click();
    }


}

export default new EditProjectPage();
