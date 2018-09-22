module.exports = {
  lintOnSave: false,

  // 取消生产环境的 sourcemaps
  productionSourceMap: false,

  // 资源交互验证
  // integrity: true,

  baseUrl: '',

  outputDir: '../../docs/gank', // github 针对性设置

  assetsDir: 'static',

  devServer: {
    host: process.env.npm_config_host || 'localhost',
    // 指定端口
    port: 7007,
    // 自动打开浏览器进行访问
    open: true,
    proxy: {
      '/api': {
        target: 'https://gank.io/api', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''
        }
      },
    }

  }
}
