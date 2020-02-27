/**
 * src/components/image.ts
 * A basic img tag but with fastly API options as props.
 */

import Vue from 'vue'

import { IFastlyFit, IFastlyFormat, imageUrl } from '../helpers/fastly'
import { VUE_FASTLY_MODIFICATION_PROPS } from '../helpers/vue'

export default Vue.extend({
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

    format: {
      type: String,
      default: undefined,
      validator: (v: string) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
    },

    height: {
      type: Number,
      default: undefined,
      validator: (v: number) => (v >= 1 && v <= 8192)
    },

    src: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: undefined,
      validator: (v: number) => (v >= 1 && v <= 8192)
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
