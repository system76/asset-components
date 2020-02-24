/**
 * src/components/image.ts
 * A basic img tag but with fastly API options as props.
 */

import Vue from 'vue'

export default Vue.extend({
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
    return h('img', context.children)
  }
})
