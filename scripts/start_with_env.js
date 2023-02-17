/*
 * @Description: 根据不同的环境启动
 */
const shelljs = require('shelljs')
const getBaseUrl = require('./get_base_url')

const baseUrl = getBaseUrl()
process.env.GM_API_ENV = baseUrl

shelljs.exec('yarn dev:weapp')
