const Models = require('../../orm/models')
const SQLObject = require('../../orm/models').SQLObject


class User extends Models.SQLObject {
  constructor(options) {
    super(options)
  }

  static tableName() {
    return "users"
  }
}

module.exports = Models.addModel(User)
