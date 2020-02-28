/**
 * src/components/product-hero.vue
 * Displays a product hero
 *
 * TODO: We know the aspect ratio for the image, so we should hard set it to
 * avoid image load jank.
 */

<script>
import { joinUrl, imageUrl } from '../utility/fastly'
import { sourceTagAttributes } from '../utility/html'

export default {
  name: 'SysProductHero',

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
    },

    /**
     * CDN url of the image in the product folder
     */
    src: {
      type: String,
      default: '/hero.jpg'
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
      format: 'pjpg',
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    const builder = (opts) => imageUrl(domain, path, {
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
}
</script>
