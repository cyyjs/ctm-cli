import Util from './util'
const ora = require('ora')

export default async () => {
    const spinner = ora('Loading template list ...').start()
    let list = []
    try {
        list = await Util.getTList()
        list = list.map(l => l.name)
        spinner.succeed('Loading success!')
    } catch (e) {
        spinner.fail('Loading error, msg:', e)
    }
    if (list.length) {
        console.log('============template list============')
        list.forEach((n, i) => {
            console.log(i + 1 + '、' + n)
        })
        console.log('=====================================')
    }
}
