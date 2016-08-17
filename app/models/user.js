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

User.hasMany("photos", {
  className: "Photo",
  tableName: "photos",
  foreignKey: "user_id",
  primaryKey: "id"
})

User.hasMany("comments", {
  className: "Comment",
  tableName: "comments",
  foreignKey: "user_id",
  primaryKey: "id"
})

module.exports = Models.addModel(User)
