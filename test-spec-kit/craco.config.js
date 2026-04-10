/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
//对webpack配置别名
const path = require('path');
const CracoLessPlugin = require('craco-less');
// eslint-disable-next-line no-undef

const { name } = require('./package');
module.exports = {
  // webpack 配置
  webpack: {
    configure: (config) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd'; // 打包模块格式  umd： 可以兼容 CommonJS、 AMD, ES Modules 等,兼容性更好，应为主应用需要 去加载子应用打包的资源，如果不兼容的话就没法加载了
      config.output.uniqueName = `webpackJsonp_${name}`;
      config.output.globalObject = 'window'; // 暴露给全局的对象window
      return config;
    },
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ],
  module: {
    rules: [{
      test: [/\.css/, /\.less/],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]-[hash:base64:5]'
          }
        }
      ]
    },]
  },

  devServer: {
    // TODO 修改代理配置 请重新启动项目
    // proxy: {
    //   // 设置本地开发代理
    //   '/v1/account': {
    //     target: `${origin}`,
    //     pathRewrite: { '^/v1/account': '' },
    //   },
    //   // 设置服务端本地电脑开发代理
    //   '/testApi': {
    //     target: `${origin}`,
    //     pathRewrite: { '^/testApi': '' },
    //   },
    // },
    // TODO 修改代理配置 请重新启动项目
    // 子项目 地址
    proxy: [
      // api 中包含 /v1/account 的所有 API 都将会代理到 target 代理目标服务器
      {
        context: ['/events'],
        changeOrigin :true,
        target:  'http://192.168.6.91:8080',
      },
      // api 中包含 /v1/account 的所有 API 都将会代理到 target 代理目标服务器
      {
        context: ['/v1/admin'],
        changeOrigin :true,
        target:  'http://api-csms-erp.costrip.cn',
      },
      {
        context: ['/v1/account', '/v1/message', '/v1/repair'],
        // target: 'http://api-csms-erp.costrip.cn',
        target: `http://192.168.6.91:8080`,
        // target: `http://192.168.6.118:8080`,
        changeOrigin: true,
      },
      {
        context: ['/a/b'],
        target:  'http://localhost:2345',
      },
    ],
  },
};
