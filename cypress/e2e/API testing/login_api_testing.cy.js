/// <reference types="cypress" />

//TODO: Use Gherkin
//TODO: Use POM

beforeEach(() => {
    cy
        .visit('/');
});


it('test login', ()=>{
    cy.intercept({
        method: 'POST',
        url:'/login'
    }).as("login")

    cy.intercept({
        method:'GET',
        url: '/api/users'
    }).as('users')

    cy.get('[data-cy="login-menu"]').click()
    cy.get('[data-cy="login-email"]').type("bmontes1067@gmail.com")
    cy.get('[data-cy="login-password"]').type("Aa123456")
    cy.get('[data-cy="login"]').click()

    cy
        .wait("@login")
        .then((login)=>{

            expect(login.response.statusCode).to.eq(200)
            expect(login.response.body.accessToken).not.to.be.null
            expect(login.request.body.email).to.eq("bmontes1067@gmail.com")
            expect(login.request.body.password).to.eq("Aa123456")
        })

    cy
        .wait("@users")
        .then((users)=>{
            expect(users.response.statusCode).to.eq(200)
            expect(users.response.body.user.email).to.eq("bmontes1067@gmail.com")
            expect(users.response.body.user.password).not.to.be.null
            expect(users.response.body.user.id).to.eq(1)
        })
})
it("failing password", ()=>{
    cy.intercept({
        method: 'POST',
        url:'/login'
    }).as("login")

    cy.get('[data-cy="login-menu"]').click()
    cy.get('[data-cy="login-email"]').type("bmontes1067@gmail.com")
    cy.get('[data-cy="login-password"]').type("Aa12345")
    cy.get('[data-cy="login"]').click()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Incorrect password")
        })

})
it("failing email", ()=>{
    cy.intercept({
        method: 'POST',
        url:'/login'
    }).as("login")

    cy.get('[data-cy="login-menu"]').click()
    cy.get('[data-cy="login-email"]').type("test@gmail.com")
    cy.get('[data-cy="login-password"]').type("Aa123456")
    cy.get('[data-cy="login"]').click()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Cannot find user")
        })

})

it("incorrect email format", ()=>{
    cy.intercept({
        method: 'POST',
        url:'/login'
    }).as("login")

    cy.get('[data-cy="login-menu"]').click()
    cy.get('[data-cy="login-email"]').type("test@gmail")
    cy.get('[data-cy="login-password"]').type("Aa123456")
    cy.get('[data-cy="login"]').click()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Cannot find user")
        })

})