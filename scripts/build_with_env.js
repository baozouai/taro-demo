/*
 * @Description: 根据不同的环境打包
 */
const shelljs = require('shelljs')
const getBaseUrl = require('./get_base_url')

const baseUrl = getBaseUrl()
process.env.BASE_PATH = baseUrl

shelljs.exec('yarn build:weapp')
