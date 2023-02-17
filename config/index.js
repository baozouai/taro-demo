const path = require('path')
const packageJSON = require('../package.json')
const { getConfig, getLocalConfig } = require('./util')

const isDev = process.env.NODE_ENV === 'development'
const gmConfig = isDev ? getLocalConfig() : getConfig()

function resolve(relativePath) {
  return path.resolve(__dirname, '../', relativePath)
}
const config = {
  projectName: 'gm_mp_boss_assistant',
  date: '2023-2-16',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
    __BASE_PATH__: JSON.stringify(process.env.GM_API_ENV || gmConfig.basePath),
    __ENV__: JSON.stringify(process.env.NODE_ENV),
    __CLIENT_NAME__: '"gm_mp_x_lv_admin"',
    __NAME__: '"x_lv_admin"',
    __VERSION__: JSON.stringify(packageJSON.version),
    __IS_DEV__: isDev,
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    'react': resolve('node_modules/react'),
    '@tarojs/taro': resolve('node_modules/@tarojs/taro'),
    '@': resolve('src'),
    'moment': resolve('node_modules/dayjs'),
    '@gm-common/x-request': resolve(
      'node_modules/@gm-mobile/mp-request',
    ),
  },
  mini: {
    compile: {
      include: [
        (modulePath) => {
          const arr = [
            '@gm-mobile',
            '@gm-common',
            'gm_api',
            'split-on-first',
            'strict-uri-encode',
          ]
          return arr.find(v => modulePath.includes(v))
        },
      ],
    },
    webpackChain(chain, webpack) {
      if (!isDev) {
        // chain.module
        //   .rule('simplify-gm-api-data')
        //   .test(/data\.ts$/)
        //   .include.add(path.resolve(__dirname, '..', 'node_modules/gm_api/src'))
        //   .end()
        //   .use('simplify-gm-api-data-loader')
        //   .loader(path.resolve(__dirname, './simplify-gm-api-data-loader'))
      }
      // 体积分析
      if (process.env.isAnalysis) {
        chain
          .plugin('analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      }
      if (!isDev) {
        // chain.plugin('uglifyjs-webpack-plugin').use(UglifyJsPlugin, [
        //   {
        //     uglifyOptions: {
        //       compress: {
        //         // drop_console: true, // console
        //         // pure_funcs: ['console.log', 'console.warn'], // 移除console
        //       },
        //     },
        //   },
        // ])
      }
      chain.resolve.plugin('MultiPlatformPlugin').tap((args) => {
        return [
          ...args,
          {
            include: ['@gm-mobile', 'gm_api'],
          },
        ]
      })

      // todo 引入gm-18n
      chain.externals({
        'gm-i18n': `(function () {
          var locales = {}
          var regex = /\\$\{(.+?)}/g
          function t(t, data) {
            var world = locales[t]
            if (!world) return t
            else {
              return world.replace(regex, (match, $0) => {
                return data[$0]
              })
              return world.replace(regex, function(match, $0){
                return data[$0]
              })
            }
          }

          return {
            t,
            i18next: {
              t,
            },
            setLocal: function(locale){
              locales = locale
            },
            isEnglish: function(){ return false }
          }
        })()`,
      })

      chain.resolve.symlinks(false)
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      'postcss-preset-env': {
        enable: true,
        config: {
          stage: 3,
        },
      },
    },
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development')
    return merge({}, config, require('./dev'))

  return merge({}, config, require('./prod'))
}
