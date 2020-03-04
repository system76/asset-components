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
    transition: opacity 200ms linear;
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
export default {
  name: 'SysSlideshow',

  props: {
    /** The number of milliseconds between slide transitions. */
    delay: {
      type: Number,
      default: 5000
    },

    /**
     * A CSS class name for the Vue transition component. Set to `false` to
     * disable any transitions.
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
      return this.$slots.default
        .filter((vnode) => (vnode != null))
        .filter((vnode) => (vnode.tag != null))
        .map((vnode, i) => {
          vnode.key = i
          return vnode
        })
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

    transitionClasses () {
      if (this.transition === false) {
        return {}
      } else if (typeof this.transition === 'string') {
        return { name: this.transition }
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
}
</script>
