/**
 * src/index.ts
 * Exports everything related to the package. Used for webpack / bundler entry
 * points.
 */

import { VueConstructor } from 'vue'

import * as components from './components'
import * as fastly from './helpers/fastly'

/** Options you can pass to this plugin */
interface IPluginOptions {
  /** The root domain Fastly assets are stored on */
  domain: string
}

export function install (Vue: VueConstructor, options: IPluginOptions) {
  Vue.prototype.$assetDomain = options.domain
  Vue.prototype.$assetUrl = fastly.imageUrlFactory(options.domain)

  Object.keys(components).forEach((componentName: string) => {
    Vue.component(componentName, components[componentName])
  })
}

export * from './components'
export * from './helpers/fastly'
