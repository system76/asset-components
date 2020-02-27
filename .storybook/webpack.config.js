/**
 * .storybook/webpack.config.js
 * Adds typescript support to storybook files
 */

const { resolve } = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-docgen-loader',
    enforce: 'post'
  })

  const cssRule = config.module.rules.find((rule) => {
    return rule.test.test('main.css')
  })

  cssRule.use[0] = 'vue-style-loader'
  cssRule.use[1].options['modules'] = true

  config.module.rules.push({
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: true
    }
  })

  return config
}
