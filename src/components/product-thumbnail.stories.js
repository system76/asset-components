/**
 * src/components/product-thumbnail.stories.js
 * Storybook documentation for product-thumbnail component
 */

import { object, text } from '@storybook/addon-knobs'

import SysProductThumbnail from './product-thumbnail'

export default {
  title: 'SysProductThumbnail',
  component: SysProductThumbnail
}

export const withModel = () => ({
  props: {
    product: { default: text('product', 'thelio-r1') }
  },
  template: `
    <SysProductThumbnail
      :product="product"
    />
  `
})

export const withProduct = () => ({
  props: {
    product: { default: object('product', { name: 'Thelio AMD', model: 'thelio-r1' }) }
  },
  template: `
    <SysProductThumbnail
      :product="product"
    />
  `
})
