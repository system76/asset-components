/**
 * src/components/product-hero.vue
 * Displays a product hero
 *
 * TODO: We know the aspect ratio for the image, so we should hard set it to
 * avoid image load jank.
 */

<script>
import { joinUrl } from '../utility/fastly'
import SysAssetImageHero from './image-hero.vue'

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

    const alt = (context.props.alt != null)
      ? context.props.alt
      : (productName != null)
        ? `${productName} (${productModel}) hero`
        : `${productModel} hero`

    const src = joinUrl('products', productModel, context.props.src)

    return h(SysAssetImageHero, {
      ...context.data,
      props: {
        ...context.props,
        alt,
        src
      }
    })
  }
}
</script>
