import React from 'react'
import FaqSection from './faq'

describe('Accordion component check', () => {
  it('opens and closes accordion correctly', () => {
    cy.mount(<FaqSection />)
    
    cy.get('[data-id="accordion-body-1"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-2"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-3"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-4"]').should("not.be.visible");

    cy.get('[data-id="accordion-btn-1"]').click();
    cy.get('[data-id="accordion-body-1"]').should("be.visible");
    cy.get('[data-id="accordion-btn-1"]').click();
    cy.get('[data-id="accordion-body-1"]').should("not.be.visible");

    cy.get('[data-id="accordion-btn-2"]').click();
    cy.get('[data-id="accordion-body-2"]').should("be.visible");
    cy.get('[data-id="accordion-btn-2"]').click();
    cy.get('[data-id="accordion-body-2"]').should("not.be.visible");

    cy.get('[data-id="accordion-btn-3"]').click();
    cy.get('[data-id="accordion-body-3"]').should("be.visible");
    cy.get('[data-id="accordion-btn-3"]').click();
    cy.get('[data-id="accordion-body-3"]').should("not.be.visible");

    cy.get('[data-id="accordion-btn-4"]').click();
    cy.get('[data-id="accordion-body-4"]').should("be.visible");
    cy.get('[data-id="accordion-btn-4"]').click();
    cy.get('[data-id="accordion-body-4"]').should("not.be.visible");
  })

  it('checks accordion closes when another accordion opens', () => {
    cy.mount(<FaqSection />)
    
    cy.get('[data-id="accordion-body-1"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-2"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-3"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-4"]').should("not.be.visible");

    cy.get('[data-id="accordion-btn-1"]').click();
    cy.get('[data-id="accordion-body-1"]').should("be.visible");

    cy.get('[data-id="accordion-btn-2"]').click();
    cy.get('[data-id="accordion-body-1"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-2"]').should("be.visible");

    cy.get('[data-id="accordion-btn-3"]').click();
    cy.get('[data-id="accordion-body-2"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-3"]').should("be.visible");

    cy.get('[data-id="accordion-btn-4"]').click();
    cy.get('[data-id="accordion-body-3"]').should("not.be.visible");
    cy.get('[data-id="accordion-body-4"]').should("be.visible");
  })
})