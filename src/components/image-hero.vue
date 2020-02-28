/**
 * src/components/image-hero.vue
 * Displays an image in the hero sizes
 */

<style module>
  .hero {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .hero::after {
    content: "";
    display: block;
    padding-top: 56.25%;
    width: 100%;
  }

  .hero picture,
  .hero img {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  @media (min-width: 641px),
  (min-width: 321px) and (-webkit-min-device-pixel-ratio: 2),
  (min-width: 321px) and (min-resolution: 2dppx),
  (min-width: 321px) and (min-resolution: 192dpi) {
    .hero::after {
      padding-top: 35.15625%;
    }
  }
</style>

<script>
import { imageUrl } from '../utility/fastly'
import { sourceTagAttributes } from '../utility/html'

export default {
  name: 'SysAssetImageHero',

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
     * CDN url of the hero image
     */
    src: {
      type: String,
      required: true
    }
  },

  render (h, context) {
    const domain = context.props.domain || context.parent.$assetDomain

    const sizes = [
      { width: 640, height: 360 },
      { width: 1280, height: 450 },
      { width: 2560, height: 900 },
      { width: 5120, height: 1800 }
    ]

    const fastlyOptions = {
      blur: context.props.blur,
      brightness: context.props.brightness,
      contrast: context.props.contrast,
      fit: 'crop',
      format: 'pjpg',
      quality: context.props.quality,
      saturation: context.props.saturation
    }

    const builder = (opts) => {
      return imageUrl(domain, context.props.src, {
        ...fastlyOptions,
        ...opts
      })
    }
    const sources = sourceTagAttributes(
      context.props.src,
      sizes,
      builder
    )
      .map((attrs) => h('source', { attrs }))

    const imgOptions = {
      ...fastlyOptions,
      ...sizes[sizes.length - 1]
    }

    // We need this line for testing because require-extension-hooks does not
    // compile the style block, therefor the $style object is null.
    const heroStyle = (context.$style != null)
      ? context.$style.hero
      : null

    return h('div', { class: heroStyle }, [
      h('picture', context.data, [
        ...sources,
        h('img', {
          attrs: {
            alt: context.props.alt,
            src: imageUrl(domain, context.props.src, imgOptions)
          }
        })
      ])
    ])
  }
}; // eslint-disable-line semi
// Needed to make Vue test utils and require-extension-hooks work correctly
</script>
