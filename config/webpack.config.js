// let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
let TypedocWebpackPlugin = require('typedoc-webpack-plugin')
let DefinePlugin = require('webpack/lib/DefinePlugin')
let UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
let path = require('path')

let helpers = require('./helpers')

module.exports = function () {
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
      rules: [{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.json',
        },
        exclude: [/\.(spec|e2e)\.ts$/, path.resolve(__dirname, '/examples')],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
        exclude: [path.resolve(__dirname, '/examples')],
      }],
    },
    resolve: {
      extensions: ['.ts', '.js', '.css'],
    },
    plugins: [
       new ExtractTextPlugin('styles.css'),
       new CheckerPlugin(),
       new TypedocWebpackPlugin({ }, path.resolve(__dirname, '../src')),
       new DefinePlugin({
         ENV: `'production'`,
       }),
       new UglifyJsPlugin({}),
    ],
  }
}
