/**
 * .storybook/main.js
 * Configuration for storybook
 */

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-vue-info/lib/register'
  ]
}
