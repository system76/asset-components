/**
 * src/components/image.ts
 * A basic img tag but with fastly API options as props.
 */

import Vue from 'vue'

import { IFastlyFit, IFastlyFormat, imageUrl } from '../helpers/fastly'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../helpers/vue'

export default Vue.extend({
  functional: true,

  props: {
    alt: {
      type: String,
      default: null
    },

    domain: {
      type: String,
      default: null
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
      width: context.props.width,
      height: context.props.height,
      fit: <IFastlyFit> context.props.fit,
      format: <IFastlyFormat> context.props.format,
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
})
