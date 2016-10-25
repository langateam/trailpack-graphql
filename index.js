'use strict'

const Trailpack = require('trailpack')
const { graphql, buildSchema } = require('graphql')
const { validate } = require('graphql/validation')
const graphqlTag = strings => strings.join()

module.exports = class GraphqlTrailpack extends Trailpack {

  /**
   * Validate GraphQL Schema (attempt to compile schema; fail if error)
   */
  validate () {
  }

  configure () {
    const config = this.app.config.graphql
    const models = this.app.models

    this.gqlModels = Object.keys(models)
      .map(k => [ models[k], k ])
      .filter(([ model, modelName ]) => {
        const config = model.constructor.config()
        return config && config.type === 'graphql'
      })

    this.schemaString = this.gqlModels
      .map(([ model, modelName ]) => model.constructor.schema(graphqlTag) || '')
      .reduce((acc, gql) => acc + gql, '')

    this.schema = buildSchema(this.schemaString)

    if (config.enableIntrospectionQuery !== false) {
      config.enableIntrospectionQuery = true
    }
  }

  /**
   * Compile graphql schema and resolvers
   */
  initialize () {
    const config = this.app.config.graphql
    const models = this.app.models

    this.resolvers = this.gqlModels
      .map(([ model, modelName ]) => model.constructor.resolver(this.app) || { })
      .reduce((root, resolvers) => Object.assign(root, resolvers), { })
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

