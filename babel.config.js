/**
 * @typedef { import('babel__core').TransformOptions } BabelrcOptions
 */

/**
 * @type { BabelrcOptions }
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    process.env.NODE_ENV === 'coverage' && [[
      'babel-plugin-istanbul', {
        include: ['**/src/**/*.{js,ts,vue}'],
        exclude: ['**/tests/**']
      }]
    ],
    ['@babel/plugin-transform-runtime'],
    ['babel-plugin-styled-components']
  ].filter(Boolean),
  comments: false
}
