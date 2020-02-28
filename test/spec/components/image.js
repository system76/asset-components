/**
 * test/spec/components/image.js
 * Tests the basic image component
 */

import { shallowMount } from '@vue/test-utils'
import test from 'ava'

import SysAssetImage from '../../../src/components/image'

test('creates an image with src tag', (t) => {
  const wrapper = shallowMount(SysAssetImage, {
    propsData: {
      alt: 'test',
      domain: 'https://example.com',
      src: '/test.png'
    }
  })

  t.true(wrapper.attributes('src').startsWith(`https://example.com/test.png`))
})

test('can apply blur effect', (t) => {
  const wrapper = shallowMount(SysAssetImage, {
    propsData: {
      alt: 'test',
      blur: 20,
      domain: 'https://example.com',
      src: '/test.png'
    }
  })

  t.true(wrapper.attributes('src').startsWith('https://example.com/test.png'))
  t.true(wrapper.attributes('src').includes('?blur=20'))
})
