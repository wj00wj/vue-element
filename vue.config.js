// const path = require('path')
// const port = 7070;
// const title = 'vue-admin-webapp'

//分支一：center

// function resolve(dir){
//     //拼接当前文件所在目录和dir
//     return path.join(__dirname,dir)
// }
// module.exports = {
//     devServer:{
//         port:port
//     },
//     configureWebpack:{
//         name:title
//     },
//     chainWebpack(config){
//         //1、修改svg规则，排除icons目录下的svg文件
//         config.module
//             .rule('svg')
//             .exclude.add(resolve('src/icons'))
//         //2、新增icons规则，仅打包icons目录下的svg文件
//         config.module 
//             .rule('icons')
//             .test(/\.svg$/)
//             .include
//                 .add(resolve('src/icons'))
//                 .end()
//             .use('svg-sprite-loader')
//             .loader('svg-sprite-loader')
//                 .options({symbolId: 'icon-[name]'})
//                 .end()


//     }
// }

const path = require('path')
const resolve = function(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-admin-webapp/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: true, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
    config.optimization.runtimeChunk('single')
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
