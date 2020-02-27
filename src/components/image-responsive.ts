/**
 * src/components/image-responsive.ts
 * Displays a responsive picture tag
 */

import Vue, { VNode } from 'vue'

import { IFastlyFit, IFastlyFormat, IFastly, imageUrl } from '../helpers/fastly'
import { sourceTagAttributes } from '../helpers/html'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../helpers/vue'

export default Vue.extend({
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

    format: {
      type: String,
      default: undefined,
      validator: (v: string) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
    },

    sizes: {
      type: Array as () => Number[],
      default: () => []
    },

    src: {
      type: String,
      required: true
    },

    ...VUE_FASTLY_MODIFICATION_PROPS
  },

  render (h, context): VNode {
    const domain = context.props.domain || context.parent.$assetDomain
    const fastlyOptions = {
      fit: <IFastlyFit> context.props.fit,
      format: <IFastlyFormat> context.props.format,
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    const enableWebpSources = (fastlyOptions.format !== 'webp' && !context.props.src.endsWith('webp'))
    const builder = (opts: IFastly) => imageUrl(domain, context.props.src, {
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
})
