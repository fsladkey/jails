const Models = require('../../orm/models')
const SQLObject = require('../../orm/models').SQLObject


class Article extends Models.SQLObject {
  constructor(options) {
    super(options)
  }

  static tableName() {
    return "articles"
  }
}

module.exports = Models.addModel(Article)
