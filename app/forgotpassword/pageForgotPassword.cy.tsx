import React from "react";
import ForgotPassword from "./page";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as Router from "next/navigation";

describe("Testing the forgot password component", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/rest/v1/users*", {
      statusCode: 200,
      body: [
        { email: "mockuser@gmail.com" },
        { email: "user@gmail.com" },
        { email: "testuser@gmail.com" },
      ],
    }).as("emails");

    cy.intercept("POST", "**/auth/v1/recover*", {
      statusCode: 200,
      body: {},
    }).as("recover-email");
  });

  it("checks if user email exits in db", () => {
    const router = {
      push: cy.stub().as("router:push"),
      back: cy.stub().as("router:back"),
      forward: cy.stub().as("router:forward"),
      refresh: cy.stub().as("router:refresh"),
      replace: cy.stub().as("router:replace"),
      prefetch: cy.stub().as("router:prefetch"),
    };

    cy.stub(Router, "useRouter").returns(router);

    cy.mount(
      <AppRouterContext.Provider value={router}>
        <ForgotPassword />
      </AppRouterContext.Provider>
    );

    cy.getByDataId("err").should("not.exist");
    cy.get('input[name="email"]').type("johndoe@example.com");
    cy.getByDataId("submit").click();
    cy.wait("@emails");
    cy.getByDataId("err").should("be.visible");
    cy.getByDataId("err").should("contain.text", "We cannot find your email");
  });

  it("send recovery mail to user", () => {
    const router = {
      push: cy.stub().as("router:push"),
      back: cy.stub().as("router:back"),
      forward: cy.stub().as("router:forward"),
      refresh: cy.stub().as("router:refresh"),
      replace: cy.stub().as("router:replace"),
      prefetch: cy.stub().as("router:prefetch"),
    };

    cy.stub(Router, "useRouter").returns(router);

    cy.mount(
      <AppRouterContext.Provider value={router}>
        <ForgotPassword />
      </AppRouterContext.Provider>
    );


    cy.get('input[name="email"]')
      .type("mockuser@gmail.com")
      .should("have.value", "mockuser@gmail.com");

    cy.getByDataId("submit").click();
    // cy.wait("@emails")
    // cy.wait("@recover-email");

    cy.get('input[name="email"]').should("have.value", "");

  });

  it("should navigate back when the back button is clicked", () => {
    const router = {
      push: cy.stub().as("router:push"),
      back: cy.stub().as("router:back"),
      forward: cy.stub().as("router:forward"),
      refresh: cy.stub().as("router:refresh"),
      replace: cy.stub().as("router:replace"),
      prefetch: cy.stub().as("router:prefetch"),
    };
    cy.stub(Router, "useRouter").returns(router);

    cy.mount(
      <AppRouterContext.Provider value={router}>
        <ForgotPassword />
      </AppRouterContext.Provider>
    );

    cy.getByDataId('go-back').click();

    cy.get("@router:push").should("have.been.calledWith", "/login");
  });
});
