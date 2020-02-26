/**
 * src/vue.d.ts
 * Shim to the standard Vue type to include asset-component specific properties.
 */

import { IFastly } from './helpers/fastly'

declare module 'vue/types/vue' {
  interface Vue {
    $assetDomain: string
    $assetUrl: (src: string, options: IFastly) => string
  }
}
