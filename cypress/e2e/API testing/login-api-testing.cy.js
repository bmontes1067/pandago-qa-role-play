/// <reference types="cypress" />

//TODO: Use Gherkin

import { LoginPage } from "../page-objects/login-page";
const loginPage = new LoginPage()
const email = "bmontes1067@gmail.com"
const notExistingEmail = "test@gmail.com"
const badFormedEmail = "bmontes1067@gmail"
const password = "Aa123456"
const incorrectPassword = "Aa12345"

beforeEach(() => {
    cy
        .visit('/');
});


it('test login', ()=>{

    loginPage.interceptLoginRequest()
    loginPage.interceptUsersRequest()

    loginPage.clickLogInMenuButton()
    loginPage.sendTextEmailInput(email)
    loginPage.sendTextPasswordInput(password)
    loginPage.clickLogInButton()

    cy
        .wait("@login")
        .then((login)=>{

            expect(login.response.statusCode).to.eq(200)
            expect(login.response.body.accessToken).not.to.be.null
            expect(login.request.body.email).to.eq(email)
            expect(login.request.body.password).to.eq(password)
        })

    cy
        .wait("@users")
        .then((users)=>{
            expect(users.response.statusCode).to.eq(200)
            expect(users.response.body.user.email).to.eq(email)
            expect(users.response.body.user.password).not.to.be.null
            expect(users.response.body.user.id).to.eq(1)
        })
})
it("failing password", ()=>{
    loginPage.interceptLoginRequest()

    loginPage.clickLogInMenuButton()
    loginPage.sendTextEmailInput(email)
    loginPage.sendTextPasswordInput(incorrectPassword)
    loginPage.clickLogInButton()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Incorrect password")
        })

})
it("failing email", ()=>{
    loginPage.interceptLoginRequest()

    loginPage.clickLogInMenuButton()
    loginPage.sendTextEmailInput(notExistingEmail)
    loginPage.sendTextPasswordInput(password)
    loginPage.clickLogInButton()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Cannot find user")
        })

})

it("incorrect email format", ()=>{
    loginPage.interceptLoginRequest()

    loginPage.clickLogInMenuButton()
    loginPage.sendTextEmailInput(badFormedEmail)
    loginPage.sendTextPasswordInput(password)
    loginPage.clickLogInButton()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Cannot find user")
        })

})

it("empty email & password", ()=>{
    loginPage.interceptLoginRequest()

    loginPage.clickLogInMenuButton()
    loginPage.clickLogInButton()

    cy
        .wait("@login")
        .then((login)=>{
            expect(login.response.statusCode).to.eq(400)
            expect(login.response.body).to.eq("Email and password are required")
        })

})