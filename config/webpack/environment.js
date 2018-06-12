const { environment } = require('@rails/webpacker')
const vue = require('./loaders/vue')
const extractCSS = false

environment.loaders.append('vue', vue)
module.exports = environment
