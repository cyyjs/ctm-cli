// import Util from './util'
const program = require('commander')
const create = require('./create')
const { version } = require('../package')

program
  .version(version, '-v, --version')
  .usage('<command>')
  .command('create')
  .description('generate a new project from a template')
  .alias('c')
  .action(create)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
program.parse(process.argv)
