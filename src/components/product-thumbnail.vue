/**
 * src/components/product-thumbnail.vue
 * Displays the small thumbnail for a product.
 */

<script>
import { imageUrl } from '../utility/fastly'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../utility/vue'

export default {
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

  render (h, context) {
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
      width: 300,
      height: 300,
      format: 'png',
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
}
</script>
