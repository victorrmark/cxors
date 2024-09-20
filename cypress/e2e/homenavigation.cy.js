describe("Homepage Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("checks that navigation buttons appear on homepage", () => {
    it("should navigate to link clicked", () => {
      cy.contains(/simplify your links/i)
      cy.get('a[href*="features"]').click();
      cy.url().should("include", "/#features");

      cy.get('a[href*="how-to-use"]').click();
      cy.url().should("include", "/#how-to-use");

      cy.get('a[href*="faq"]').click();
      cy.url().should("include", "/#faq");
    });
  });

  describe("user should be able to navigate to signup and enter details", () => {
    it("should navigate to signup page", () => {
      cy.getByDataId("signup").click()
      cy.url().should("include", "/signup");

      cy.get('input[id="name"]').type("Victor John Doe");
      cy.get('input[id="email"]').type("test@example.com");
      cy.get('input[id="password"]').type("password123");
      cy.get('input[id="confirm-password"]').type("password123");

      cy.get('button[type="submit"]').should("be.visible");
    });
  });

  describe("Test user login with invalid credentials", () => {
    it("throws errors with invalid signin", () => {
      cy.get('a[href="/login"]').click();
      cy.url().should("include", "/login");

      cy.getByDataId("invalid-login").should("not.exist");
      
      cy.get('input[name="email"]').type("johndoe@example.com");
      cy.get('input[name="password"]').type("password123");

      cy.getByDataId("login").click();
      cy.getByDataId("invalid-login").should("be.visible");


    });
  });

});
// wanted to run a full e2e test, but i can't mock the user login
// i don't want to use a valid login so it doesn't hit the backend everytime
// i'll keep on trying and working on it
