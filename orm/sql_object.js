const only = require('only')
const dbConnection = require('./db_connection')

class SQLObject {

  static all() {
    const query = `
      SELECT
        *
      FROM
        ${ this.tableName() }
    `
    return this._query(query)
  }

  static where(whereStatement) {
    const query = `
      SELECT
        *
      FROM
        ${this.tableName()}
      WHERE
        ${whereStatement}
    `
    return this._query(query)
  }

  static find(id) {
    const query = `
      SELECT
        *
      FROM
        ${this.tableName()}
      WHERE
        id = ${id}
      LIMIT
        1;
    `
    return this._query(query)
      .then(rows => rows[0] || null)
  }

  static first(id) {
    const query = `
      SELECT
        *
      FROM
        ${this.tableName()}
      LIMIT
        1;
    `
    return this._query(query)
      .then(rows => rows[0] || null)
  }

  static create(options) {
    return new this(options).save
  }

  static hasMany(name, options) {
    this.prototype[name] = function () {
      const query = `
        SELECT
          *
        FROM
          ${options.tableName}
        WHERE
          ${options.foreignKey} = ${this[options.primaryKey]()};
      `
      return this.constructor._query(query)
    }
  }

  static belongs_to(name, options) {
    this.prototype[name] = function () {
      const query = `
        SELECT
          *
        FROM
          ${options.tableName}
        WHERE
          ${options.primaryKey} = ${this[options.foreignKey]}
        LIMIT
          1;
      `
      return this.constructor._query(query)
        .then(rows => rows[0] || null)
    }
  }

  static _query(query) {
    return dbConnection.query(query)
      .catch(err => console.error(err))
      .then((result) => result.rows)
      .then((rows) => {
        return rows.map(row => {
          return new this(row)
        })
      })
  }

  static _load(cb) {
    this._getColumns()
    .catch(err => console.error(err))
    .then(() => {
      this._loaded = true
      cb()
    })
  }


  static _getColumns() {
    const query = `
      SELECT
        column_name from information_schema.columns
      WHERE
        table_name = '${ this.tableName() }';
    `
    return dbConnection.query(query)
      .catch(err => {
        console.error(err)
      }).then((result) => result.rows.map(entry => {
        return entry.column_name
      }))
      .then(cols => this.columns = cols)
      .then(cols => cols.forEach(col => {
        this.prototype[col] = function () {
          return this.attributes[col]
        }
      })
    )
  }

  constructor(options) {
    this.attributes = {}
    this._setColumns(options)
  }

  _setColumns(options) {
    const filtered = only(options, this.constructor.columns)
    this.constructor.columns.forEach((col) => {
      this.attributes[col] = filtered[col] || null
    })
  }

  save() {
    //
    return this
  }

  update(options) {
    //
    return this
  }

}

SQLObject._loaded = false

module.exports = SQLObject
