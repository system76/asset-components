/**
 * .storybook/manager.js
 * Adds System76 theme to storybook
 */

import { addons } from '@storybook/addons'

import { theme } from './theme'

addons.setConfig({ theme })
