const { GraphQLClient } = require('graphql-request')
const get = require('lodash.get')
const DownloadGitRepo = require('download-git-repo')
const endpoint = 'https://api.github.com/graphql'
const ora = require('ora')

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'bearer 306642234cc9791df8b7619c2ec0a39cf4957300'
  }
})

/**
 * 获取模板列表
 */
const getList = async () => {
  const query = `
      { 
        organization (login:"cyytemplate"){
          repositories(first:100){
            totalCount
            nodes {
              name
              description
              resourcePath
              updatedAt
            }
          }
        }
      }
    `
  const data = await graphQLClient.request(query)
  return get(data, 'organization.repositories.nodes') || []
}

/**
 * 通过名称获取模板
 * @param {String} name 模板名称
 */
const getByName = async (name) => {
  const query = `
      { 
        organization (login:"cyytemplate"){
          repository(name:"${name}"){
            name
            description
            resourcePath
            updatedAt
          }
        }
      }
    `
  const data = await graphQLClient.request(query)
  return get(data, 'organization.repository')
}

const downloadGitRepo = (repo, savePath) => {
  return new Promise((resolve, reject) => {
    const spinner = ora('Initializing git repository...').start()
    DownloadGitRepo(repo, savePath, (err) => {
      if (err) {
        spinner.fail()
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
