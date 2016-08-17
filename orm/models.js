const query = require('./db_connection').query
const SQLObject = require('./sql_object')

const Models = {
  SQLObject,
  query,

  models: [],

  addModel(model) {
    this.models.push(Object.assign(model, SQLObject))
    return model
  },

  _load(cb) {
    let loaded = 0
    this.models.forEach(model => {
      model._load(() => {
        loaded += 1
        if (loaded === this.models.length) {
          cb()
          return;
        }
      })

    })
    cb();
  }

}

module.exports = Models
