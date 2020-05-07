/**
 * src/components/image-responsive.vue
 * Displays a responsive picture tag
 */

<style module>
  .img {
    height: auto;
    max-width: 100%;
  }
</style>

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
      default: 'cover',
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
      blur: context.props.blur,
      brightness: context.props.brightness,
      contrast: context.props.contrast,
      fit: context.props.fit,
      format: context.props.format,
      quality: context.props.quality,
      saturation: context.props.saturation
    }

    const enableWebpSources = (fastlyOptions.format !== 'webp' && !context.props.src.endsWith('webp'))

    const sources = sourceTagAttributes(
      domain,
      context.props.src,
      context.props.sizes,
      { ...fastlyOptions, webp: enableWebpSources }
    )

    const imgOptions = {
      ...fastlyOptions,
      ...(typeof context.props.sizes[context.props.sizes.length - 1] === 'number')
        ? { width: context.props.sizes[context.props.sizes.length - 1] }
        : context.props.sizes[context.props.sizes.length - 1]
    }

    return h('picture', context.data, [
      ...sources.map((attrs) => h('source', { attrs })),
      h('img', {
        attrs: {
          alt: context.props.alt,
          src: imageUrl(domain, context.props.src, imgOptions)
        },
        // During unit tests, we don't compile styles, so context.$style is null
        class: (context.$style != null) ? context.$style.img : null
      })
    ])
  }
}; // eslint-disable-line semi
// Needed to make Vue test utils and require-extension-hooks work correctly
</script>
