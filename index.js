'use strict'

const Trailpack = require('trailpack')
const { buildSchema } = require('graphql')
const graphqlTag = strings => strings.join()
const fs = require('fs')
const path = require('path')

module.exports = class GraphqlTrailpack extends Trailpack {

  /**
   * Validate GraphQL Schema (attempt to compile schema; fail if error)
   */
  validate () {
  }

  configure () {
    const config = this.app.config.graphql

    if (config.enableIntrospectionQuery !== false) {
      config.enableIntrospectionQuery = true
    }
    this.schemaFile = path.resolve(this.app.config.main.paths.temp, 'schema.graphql')
  }

  /**
   * Compile graphql schema and resolvers
   */
  initialize () {
    const models = this.app.models

    const gqlModels = Object.keys(models)
      .map(k => [ models[k], k ])
      .filter(([ model, modelName ]) => {
        const config = model.constructor.config()
        return config && config.type === 'graphql'
      })

    const schemaString = gqlModels
      .map(([ model, modelName ]) => model.constructor.schema(graphqlTag) || '')
      .join('\n')

    const rootQueryBody = gqlModels
      .map(([ model, modelName ]) => `${modelName.toLowerCase()}: ${modelName}Query`)
      .join('\n')

    this.schemaString = `
      ${schemaString}

      type Query {
        ${rootQueryBody}
      }

      schema {
        query: Query
      }
    `

    this.schema = buildSchema(this.schemaString)

    this.resolvers = gqlModels
      .map(([ model, modelName ]) => {
        return {
          [modelName.toLowerCase()]: model.constructor.resolver(this.app) || { }
        }
      })
      .reduce((obj, resolver) => Object.assign(obj, resolver), { })

    fs.writeFileSync(this.schemaFile, this.schemaString)
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

