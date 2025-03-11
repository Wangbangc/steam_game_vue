const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {  // 匹配到 /api 开头的请求
        target: 'https://v2.diershoubing.com',  // 目标服务器
        changeOrigin: true,  // 改变 origin 属性，让服务器认为请求来自同一个域
        pathRewrite: {
          '^/api': ''  // 将 /api 替换为空字符串，这样请求路径就是目标服务器的路径
        },
      },
    },
  },
})