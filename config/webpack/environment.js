const { environment } = require('@rails/webpacker')
const vue = require('./loaders/vue')
const extractCSS = false

environment.config.merge({
  resolve: {
    alias: {
      '@': 'javascripts',
      vue: 'vue/dist/vue.esm.js'
    }
  }
})

environment.loaders.append('vue', vue)
module.exports = environment
