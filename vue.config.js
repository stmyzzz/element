const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'router':'@/router',
        'style':'@/style',
        'config':'@/config',
        'plugins':'@/plugins',
        'images':'@/images'
      }
    }
  },
    pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        path.resolve(__dirname, 'src/style/*.scss')      //你的.scss文件所在目录
      ]
    }
  },
/*   devServer: {
    overlay: {
        // 让浏览器 overlay 同时显示警告和错误
        warnings: true,
        errors: true
    },
    host: 'localhost',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
        // 配置多个跨域
        '/api': {
            target: 'https://elm.cangdu.org/v1',//跨域接口的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
} */
}
