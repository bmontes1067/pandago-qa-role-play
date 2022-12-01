export class LoginPage{
    interceptLoginRequest(){
        cy.intercept({
            method: 'POST',
            url:'/login'
        }).as("login")
    }
    interceptUsersRequest(){
        cy.intercept({
            method:'GET',
            url: '/api/users'
        }).as('users')
    }
    clickLogInMenuButton(){
        cy.get('[data-cy="login-menu"]').click()
    }
    sendTextEmailInput(email){
        cy.get('[data-cy="login-email"]').type(email)
    }
    sendTextPasswordInput(password){
        cy.get('[data-cy="login-password"]').type(password)
    }
    clickLogInButton(){
        cy.get('[data-cy="login"]').click()
    }
}