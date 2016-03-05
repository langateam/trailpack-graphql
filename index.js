'use strict'

const Trailpack = require('trailpack')
const Resolver = require('graphql-knex-resolver')
const _ = require('lodash')

module.exports = class GraphqlTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * TODO document method
   */
  initialize () {
    this.resolvers = _.map(this.app.models, model => {
      return new Resolver(model.store)
    })
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

