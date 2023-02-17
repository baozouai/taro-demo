const getBranchUrl = require('./get_branch_url')

function getBaseUrl() {
  // 获取环境变量
  const env = process.argv[2]
  const PLACEHOLDER = 'GM_ENV'
  const BASE_URL = `https://${PLACEHOLDER}.guanmai.cn`
  let replaceURL = 'x'

  switch (env) {
    case 'lite':
      replaceURL = 'q'
      break
    default:
      replaceURL = 'env-'
      if (env === 'dev') {
        replaceURL += 'develop'
      } else {
        replaceURL += getBranchUrl()
      }
      replaceURL += '.x.k8s'
      break
  }
  return BASE_URL.replace(PLACEHOLDER, replaceURL)
}

module.exports = getBaseUrl
