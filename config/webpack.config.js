// let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
let TypedocWebpackPlugin = require('typedoc-webpack-plugin')
let DefinePlugin = require('webpack/lib/DefinePlugin')
let UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
let path = require('path')

let helpers = require('./helpers')

module.exports = function() {
  // let isProd = options.env === 'production'

  return {
    entry: './src/index.ts',
    output: {
      path: helpers.root('dist'),
      filename: 'bundle.js',
      library: 'AngularGaugeChart',
      libraryTarget: 'umd2',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: './tsconfig.json',
                transpileOnly: true,
              },
            },
            'angular2-template-loader',
          ],
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')],
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    externals: {
      '@angular/core': '@angular/core',
      'gauge-chart': 'gauge-chart',
      tslib: 'tslib',
    },
    resolve: {
      extensions: ['.ts', '.js', '.css', '.scss'],
    },
    plugins: [
      // new CheckerPlugin(),
      new TypedocWebpackPlugin({}, path.resolve(__dirname, '../src')),
      new DefinePlugin({
        ENV: `'production'`,
      }),
      new UglifyJsPlugin({
        comments: false,
      }),
    ],
  }
}
