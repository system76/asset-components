/**
 * src/components/image.vue
 * A basic img tag but with fastly API options as props.
 */

<script>
import { imageUrl } from '../utility/fastly'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../utility/vue'

export default {
  name: 'SysAssetImage',

  functional: true,

  props: {
    alt: {
      type: String,
      default: undefined
    },

    domain: {
      type: String,
      default: undefined
    },

    fit: {
      type: String,
      default: undefined,
      validator: (v) => ['bounds', 'cover', 'crop'].includes(v)
    },

    format: {
      type: String,
      default: undefined,
      validator: (v) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
    },

    height: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 8192)
    },

    src: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: undefined,
      validator: (v) => (v >= 1 && v <= 8192)
    },

    ...VUE_FASTLY_MODIFICATION_PROPS
  },

  render (h, context) {
    const domain = context.props.domain || context.parent.$assetDomain
    const fastlyOptions = {
      width: context.props.width,
      height: context.props.height,
      fit: context.props.fit,
      format: context.props.format,
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    return h('img', Object.assign({}, context.data, {
      attrs: {
        alt: context.props.alt,
        src: imageUrl(domain, context.props.src, fastlyOptions)
      }
    }))
  }
}
</script>
