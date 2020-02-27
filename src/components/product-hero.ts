/**
 * src/components/product-hero.ts
 * Displays a product hero
 *
 * TODO: We know the aspect ratio for the image, so we should hard set it to
 * avoid image load jank.
 */

import Vue, { VNode } from 'vue'

import { IFastlyFormat, IFastly, joinUrl, imageUrl } from '../helpers/fastly'
import { sourceTagAttributes } from '../helpers/html'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../helpers/vue'

export default Vue.extend({
  name: 'SysProductHero',

  functional: true,

  props: {
    alt: {
      type: String,
      required: true
    },

    domain: {
      type: String,
      default: undefined
    },

    product: {
      type: [String, Object],
      required: true
    },

    src: {
      type: String,
      default: '/hero.jpg'
    },

    ...VUE_FASTLY_MODIFICATION_PROPS
  },

  render (h, context): VNode {
    const productModel = (typeof context.props.product === 'string')
      ? context.props.product
      : context.props.product.model

    const productName = (typeof context.props.product !== 'string')
      ? context.props.product.name
      : null

    const imageAlt = (context.props.alt != null)
      ? context.props.alt
      : (productName != null)
      ? `${productName} (${productModel}) hero`
      : `${productModel} hero`

    const domain = context.props.domain || context.parent.$assetDomain
    const path = joinUrl('products', productModel, context.props.src)

    const sizes = [
      { width: 640, height: 360 },
      { width: 1280, height: 450 },
      { width: 2560, height: 900 },
      { width: 5120, height: 1800 }
    ]

    const fastlyOptions = {
      format: <IFastlyFormat> 'jpg',
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    const builder = (opts: IFastly) => imageUrl(domain, path, {
      ...fastlyOptions,
      ...opts
    })
    const sources = sourceTagAttributes(
      context.props.src,
      sizes,
      builder
    )
      .map((attrs) => h('source', { attrs }))

    return h('picture', context.data, [
      ...sources,
      h('img', {
        attrs: {
          alt: imageAlt,
          src: imageUrl(domain, path, fastlyOptions)
        }
      })
    ])
  }
})
