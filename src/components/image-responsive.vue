/**
 * src/components/image-responsive.vue
 * Displays a responsive picture tag
 */

<script>
import { imageUrl } from '../utility/fastly'
import { sourceTagAttributes } from '../utility/html'

export default {
  name: 'SysProductThumbnail',

  functional: true,

  props: {
    /**
     * Alt tag for the image
     */
    alt: {
      type: String,
      required: true
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
     * Enum of 'bounds' 'cover' or 'crop' depending how you want images resized
     */
    fit: {
      type: String,
      default: undefined,
      validator: (v) => ['bounds', 'cover', 'crop'].includes(v)
    },

    /**
     * The format you want the image. Will disable adding webp source tags if
     * you pick webp here
     */
    format: {
      type: String,
      default: undefined,
      validator: (v) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
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
     * A list of widths or width and heights to make the image
     */
    sizes: {
      type: Array,
      default: () => []
    },

    /**
     * CDN url of the image
     */
    src: {
      type: String,
      required: true
    }
  },

  render (h, context) {
    const domain = context.props.domain || context.parent.$assetDomain
    const fastlyOptions = {
      fit: context.props.fit,
      format: context.props.format,
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    const enableWebpSources = (fastlyOptions.format !== 'webp' && !context.props.src.endsWith('webp'))
    const builder = (opts) => imageUrl(domain, context.props.src, {
      ...fastlyOptions,
      ...opts
    })
    const sources = sourceTagAttributes(
      context.props.src,
      context.props.sizes,
      builder,
      { webp: enableWebpSources }
    )
      .map((attrs) => h('source', { attrs }))

    return h('picture', context.data, [
      ...sources,
      h('img', {
        attrs: {
          alt: context.props.alt,
          src: imageUrl(domain, context.props.src, fastlyOptions)
        }
      })
    ])
  }
}
</script>
