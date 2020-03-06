/**
 * src/components/slideshow.vue
 * Rotates between a bunch of given assets
 */

<style module>
  .container {
    position: relative;
  }

  .enter-active,
  .leave-active {
    transition: opacity 100ms linear;
  }

  .enter,
  .leave,
  .enter-to,
  .leave-to {
    left: 0;
    position: absolute;
    top: 0;
  }

  .enter,
  .leave-to {
    opacity: 0;
  }

  .enter-to,
  .leave {
    opacity: 1;
  }

  .enter {
    z-index: 1;
  }

  .leave {
    z-index: 0;
  }

  .foreground {
    position: absolute;
    z-index: 2;
  }
</style>

<script>
const TRANSITION_COMPONENT_PROPS = [
  'enterActiveClass',
  'enterClass',
  'enterToClass',
  'leaveActiveClass',
  'leaveClass',
  'leaveToClass'
]

export default {
  name: 'SysSlideshow',

  props: {
    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    enterActiveClass: {
      type: String,
      default: null
    },

    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    enterClass: {
      type: String,
      default: null
    },

    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    enterToClass: {
      type: String,
      default: null
    },

    /** The number of milliseconds between slide transitions. */
    delay: {
      type: Number,
      default: 5000
    },

    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    leaveActiveClass: {
      type: String,
      default: null
    },

    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    leaveClass: {
      type: String,
      default: null
    },

    /**
     * See https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    leaveToClass: {
      type: String,
      default: null
    },

    /**
     * A CSS class name for the Vue transition component. Set to `false` to
     * disable any transitions. See
     * https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes
     */
    transition: {
      type: [String, Boolean],
      default: true
    }
  },

  data: () => ({
    active: 0,

    interval: null
  }),

  computed: {
    backgrounds () {
      if (this.$scopedSlots.default != null) {
        return this.$scopedSlots
          .default({ active: this.active })
          .filter((vnode) => (vnode != null))
          .filter((vnode) => (vnode.tag != null))
          .map((vnode, i) => {
            vnode.key = i
            return vnode
          })
      } else {
        return []
      }
    },

    foregrounds () {
      if (this.$scopedSlots.foregrounds != null) {
        return this.$scopedSlots
          .foregrounds({ active: this.active })
          .filter((vnode) => (vnode != null))
          .filter((vnode) => (vnode.tag != null))
          .map((vnode) => {
            vnode.data.class = this.$style.foreground
            return vnode
          })
      } else {
        return []
      }
    },

    hasCustomTransitionClasses () {
      return TRANSITION_COMPONENT_PROPS
        .map((key) => this[key])
        .some((v) => (v != null))
    },

    transitionClasses () {
      if (this.transition === false) {
        return {}
      } else if (typeof this.transition === 'string') {
        return { name: this.transition }
      } else if (this.hasCustomTransitionClasses) {
        const output = {}

        for (const key in TRANSITION_COMPONENT_PROPS) {
          output[key] = this[key]
        }

        return output
      } else {
        return {
          enterClass: this.$style.enter,
          enterActiveClass: this.$style['enter-active'],
          enterToClass: this.$style['enter-to'],
          leaveClass: this.$style.leave,
          leaveActiveClass: this.$style['leave-active'],
          leaveToClass: this.$style['leave-to']
        }
      }
    }
  },

  mounted () {
    this.start()
  },

  beforeDestroy () {
    this.stop()
  },

  methods: {
    next () {
      if (this.active === this.backgrounds.length - 1) {
        this.active = 0
      } else {
        this.active++
      }

      /**
       * Emits when the next slide shows. The value is the zero index of what
       * slide is now active.
       */
      this.$emit('next', this.active)
    },

    reset () {
      this.stop()
      this.active = 0
      this.start()
    },

    start () {
      this.interval = setInterval(() => this.next(), this.delay)
      /** Emits when the slideshow starts */
      this.$emit('started')
    },

    stop () {
      clearInterval(this.interval)
      /** Emits when the slideshow stops */
      this.$emit('stopped')
    }
  },

  render (h) {
    const backgroundAttrs = {
      props: {
        ...this.transitionClasses,
        mode: 'in-out',
        tag: 'div'
      }
    }

    const background = h('transition', backgroundAttrs, [
      this.backgrounds[this.active]
    ])

    return h('div', { class: this.$style.container }, [
      background,
      ...this.foregrounds
    ])
  }
}; // eslint-disable-line semi
// Needed to make Vue test utils and require-extension-hooks work correctly
</script>
