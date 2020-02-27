/**
 * src/components/product-hero.stories.ts
 * Storybook documentation for product-hero component
 */

import { number, object, text } from '@storybook/addon-knobs'

import SysProductHero from './product-hero'

export default {
  title: 'SysProductHero',
  component: SysProductHero
}

export const withModel = () => ({
  props: {
    product: { default: text('product', 'oryp5') }
  },
  template: `
    <SysProductHero
      :product="product"
    />
  `
})

export const withCustomAlt = () => ({
  props: {
    alt: { default: text('alt', 'Sales Hero for Oryx Pro 5') }
  },
  template: `
    <SysProductHero
      :alt="alt"
      product="oryp5"
    />
  `
})

export const withProduct = () => ({
  props: {
    product: { default: object('product', { name: 'Oryx Pro', model: 'oryp5' }) }
  },
  template: `
    <SysProductHero
      :product="product"
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
    <SysProductHero
      :blur="blur == 0 ? null : blur"
      :brightness="brightness"
      :contrast="contrast"
      :quality="quality"
      :saturation="saturation"
      product="oryp5"
    />
  `
})
