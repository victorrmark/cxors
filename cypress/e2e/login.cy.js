
describe("user login with valid credentials", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get('a[href="/login"]').click();
      cy.url().should("include", "/login");
      cy.login()
      cy.interceptUserData()
    });

    it("checks that user is logged in", () => {
      cy.visit("/dashboard");

      cy.wait("@getUserData");

      cy.contains("Mock User").should("be.visible");
      cy.contains("mockuser@example.com").should("be.visible");

      cy.getByDataId("heading").should("be.visible")
      cy.getByDataId("home").should("be.visible")
      cy.getByDataId("links").should("be.visible")
      cy.getByDataId("qrcode").should("be.visible")
      cy.getByDataId("settings").should("be.visible")

    });

    describe("user activity", ()=>{
        beforeEach(()=>{
            cy.visit("/dashboard");
            cy.wait("@getUserData");

            cy.intercept(
                "GET",
                "**/rest/v1/urls*",
                {
                  statusCode: 200,
                  body: [{"short_path":"search"}],
                }
            ).as("shortpaths");

        })

        it("fills url shortening form with invalid details", ()=>{
            cy.wait("@shortpaths")

            cy.getByDataId("submit").should('not.be.disabled')

            cy.getByDataId("invalid-url").should("not.exist");
            cy.getByDataId("url")
              .type("www.google.c0m")
              .should("have.value", 'www.google.c0m')
            cy.getByDataId("invalid-url").should("be.visible");

            cy.getByDataId("title")
              .type("Google")
              .should("have.value", 'Google')

            cy.getByDataId("invalid-path").should("not.exist");
            cy.getByDataId("path")
              .type("search")
              .should("have.value", 'search')
            cy.getByDataId("invalid-path").should("be.visible");

            cy.getByDataId("submit").should('be.disabled')
        })

        it("fills url shortening form with valid credentials", ()=>{
            cy.wait("@shortpaths")

            cy.intercept(
                "POST",
                "https://cxors.vercel.app/api/shorten",
                {
                  statusCode: 200,
                  body: {"shortUrl":"https://cxorz.vercel.app/altschool"},
                }
            ).as("shorturl");


            cy.getByDataId("url")
              .type("www.altschoolafrica.com")
              .should("have.value", 'www.altschoolafrica.com')

            cy.getByDataId("title")
              .type("AltSchool")
              .should("have.value", 'AltSchool')

            cy.getByDataId("path")
              .type("altschool")
              .should("have.value", 'altschool')

            cy.getByDataId("submit").click()

            cy.wait('@shorturl')
              .its('response.statusCode')
              .should('eq', 200);

            cy.getByDataId('path-header').should('be.visible').and('contain.text', 'Yeah!! You have Cxorsed a link!');
            cy.getByDataId('short-url').should('be.visible').and('contain.text', 'https://cxorz.vercel.app/altschool');

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

            cy.contains("Link copied").should("be.visible")

            cy.getByDataId('close').click();
            cy.getByDataId('path-header').should('not.exist');
            cy.getByDataId('short-url').should('not.exist');
        })

        it("logs user out", ()=>{
          cy.getByDataId("open-logout").click()
          cy.getByDataId("logout").should("be.visible")
          cy.getByDataId("logout").should("contain.text", "Logout").click()
          cy.url().should("include", "/login");

        })
    })
  });