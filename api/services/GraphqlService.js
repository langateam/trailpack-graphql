'use strict'

const Service = require('trails-service')
const { graphql, formatError } = require('graphql')

/**
 * @module GraphqlService
 * @description TODO document Service
 */
module.exports = class GraphqlService extends Service {

  query (gql) {
    const schema = this.app.packs.graphql.schema
    const resolvers = this.app.packs.graphql.resolvers

    return graphql(schema, gql, resolvers)
      .then(result => {
        if (result.errors && result.errors.length > 0) {
          this.log.warn(formatError(result.errors[0]))
        }

        return result
      })
      .catch(e => {
        this.log.error(e)
        throw e
      })
  }

}

