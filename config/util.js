const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const getLocalConfig = () => {
  let config = {}
  try {
    config = require(`${appDirectory}/config/local`)
  }
  catch (err) {
    // nothing
  }

  return config
}

const getConfig = () => {
  let config
  try {
    config = require(`${appDirectory}/config/deploy`)
  }
  catch (err) {
    throw new Error('没有找到 /config/deploy.js 文件')
  }

  return config
}

module.exports = {
  getLocalConfig,
  getConfig,
}
