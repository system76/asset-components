/**
 * src/components/image.vue
 * A basic img tag but with fastly API options as props.
 */

<style module>
  .img {
    height: auto;
    max-width: 100%;
  }
</style>

<script>
import { imageUrl } from '../utility/fastly'

export default {
  name: 'SysAssetImage',

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
     * The format you want the image
     */
    format: {
      type: String,
      default: undefined,
      validator: (v) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
    },

    /**
     * The resized image height in pixels
     */
    height: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 8192)
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
     * CDN url of the image
     */
    src: {
      type: String,
      required: true
    },

    /**
     * The resized image width in pixels
     */
    width: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 8192)
    }
  },

  render (h, context) {
    const domain = context.props.domain || context.parent.$assetDomain
    const fit = (context.props.fit != null)
      ? context.props.fit
      : (context.props.height != null && context.props.width != null)
        ? 'crop'
        : 'cover'

    const fastlyOptions = {
      blur: context.props.blur,
      brightness: context.props.brightness,
      contrast: context.props.contrast,
      fit,
      format: context.props.format,
      height: context.props.height,
      quality: context.props.quality,
      saturation: context.props.saturation,
      width: context.props.width
    }

    return h('img', Object.assign({}, context.data, {
      attrs: {
        alt: context.props.alt,
        height: context.props.height,
        src: imageUrl(domain, context.props.src, fastlyOptions),
        width: context.props.width
      },
      // During unit tests, we don't compile styles, so context.$style is null
      class: (context.$style != null) ? context.$style.img : null
    }))
  }
}; // eslint-disable-line semi
// Needed to make Vue test utils and require-extension-hooks work correctly
</script>
