/**
 * src/components/product-thumbnail.ts
 * Displays the small thumbnail for a product.
 */

import Vue, { VNode } from 'vue'

import { IFastlyFit, IFastlyFormat, imageUrl } from '../helpers/fastly'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../helpers/vue'

export default Vue.extend({
  name: 'SysProductThumbnail',

  functional: true,

  props: {
    domain: {
      type: String,
      default: undefined
    },

    product: {
      type: [String, Object],
      required: true
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

    const imageAlt = (productName != null)
      ? `${productName} (${productModel}) thumbnail`
      : `${productModel} thumbnail`

    const domain = context.props.domain || context.parent.$assetDomain
    const path = `/products/${productModel}/thumb.png`

    const fastlyOptions = {
      width: context.props.width || 300,
      height: context.props.height || 300,
      fit: <IFastlyFit> context.props.fit,
      format: <IFastlyFormat> context.props.format,
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    return h('picture', context.data, [
      h('source', {
        attrs: {
          src: imageUrl(domain, path, { ...fastlyOptions, format: 'webp' }),
          type: 'image/webp'
        }
      }),
      h('img', {
        attrs: {
          alt: imageAlt,
          src: imageUrl(domain, path, fastlyOptions)
        }
      })
    ])
  }
})
