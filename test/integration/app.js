'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
//const Model = require('trails-model')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'graphql-trailpack-test'
  },
  api: {
  },
  config: {
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('trailpack-router'),
        require('../../') // trailpack-graphql
      ]
    },
    database: {
      stores: {
      },
      models: {
        defaultStore: 'teststore',
        migrate: 'drop'
      }
    }
  }
}, smokesignals.FailsafeConfig)


