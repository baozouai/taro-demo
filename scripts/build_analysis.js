const shelljs = require('shelljs')
process.env.isAnalysis = true

shelljs.exec('yarn build:weapp')
