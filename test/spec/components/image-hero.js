/**
 * test/spec/components/image-hero.js
 * Tests the image hero component
 */

import { mount } from '@vue/test-utils'
import test from 'ava'

import SysAssetImageHero from '../../../src/components/image-hero'

test('creates img tag with correct path', (t) => {
  const wrapper = mount(SysAssetImageHero, {
    propsData: {
      alt: 'Image Test',
      domain: 'https://example.com',
      src: '/image.png'
    }
  })

  const imgSrc = wrapper.find('img').attributes('src') || ''

  t.true(imgSrc.startsWith('https://example.com/image.png'))
})

test('renders correct source tag sizes', (t) => {
  const wrapper = mount(SysAssetImageHero, {
    propsData: {
      alt: 'Image Test',
      domain: 'https://example.com',
      src: '/image.png'
    }
  })

  const srcSets = wrapper
    .findAll('source').wrappers
    .map((s) => (s.attributes('srcset') || ''))
    .filter((v) => !v.includes('webp'))

  t.true(srcSets[0].includes('5120'))
  t.true(srcSets[1].includes('2560'))
  t.true(srcSets[2].includes('1280'))
  t.true(srcSets[3].includes('640'))
})
