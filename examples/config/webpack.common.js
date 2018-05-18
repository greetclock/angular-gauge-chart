/**
 * @author: @AngularClass
 */

const webpack = require('webpack')
const helpers = require('./helpers')

/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const HtmlElementsPlugin = require('./html-elements-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ngcWebpack = require('ngc-webpack')

/**
 * Webpack Constants
 */
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag('aot')
const METADATA = {
  title: 'Angular Gauge Chart',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
}

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  isProd = options.env === 'production'
  return {
    /**
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /**
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      polyfills: './examples/polyfills.browser.ts',
      main: AOT
        ? './examples/main.browser.aot.ts'
        : './examples/main.browser.ts',
    },

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      /**
       * An array of directory names to be resolved to the current directory
       */
      modules: [helpers.root('src'), helpers.root('../node_modules')],
    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [
        /**
         * Typescript loader support for .ts
         *
         * Component Template/Style integration using `angular2-template-loader`
         * Angular 2 lazy loading (async routes) via `ng-router-loader`
         *
         * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
         * order of the loader matter.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         * See: https://github.com/shlomiassaf/ng-router-loader
         */
        {
          test: /\.ts$/,
          use: [
            {
              /**
               *  MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
               */
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot: AOT,
              },
            },
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: './tsconfig.json',
              },
            },
            {
              loader: 'angular2-template-loader',
            },
          ],
          exclude: [/\.(spec|e2e)\.ts$/],
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader',
        },

        /**
         * To string and css loader support for *.css files (from Angular components)
         * Returns file content as string
         *
         */
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
        },

        /**
         * To string and sass loader support for *.scss files (from Angular components)
         * Returns compiled css content as string
         *
         */
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('index.html')],
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader',
        },

        /* File loader for supporting fonts, for example, in CSS files.
        */
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader',
        },
      ],
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new CheckerPlugin(),
      /**
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'examples/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head',
      }),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({}),

      /**
       * Fix Angular 2
       */
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js'),
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js'),
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js'),
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js'),
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js'),
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('../tsconfig.json'),
        resourceOverride: helpers.root('config/resource-override.js'),
      }),

      /**
       * Plugin: InlineManifestWebpackPlugin
       * Inline Webpack's manifest.js in index.html
       *
       * https://github.com/szrenwei/inline-manifest-webpack-plugin
       */
      new InlineManifestWebpackPlugin(),
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },
  }
}
