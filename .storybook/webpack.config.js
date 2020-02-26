/**
 * .storybook/webpack.config.js
 * Adds typescript support to storybook files
 */

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  })

  config.resolve.extensions.push('.ts')

  return config
}
