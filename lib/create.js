const Util = require('./util')
const ora = require('ora')

module.exports = async () => {
  const spinner = ora('Loading template list ...').start()
  let list = []
  try {
    list = await Util.getList()
    list = list.map(l => l.name)
    spinner.succeed('Loading success!')
  } catch (e) {
    spinner.fail('Loading error, msg:', e.message)
  }
  console.log(list)
  // if (list.length) {
  //   console.log('============template list============')
  //   list.forEach((n, i) => {
  //     console.log(i + 1 + '、' + n)
  //   })
  //   console.log('=====================================')
  // }
}
