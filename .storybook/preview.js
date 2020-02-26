/**
 * .storybook/preview.js
 * Global view page modifications
 */

import centered from '@storybook/addon-centered/vue'
import { addDecorator } from '@storybook/vue'
import Vue from 'vue'

import { install } from '../src'

addDecorator(centered)

install(Vue, { domain: 'https://assets.genesis76.com' })
