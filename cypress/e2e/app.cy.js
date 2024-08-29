// const { describe } = require("node:test")

describe("Homepage", () => {
  describe("checks that navigation buttons appear on homepage", () => {
    it("should navigate to link clicked", () => {
      cy.visit("/");

      cy.get('a[href*="features"]').click();
      cy.url().should("include", "/#features");
      //   cy.get('a[href="/signup"]').should('be.visible')
      //   cy.get('a[href="/login"]').should('be.visible')

      cy.get('a[href*="how-to-use"]').click();
      cy.url().should("include", "/#how-to-use");

      cy.get('a[href*="faq"]').click();
      cy.url().should("include", "/#faq");

      // The new page should contain an h1 with "About"
      //   cy.get('h1').contains('About')
    });
  });

  describe("user should be able to navigate to signup and enter details", () => {
    it("should navigate to signup page", () => {
      cy.visit("/");

      cy.get('[data-id="signup"]').click();
      cy.url().should("include", "/signup");

      cy.get('input[id="name"]').type("Victor John Doe");
      cy.get('input[id="email"]').type("test@example.com");
      cy.get('input[id="password"]').type("password123");
      cy.get('input[id="confirm-password"]').type("password123");

      cy.get('button[type="submit"]').should("be.visible");

    });
  });

  describe("user should be able to navigate to login page login", () => {
    it("should navigate to login page", () => {
  //     cy.intercept("POST", "**/auth/v1/user", {
  //       statusCode: 200,
  //       body: {
  //         access_token: "mockAccessToken",
  //         refresh_token: "mockRefreshToken",
  //         user: {
  //           id: "mockUserId",
  //           email: "test@example.com",
  //         },
  //       },
  //     }).as("login");

      cy.visit("/")

      cy.get('a[href="/login"]').click();
      cy.url().should("include", "/login");

      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");

      cy.get('[data-id="login"]').should('be.visible');
      // cy.get('[data-id="login"]').click();
      // cy.wait("@login");

    });
  });
});
// wanted to run a full e2e test, but i can't mock the user login
// i don't want to use a valid login so it doesn't hit the backend everytime
// i'll keep on trying and working on it
