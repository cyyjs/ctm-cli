const program = require('commander')
const chalk = require('chalk')
const init = require('./init')
const { version } = require('../package')

program
  .version(version, '-v, --version')
  .usage('<command>')
  .command('create [template] [projectName]')
  .description('generate a new project from template')
  .action(init)

program.on('command:*', function () {
  program.outputHelp()
  console.log(chalk.red('\nInvalid command: %s'), program.args.join(' '))
  process.exit(1)
})
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
