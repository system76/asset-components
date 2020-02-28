/**
 * .storybook/preview.js
 * Global view page modifications
 */

import Vue from 'vue'

import { install } from '../src'

install(Vue, { domain: 'https://assets.genesis76.com' })
