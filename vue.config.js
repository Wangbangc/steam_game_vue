const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://your-backend-api-url',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
