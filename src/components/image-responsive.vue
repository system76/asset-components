/**
 * src/components/image-responsive.vue
 * Displays a responsive picture tag
 */

<script>
import { imageUrl } from '../utility/fastly'
import { sourceTagAttributes } from '../utility/html'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../utility/vue'

export default {
  name: 'SysProductThumbnail',

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

    sizes: {
      type: Array,
      default: () => []
    },

    src: {
      type: String,
      required: true
    },

    ...VUE_FASTLY_MODIFICATION_PROPS
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
