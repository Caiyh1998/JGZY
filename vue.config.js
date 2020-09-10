module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // devServer: {
  //   open: true, //是否自动弹出浏览器页面
  //   host: "localhost",
  //   port: '8000',
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'http://127.0.0.1:7001/api', //API服务器的地址
  //   //     changeOrigin: true,
  //   //     pathRewrite: {
  //   //       '^/api': ''
  //   //     }
  //   //   }
  //   // },
  // }
}
