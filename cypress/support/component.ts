import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '../../.nuxt/router'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // Create router if one is not provided
  if (!options.global.plugins.some(plugin => plugin.hasOwnProperty('install'))) {
    options.global.plugins.push(
      createRouter({
        history: createMemoryHistory(),
        routes: routes
      })
    )
  }

  return mount(component, options)
})
