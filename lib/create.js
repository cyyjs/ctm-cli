const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const creator = require('./creator')

module.exports = async (repository, projectName) => {
  let targetDir = path.resolve(process.cwd(), projectName || '.')
  while (fs.existsSync(targetDir)) {
    if (projectName) {
      console.log(chalk.red(`Target directory ${chalk.cyan(targetDir)} already exists.`))
    }
    const result = await inquirer.prompt({
      name: 'projectName',
      type: 'input',
      message: 'new project name:',
      default: repository.name
    })
    projectName = result.projectName
    targetDir = path.resolve(process.cwd(), projectName)
  }

  const { description } = await inquirer.prompt({
    name: 'description',
    type: 'input',
    message: 'project description:',
    default: repository.description
  })

  creator({
    repository,
    targetDir,
    projectName,
    description
  })
}
