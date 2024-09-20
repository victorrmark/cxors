
describe("settings section", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('a[href="/login"]').click();
    cy.url().should("include", "/login");
    cy.login();
    cy.interceptUserData();
  });

  it("User should be able to view and update settings", () => {
    cy.visit("/dashboard/settings");

    cy.wait("@getUserData");

    cy.getByDataId("heading").should("contain.text", "Settings");

    cy.getByDataId("display-name").should("have.value", "Mock User");
    cy.getByDataId("change-name").should("be.disabled");

    cy.getByDataId("display-name").clear().type("New User");
    cy.getByDataId("change-name").should("not.be.disabled");

    cy.getByDataId("display-name").clear().type("Mock User");
    cy.getByDataId("change-name").should("be.disabled");

    cy.getByDataId("user-email").should("contain.text", "mockuser@example.com");
  });

  describe("user tries to update password", () => {
    beforeEach(() => {
      cy.visit("/dashboard/settings");
      cy.wait("@getUserData");
    });

    it("password update with incorrect current password", () => {
      cy.intercept("POST", "**/auth/v1/token*", {
        statusCode: 400,
        body: {
          code: "invalid_credentials",
          message: "Invalid login credentials",
        },
      }).as("password");

      cy.getByDataId("current-pw").type("1234567");
      cy.getByDataId("new-pw").type("12345");
      cy.getByDataId("confirm-pw").type("12345");
      cy.getByDataId("change-pw").click();
      cy.wait("@password");
      cy.getByDataId("err").should("be.visible");
      cy.getByDataId("err").should(
        "contain.text",
        "Current password is incorrect"
      );
    });
  });
});
