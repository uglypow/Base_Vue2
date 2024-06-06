/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
/**
 * @typedef { import("@vue/cli-service").ProjectOptions } ProjectOptions
 * @typedef { import("@vue/cli-service").ConfigFunction } ConfigFunction
 */
const path = require('path')
const { execSync } = require('child_process')
const os = require('os')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const webpack = require('webpack')
const deps = require('./package.json').dependencies
/**
 * @type { ProjectOptions }
 */

module.exports = {
  chainWebpack: (webpackConfig) => {
    webpackConfig.devtool('source-map')

    webpackConfig.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false  // exclude all comments from output
      }
      return args
    })

    webpackConfig
    .plugin('fork-ts-checker')
    .tap(args => {
      const MIN_MEM = 1024
      const THRESHOLD = MIN_MEM * 2
      const MAX_MEM = MIN_MEM * 12
      const totalMem = Math.floor(os.totalmem() * Math.pow(10, -6))
      args[0].typescript.memoryLimit = totalMem > THRESHOLD ? MAX_MEM : MIN_MEM
      args[0].typescript.configFile = path.resolve(__dirname, 'tsconfig.json')
      return args
    })

    if (JSON.parse(process.env.BUNDLE_ANALYZER || 'false')) {
      console.info('Webpack bundle analyzer has initialize!')
      webpackConfig
        .plugin('webpack-bundle-analyzer')
        .use(new WebpackBundleAnalyzer())
    }

    webpackConfig
      .module.rule('ts')
      .exclude.add(/\.stories\.tsx?$/)
      .end()

    webpackConfig.module.noParse((content) => /storybook/.test(content))

    const stylRules = webpackConfig.module.rule('stylus')
    stylRules.uses.clear()
    stylRules.oneOfs.clear()
    stylRules
      .test(/\.styl(us)?$/)
      .use('vue-style-loader')
        .loader('vue-style-loader')
        .options({
          sourceMap: false
        })
        .end()
      .use('css-loader')
        .loader('css-loader')
        .options({
          sourceMap: false
        })
        .end()
      .use('stylus-loader')
        .loader('stylus-loader')
        .options({
          sourceMap: false
        })
        .end()
      .end()

    if (process.env.NODE_ENV === 'coverage') {
      execSync('sed -i \'s/path.resolve(path.dirname(origFile), file)/file/\' node_modules/istanbul-lib-source-maps/lib/pathutils.js')

      webpackConfig.module
        .rule('istanbul')
          .test(/\.(js|ts)$/)
          // .enforce('post')
          .use('istanbul-instrumenter-loader')
            .loader('istanbul-instrumenter-loader')
            .options({
              produceSourceMap: true,
              esModules: true
            })
            .end()
          .include
            .add(path.resolve(__dirname, '.', 'src'))
            .end()
          .exclude
            .add(path.resolve(__dirname, '.', 'node_modules'))
            .add(path.resolve(__dirname, '.', 'tests'))
            .add(/\.(spec|e2e|tests)\.ts$/)
            .end()
          .before('babel-loader')
          .end()
    }

    webpackConfig.resolve
      .alias
        .set('@test', path.resolve(__dirname, '.', 'tests/unit/src'))
        .set('@e2e', path.resolve(__dirname, '.', 'tests/e2e'))
        .set('stream', 'stream-browserify')
        .set('crypto', 'crypto-browserify')
        .set('process', 'process/browser')
        .end()
      .end()

    webpackConfig
      .plugin('monaco-webpack-plugin')
      .use(new MonacoWebpackPlugin())
    webpackConfig
      .plugin('process')
      .use(new webpack.ProvidePlugin({
        process: 'process/browser'
      }))
    webpackConfig
      .plugin('buffer')
      .use(new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      }))
    webpackConfig.plugin('module-federation-plugin')
    .use(new webpack.container.ModuleFederationPlugin(
      {
        name: 'app',
        filename: 'remoteEntry.js',
        remotes: {},
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom']
          },
          '@nipacloud/nc-design-system': {
            singleton: true,
            requiredVersion: deps['@nipacloud/nc-design-system']
          },
          '@nipacloud/nc-design-tokens': {
            singleton: true
          }
        }
      }
    ))
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    port: process.env.PORT ? process.env.PORT : 8081
  },
  lintOnSave: true,
  parallel: process.env.NODE_ENV === 'ci' ? 0 : true
}
