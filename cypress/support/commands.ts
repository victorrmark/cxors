/// <reference types="cypress" />


Cypress.Commands.add("getByDataId", (dataTestSelector) =>{
    return cy.get(`[data-id="${dataTestSelector}"]`)
})

Cypress.Commands.add("login", () => {
    cy.session('login', () => {
      const email = Cypress.env("email");
      const password = Cypress.env("password");
    
      if (!email || !password) {
        throw new Error("Login email or password is not defined in environment variables");
      }
  
      cy.visit("/login");
    
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
    
      cy.get('[data-id="login"]').click();
    
      cy.url().should("include", "/dashboard");
    })
  
  });
  
  Cypress.Commands.add("interceptUserData", () => {
    cy.intercept(
      "GET",
      "https://hmonshbvvhhiuppdlwxg.supabase.co/auth/v1/user",
      {
        statusCode: 200,
        body: {
          email: "mockuser@example.com",
          user_metadata: {
            display_name: "Mock User",
          },
        },
      }
    ).as("getUserData");
  });

  Cypress.Commands.add('assertValueCopiedToClipboard', value => {
    cy.window().then(win => {
      win.navigator.clipboard.readText().then(text => {
        expect(text).to.eq(value)
      })
    })
  })