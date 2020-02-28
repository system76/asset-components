/**
 * src/components/product-thumbnail.vue
 * Displays the small thumbnail for a product.
 */

<script>
import { imageUrl } from '../utility/fastly'

export default {
  name: 'SysProductThumbnail',

  functional: true,

  props: {
    /**
     * Alt tag for the image. It will default to a sane value with the given
     * `product` prop
     */
    alt: {
      type: String,
      default: undefined
    },

    /**
     * A number between 1 and 1000 for the amount of blur to apply to the image
     */
    blur: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 1000)
    },

    /**
     * A number between -100 and 100 to manipulate the brightness of the image
     */
    brightness: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= -100 && v <= 100)
    },

    /**
     * A number between -100 and 100 to manipulate the contrast of the image
     */
    contrast: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= -100 && v <= 100)
    },

    /**
     * The root CDN domain. Defaults to what is set when the plugin is installed
     */
    domain: {
      type: String,
      default: undefined
    },

    /**
     * The quality of optimization you want to be
     */
    quality: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 100)
    },

    /**
     * A number between -100 and 100 to manipulate the saturation of the image
     */
    saturation: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= -100 && v <= 100)
    },

    /**
     * A product model string or object that includes the model string
     */
    product: {
      type: [String, Object],
      required: true
    }
  },

  render (h, context) {
    const productModel = (typeof context.props.product === 'string')
      ? context.props.product
      : context.props.product.model

    const productName = (typeof context.props.product !== 'string')
      ? context.props.product.name
      : null

    const imageAlt = (context.props.alt != null)
      ? context.props.alt
      : (productName != null)
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
