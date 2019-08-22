const Util = require('./util')
const ora = require('ora')
const create = require('./create')
const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = async (template, projectName) => {
  let repository
  if (template) {
    const spinner = ora('Check template ...').start()
    repository = await Util.getByName(template)
    if (repository) {
      spinner.succeed('Checked template!')
    } else {
      spinner.fail(chalk.red(`${template} is not fond!`))
    }
  } else {
    const spinner = ora('Loading template list ...').start()
    try {
      const list = await Util.getList()
      const choices = list.map(item => {
        return {
          name: item.name + ' (' + item.description + ')',
          value: item
        }
      })
      spinner.succeed('Loading success!')
      const result = await inquirer.prompt({
        name: 'template',
        type: 'list',
        message: 'select template',
        choices
      })
      repository = result.template
    } catch (e) {
      spinner.fail(chalk.red('Loading error, msg:', e.message || 'template load error!'))
    }
  }
  create(repository, projectName)
}
