/**
 * .storybook/preview.js
 * Global view page modifications
 */

import centered from '@storybook/addon-centered/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/vue'
import Vue from 'vue'

import { install } from '../src'

addDecorator(centered)
addDecorator(withKnobs)

install(Vue, { domain: 'https://assets.genesis76.com' })
