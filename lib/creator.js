const path = require('path')
const ora = require('ora')
const fs = require('fs-extra')
const chalk = require('chalk')
const { getCachePath } = require('./cache')

module.exports = async ({ repository, targetDir, projectName, description }) => {
  const cachePath = await getCachePath(repository)
  const spinner = ora(`Creating project in ${chalk.yellow(targetDir)}\n`).start()
  fs.ensureDirSync(targetDir)
  const packagePath = path.resolve(cachePath, 'package.json')
  fs.copySync(cachePath, targetDir, { filter: (src) => {
    if (src === packagePath) {
      return false
    }
    return true
  } })

  const packageJson = fs.readJsonSync(packagePath)
  packageJson.name = projectName
  packageJson.description = description
  packageJson.version = '0.1.0'
  delete packageJson.repository
  delete packageJson.author
  fs.outputJsonSync(path.resolve(targetDir, 'package.json'), packageJson, { spaces: 2 })

  spinner.stopAndPersist({
    symbol: '✨',
    text: 'Create project succesed!'
  })
  console.log(chalk.green(`run command:\n cd ${projectName}\n yarn\n # or\n npm i`))
}
