const fs = require('fs-extra')
const path = require('path')
const cacheRepositoryPath = path.resolve(__dirname, '../cache/repositories')
const cacheJsonPath = path.resolve(__dirname, '../cache/cache.json')
const Util = require('./util')

fs.ensureDirSync(cacheRepositoryPath)
if (!fs.existsSync(cacheJsonPath)) {
  fs.outputJsonSync(cacheJsonPath, {})
}

const getCachePath = async (repository) => {
  const cacheJson = fs.readJsonSync(cacheJsonPath)
  const repositoryPath = path.resolve(cacheRepositoryPath, repository.name)
  // 判断是否已经缓存了最新的模板文件
  if (fs.existsSync(repositoryPath) && cacheJson[repository.name] && cacheJson[repository.name].updated === repository.updated) {
    return repositoryPath
  } else {
    await Util.downloadGitRepo(repository.full_name, repositoryPath)
    cacheJson[repository.name] = repository
    fs.outputJsonSync(cacheJsonPath, cacheJson)
    return repositoryPath
  }
}

module.exports = {
  getCachePath
}
