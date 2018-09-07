const { environment } = require('@rails/webpacker')
const vue = require('./loaders/vue')
// const url = require('./loaders/url')
// const merge = require('webpack-merge')
const extractCSS = false

// Vue
environment.config.merge({
  resolve: {
    alias: {
      '@': 'javascripts',
      vue: 'vue/dist/vue.esm.js'
    }
  }
})
environment.loaders.append('vue', vue)

/*
// Url Loader
environment.loaders.prepend('url', url)
environment.loaders.get('file').test = /\.(tiff|ico|svg|eot|otf|ttf|woff|woff2)$/i

// Overriding Loader Options in webpack 3+ (for CSS Modules etc.)
const myCssLoaderOptions = {
  modules: true,
  sourceMap: true,
  localIdentName: '[name]__[local]___[hash:base64:5]'
}
const CSSLoader = environment.loaders.get('sass').use.find(el => el.loader === 'css-loader')
CSSLoader.options = merge(CSSLoader.options, myCssLoaderOptions)
*/
module.exports = environment
