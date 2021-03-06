const Components = require('unplugin-vue-components/webpack')
const { NaiveUiResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
})
