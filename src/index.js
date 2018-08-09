#!/usr/bin/env node
import Util from './util'
import program from 'commander'
import Init from './init'
import getList from './list'
const { version } = require('../package')
program
    .version(version, '-v, --version')
    .usage('<command>')
    .command('list')
    .description('list available official templates')
    .alias('l')
    .action(getList)

program
    .command('init')
    .description('generate a new project from a template')
    .alias('i')
    .action(Init)
if (!process.argv.slice(2).length) {
    program.outputHelp()
}
program.parse(process.argv)
