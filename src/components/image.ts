/**
 * src/components/image.ts
 * A basic img tag but with fastly API options as props.
 */

import Vue from 'vue'

import { IFastlyFit, IFastlyFormat, imageUrl } from '../helpers/fastly'

export default Vue.extend({
  functional: true,

  props: {
    alt: {
      type: String,
      default: null
    },

    blur: {
      type: Number,
      default: null
    },

    brightness: {
      type: Number,
      default: null
    },

    contrast: {
      type: Number,
      default: null
    },

    domain: {
      type: String,
      default: null
    },

    fit: {
      type: String,
      default: 'cover',
      validator: (v) => ['bounds', 'cover', 'crop'].includes(v)
    },

    format: {
      type: String,
      default: null,
      validator: (v) => ['png', 'jpg', 'pjpg', 'webp'].includes(v)
    },

    height: {
      type: Number,
      default: null
    },

    quality: {
      type: Number,
      default: null
    },

    saturation: {
      type: Number,
      default: null
    },

    src: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: null
    }
  },

  render (h, context) {
    const domain = context.props.domain || context.parent.$assetDomain
    const fastlyOptions = {
      width: context.props.width,
      height: context.props.height,
      fit: context.props.fit as IFastlyFit,
      format: context.props.format as IFastlyFormat,
      quality: context.props.quality,
      blur: context.props.blur,
      brightness: context.props.brightness,
      saturation: context.props.saturation,
      contrast: context.props.contrast
    }

    return h('img', {
      attrs: {
        alt: context.props.alt,
        height: context.props.height,
        src: imageUrl(domain, context.props.src, fastlyOptions),
        width: context.props.width
      }
    })
  }
})
