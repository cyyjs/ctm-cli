const rp = require('request-promise')
const DownloadGitRepo = require('download-git-repo')
const ora = require('ora')
const { API_URL } = require('../config')

/**
 * 获取模板列表
 */
const getList = async () => {
  const options = {
    uri: API_URL,
    headers: {
      'User-Agent': 'ctm-cli',
      Accept: 'application/vnd.github.inertia-preview+json'
    },
    json: true
  }
  const list = await rp(options) || []
  return list.map(item => {
    return {
      name: item.name,
      description: item.description,
      full_name: item.full_name,
      updated: item.updated_at
    }
  })
}

/**
 * 通过名称获取模板
 * @param {String} name 模板名称
 */
const getByName = async (name) => {
  const list = await getList()
  const repo = list.find(item => item.name === name)
  if (repo.name) {
    return repo
  }
  return false
}

const downloadGitRepo = (repo, savePath) => {
  return new Promise((resolve, reject) => {
    const spinner = ora('Initializing git repository...').start()
    DownloadGitRepo(repo, savePath, (err) => {
      if (err) {
        spinner.fail(err.message)
        reject(err)
        process.exit(1)
      } else {
        spinner.stopAndPersist({
          symbol: '🗃',
          text: 'Initializing git repository succeed'
        })
        resolve()
      }
    })
  })
}

module.exports = {
  getList,
  getByName,
  downloadGitRepo
}
