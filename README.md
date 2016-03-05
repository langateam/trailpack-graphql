# trailpack-graphql

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

## This is a draft proposal

This trailpack provides a [Relay-compatible](https://facebook.github.io/relay/docs/graphql-relay-specification.html)
GraphQL implementation for [Trails](http://trailsjs.io).

## Install

```sh
$ npm install --save trailpack-graphql
```

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-graphql')
  ]
}
```

## Usage

### Define Models

#### `User` model

```js
class User extends Model {
  static schema () {
    return {
      id: {
        type: 'GraphQLID'
      },
      username: {
        type: 'GraphQLString'
      },
      roles: {
        type: 'GraphQLList(Role)',
        resolve: {
          foreignKey: 'user'
        }
      }
    }
  }
}
```

#### `Role` model

```js
class Role extends Model {
  static schema () {
    return {
      id: {
        type: 'GraphQLID'
      },
      name: {
        type: 'GraphQLString'
      },
      user: {
        type: 'User'
      }
    }
  }
}
```

### Default Queries

Boilerplate CRUD queries are registered by default for each model.

```js
GraphqlService.query('readUser', { username: 'tjwebb' })
GraphqlService.mutation('createUser', { username: 'tjwebb' })
GraphqlService.mutation('updateUser', { username: 'tjwebb' }, { username: 'newuser' })
GraphqlService.mutation('deleteUser', { username: 'tjwebb' })
```

### Prepared Queries

```js
// api/queries/rolesByUsername.js
module.exports = `
  query rolesByUsername ($username: String!) {
    user (username: $username) {
      roles {
        id
        name
      }
    }
  }`
```

```js
GraphqlService.query('rolesByUsername', { username: 'tjwebb' })
  .then(result => {
    // ...
  })
```

## References

- Spec and Schema
  - https://facebook.github.io/graphql/
  - https://github.com/graphql/graphql-js
  - https://www.reindex.io/blog/building-a-graphql-server-with-node-js-and-sql/

- Querying
  - http://graphql.org/docs/queries/
  - https://facebook.github.io/relay/docs/graphql-connections.html#content
  - https://github.com/graphql/graphql-relay-js

- Mutations
  - https://facebook.github.io/relay/docs/graphql-mutations.html#content
  - https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4#.cntgoeljn

[npm-image]: https://img.shields.io/npm/v/trailpack-graphql.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-graphql
[ci-image]: https://img.shields.io/travis//trailpack-graphql/master.svg?style=flat-square
[ci-url]: https://travis-ci.org//trailpack-graphql
[daviddm-image]: http://img.shields.io/david//trailpack-graphql.svg?style=flat-square
[daviddm-url]: https://david-dm.org//trailpack-graphql
[codeclimate-image]: https://img.shields.io/codeclimate/github//trailpack-graphql.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github//trailpack-graphql

