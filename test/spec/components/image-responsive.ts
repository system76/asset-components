/**
 * test/spec/components/image-responsive.ts
 * Tests the image responsive component
 */

import test from 'ava'
import { mount } from '@vue/test-utils'

import SysAssetImageResponsive from '../../../src/components/image-responsive'

test('creates img tag with correct path', (t) => {
  const wrapper = mount(SysAssetImageResponsive, {
    propsData: {
      alt: 'Image',
      domain: 'https://example.com',
      src: '/image.png'
    }
  })

  const imgSrc = wrapper.find('img').attributes('src') || ''

  t.true(imgSrc.startsWith('https://example.com/image.png'))
})

test('does not include webp sources if format is already set to webp', (t) => {
  const wrapper = mount(SysAssetImageResponsive, {
    propsData: {
      alt: 'Image',
      domain: 'https://example.com',
      format: 'webp',
      sizes: [320, 640],
      src: '/image.png'
    }
  })

  const sourceTags = wrapper.findAll('source')

  t.is(sourceTags.length, 2)
})
