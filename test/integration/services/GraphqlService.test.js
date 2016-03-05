/* global describe, it */

const assert = require('assert')

describe('GraphqlService', () => {
  it('should exist', () => {
    assert(global.app.api.services['GraphqlService'])
  })

})
