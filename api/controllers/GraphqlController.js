'use strict'

const Controller = require('trails-controller')

/**
 * @module GraphqlController
 * @description Generated Trails.js Controller.
 */
module.exports = class GraphqlController extends Controller {

  /**
   * Handle a GraphQL query.
   */
  query (request, reply) {
    const gql = request.payload.query

    reply(this.app.services.GraphqlService.query(gql))
  }
}

