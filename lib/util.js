const { GraphQLClient } = require('graphql-request')
const get = require('lodash.get')
const endpoint = 'https://api.github.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'bearer aac4e4e946b05bdbed7119dad0ebe83c7fe9ac74'
  }
})

const getList = async () => {
  const query = `
      { 
        organization (login:"cyytemplate"){
          repositories(first:100){
            totalCount
            nodes {
              name
              description
              sshUrl
              updatedAt
            }
          }
        }
      }
    `
  const data = await graphQLClient.request(query)
  return get(data, 'organization.repositories.nodes') || []
}

module.exports = {
  getList
}
