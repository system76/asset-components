/**
 * src/helpers/vue.ts
 * Some helpful Vue code that gets used in multiple places.
 */

export const VUE_FASTLY_MODIFICATION_PROPS = {
  blur: {
    type: Number,
    default: undefined,
    validator: (v: number) => (v >= 1 && v <= 1000)
  },

  brightness: {
    type: Number,
    default: undefined,
    validator: (v: number) => (v >= -100 && v <= 100)
  },

  contrast: {
    type: Number,
    default: undefined,
    validator: (v: number) => (v >= -100 && v <= 100)
  },

  fit: {
    type: String,
    default: undefined,
    validator: (v: string) => ['bounds', 'cover', 'crop'].includes(v)
  },

  quality: {
    type: Number,
    default: undefined,
    validator: (v: number) => (v >= 1 && v <= 100)
  },

  saturation: {
    type: Number,
    default: undefined,
    validator: (v: number) => (v >= -100 && v <= 100)
  }
}
