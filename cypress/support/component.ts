// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context'
import Router from 'next/router'


// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      nextMount: typeof mount;
      login: () => Chainable<void>;
      interceptUserData: () => Chainable<void>;
      getByDataId: (dataTestSelector: string) => Chainable<JQuery<HTMLElement>>;
      assertValueCopiedToClipboard: (value: string) => Chainable<void>;
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.add('nextMount', (component, options) => {
  const createRouter = (params: any) => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      basePath: '',
      back: cy.stub().as('router:back'),
      forward: cy.stub().as('router:forward'),
      push: cy.stub().as('router:push'),
      reload: cy.stub().as('router:reload'),
      replace: cy.stub().as('router:replace'),
      isReady: true,
      ...params,
  });
  // const router = createRouter(options?.router || {});

  // const createHeadManager = (params) => ({
  //     updateHead: cy.stub().as('head:updateHead'),
  //     mountedInstances: new Set(),
  //     updateScripts: cy.stub().as('head:updateScripts'),
  //     scripts: new Set(),
  //     getIsSsr: () => false,
  //     appDir: false,
  //     nonce: '_',
  //     ...params
  // })

  // const headManager = createHeadManager(options?.head || {})

  // return mount(
  //     <HeadManagerContext.Provider value={headManager}>
  //         <RouterContext.Provider value={router}>
  //             {component}
  //         </RouterContext.Provider>
  //     </HeadManagerContext.Provider>,
  //     options
  // )
})

export {}


// Example use:
// cy.mount(<MyComponent />)