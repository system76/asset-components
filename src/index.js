/**
 * src/index.js
 * Exports everything related to the package. Used for webpack / bundler entry
 * points.
 */

import * as components from './components'

export function install (Vue, options) {
  Vue.prototype.$assetDomain = options.domain

  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName])
  })
}

export * from './components'
