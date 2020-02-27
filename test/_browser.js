/**
 * test/_browser.js
 * Sets up a browser environment for ava Vue testing
 */

require('browser-env')()

// BUG: https://github.com/nuxt/create-nuxt-app/issues/180
window.Date = global.Date = Date
