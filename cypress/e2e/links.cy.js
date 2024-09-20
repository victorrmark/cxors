describe("link section", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('a[href="/login"]').click();
    cy.url().should("include", "/login");
    cy.login();
    cy.interceptUserData();
  });

  it("shortened link is visible to user", () => {
    cy.intercept("GET", "**/rest/v1/urls*", {
      statusCode: 200,
      body: [
        {
          id: "eab-2",
          original_url: "www.altschoolafrica.com",
          short_path: "altschool",
          title: "AltSchool",
          created_at: "2024-09-16T00:14:15.478797+00:00",
          visit_count: 5,
          last_location: "Lagos, Nigeria",
        },
      ],
    }).as("shortlinks");

    cy.visit("/dashboard/links");

    cy.wait("@shortlinks");
    cy.wait("@getUserData");

    cy.getByDataId("heading").should("be.visible");
    cy.window().then((win) => {
        if (!win.navigator.clipboard) {
            win.navigator.clipboard = {
              writeText: () => {}
            };
          }
        cy.stub(win.navigator.clipboard, "writeText").resolves().as('clipboardWrite');
      });
    cy.getByDataId("copy-url").click();
    cy.get('@clipboardWrite').should(
        'have.been.calledOnceWith',
        'https://cxorz.vercel.app/altschool',
    )
    cy.contains('Copied to clipboard').should("be.visible")
  });
});
