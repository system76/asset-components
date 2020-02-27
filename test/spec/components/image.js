/**
 * test/spec/components/image.js
 * Tests the basic image component
 */

import { shallowMount } from '@vue/test-utils'
import test from 'ava'

import { DEFAULT_QUERY } from '../../_helpers'
import SysAssetImage from '../../../src/components/image'

test('creates an image with src tag', (t) => {
  const wrapper = shallowMount(SysAssetImage, {
    propsData: {
      domain: 'https://example.com',
      src: '/test.png'
    }
  })

  t.is(wrapper.attributes('src'), `https://example.com/test.png?${DEFAULT_QUERY}`)
})

test('can apply blur effect', (t) => {
  const wrapper = shallowMount(SysAssetImage, {
    propsData: {
      blur: 20,
      domain: 'https://example.com',
      src: '/test.png'
    }
  })

  t.is(wrapper.attributes('src'), `https://example.com/test.png?blur=20&${DEFAULT_QUERY}`)
})
