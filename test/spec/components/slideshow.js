/**
 * test/spec/components/slideshow.js
 * Tests the slideshow component
 */

import { mount, shallowMount } from '@vue/test-utils'
import test from 'ava'

import SysSlideshow from '../../../src/components/slideshow'

test('does not throw if no slots given', (t) => {
  t.notThrows(() => shallowMount(SysSlideshow))
})

test('renders the first slot by default', (t) => {
  const wrapper = mount(SysSlideshow, {
    slots: {
      default: ['<div>slide 1</div>', '<div>slide 2</div>']
    }
  })

  const html = wrapper.html()

  t.true(html.includes('slide 1'))
  t.false(html.includes('slide 2'))
})

test('triggers the start of the slideshow when mounted', (t) => {
  const wrapper = mount(SysSlideshow, {
    slots: {
      default: ['<div>slide 1</div>', '<div>slide 2</div>']
    }
  })

  const emittedEvents = Object.keys(wrapper.emitted())
  t.true(emittedEvents.includes('started'))
})

test('renders foreground slot with active scope', (t) => {
  const wrapper = mount(SysSlideshow, {
    slots: {
      default: ['<div>slide 1</div>', '<div>slide 2</div>']
    },
    scopedSlots: {
      foregrounds: '<div slot-scope="{ active }">foreground {{ active }}</div>'
    }
  })

  const html = wrapper.html()

  t.true(html.includes('foreground 0'))
})
