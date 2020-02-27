/**
 * src/components/image-responsive.stories.js
 * Storybook documentation for image-responsive component
 */

import { array, text } from '@storybook/addon-knobs'

import SysAssetImageResponsive from './image-responsive'

export default {
  title: 'SysAssetImageResponsive',
  component: SysAssetImageResponsive
}

export const withSrc = () => ({
  props: {
    alt: { default: text('alt', 'A test image') },
    src: { default: text('src', '/about/blake-1.jpg') }
  },
  template: `
    <SysAssetImageResponsive
      :alt="alt"
      :src="src"
    />
  `
})

export const withWidths = () => ({
  props: {
    sizes: { default: array('sizes', ['320', '640', '1280', '2560'], ',') },
    src: { default: text('src', '/about/blake-1.jpg') }
  },
  template: `
    <SysAssetImageResponsive
      :sizes="sizes.map((size) => Number(size))"
      alt="A test image"
      src="/about/blake-1.jpg"
    />
  `
})
