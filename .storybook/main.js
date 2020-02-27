/**
 * .storybook/main.js
 * Configuration for storybook
 */

module.exports = {
  stories: [
    '../src/**/*.stories.ts'
  ],
  addons: [
    '@storybook/addon-knobs/register'
  ]
}
