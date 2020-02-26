/**
 * test/spec/components/image.ts
 * Tests the basic image component
 */

import test from 'ava'
import { mount } from '@vue/test-utils'

import SysProductThumbnail from '../../../src/components/product-thumbnail'

test('creates img tag with correct path', (t) => {
  const wrapper = mount(SysProductThumbnail, {
    propsData: {
      domain: 'https://example.com',
      product: 'thelio-r1'
    }
  })

  const imgSrc = wrapper.find('img').attributes('src') || ''

  t.true(imgSrc.startsWith('https://example.com/products/thelio-r1/thumb.png'))
})

test('creates img tag with a sane default alt attribute', (t) => {
  const wrapper = mount(SysProductThumbnail, {
    propsData: {
      domain: 'https://example.com',
      product: 'thelio-r1'
    }
  })

  const imgSrc = wrapper.find('img').attributes('alt') || ''

  t.true(imgSrc.includes('thelio-r1'))
  t.true(imgSrc.includes('thumbnail'))
})

test('sets size to 300x300 by default', (t) => {
  const wrapper = mount(SysProductThumbnail, {
    propsData: {
      domain: 'https://example.com',
      product: 'thelio-r1'
    }
  })

  const imgSrc = wrapper.find('img').attributes('src') || ''

  t.true(imgSrc.includes('height=300'))
  t.true(imgSrc.includes('width=300'))
})

test('creates a webp source tag', (t) => {
  const wrapper = mount(SysProductThumbnail, {
    propsData: {
      domain: 'https://example.com',
      product: 'thelio-r1'
    }
  })

  const imgSrc = wrapper.find('source[type="image/webp"]').attributes('src') || ''

  t.true(imgSrc.includes('format=webp'))
})
