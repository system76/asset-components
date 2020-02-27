/**
 * src/components/image.stories.js
 * Storybook documentation for image component
 */

import { number, select, text } from '@storybook/addon-knobs'

import SysAssetImage from './image'

export default {
  title: 'SysAssetImage',
  component: SysAssetImage
}

export const withSrc = () => ({
  props: {
    alt: { default: text('alt', 'A test image') },
    src: { default: text('src', '/about/blake-1.jpg') }
  },
  template: `
    <SysAssetImage
      :alt="alt"
      :src="src"
    />
  `
})

export const withDimensions = () => ({
  props: {
    fit: { default: select('fit', ['bounds', 'cover', 'crop'], 'crop') },
    height: { default: number('height', 400) },
    width: { default: number('width', 400) }
  },
  template: `
    <SysAssetImage
      src="/about/blake-1.jpg"
      :fit="fit"
      :height="height"
      :width="width"
    />
  `
})

export const withModifications = () => ({
  props: {
    blur: { default: number('blur', 0, { min: 0, max: 9999 }) },
    brightness: { default: number('brightness', 0, { min: -100, max: 100 }) },
    contrast: { default: number('contrast', 0, { min: -100, max: 100 }) },
    quality: { default: number('quality', 75, { min: 1, max: 100 }) },
    saturation: { default: number('saturation', 0, { min: -100, max: 100 }) }
  },
  template: `
    <SysAssetImage
      src="/about/blake-1.jpg"
      :blur="blur == 0 ? null : blur"
      :brightness="brightness"
      :contrast="contrast"
      :height="400"
      :quality="quality"
      :saturation="saturation"
      :width="400"
    />
  `
})
