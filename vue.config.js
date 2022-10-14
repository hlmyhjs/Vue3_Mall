const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'http://localhost:4001',
        changeOrigin: true // 是否跨域
      }
    }
  },

  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      // 别名配置
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        configs: '@/configs',
        views: '@/views',
        plugins: '@/plugins'
      }
    }
  },
  //全局 sass的配置
  chainWebpack(config) {
    globalSass(config)
  }
})

const globalSass = (config) => {
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach((item) => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: './src/assets/css/index.scss' //相对路径
      })
      .end()
  })
}
