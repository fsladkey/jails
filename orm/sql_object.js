const only = require('only')
const dbConnection = require('./db_connection')

class SQLObject {

  static getColumns() {
    const query = `
      SELECT
        column_name from information_schema.columns
      WHERE
        table_name = '${ this.tableName() }';
    `
    return dbConnection.query(query)
      .catch(err => {
        console.log(err);
      }).then((result) => result.rows)
      .then((result) => result.map(entry => {
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

  static all() {
    const query = `
      SELECT
        *
      FROM
        ${ this.tableName() }
    `
    return dbConnection.query(query)
      .catch(err => {
        console.log(err);
      }).then(result => result.rows)
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
    return dbConnection.query(query)
      .catch(err => {
        console.log(err);
      }).then(result => result.rows)
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
    return dbConnection.query(query)
      .catch(err => {
        console.log(err);
      }).then((result) => result.rows[0])
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
    return dbConnection.query(query)
      .catch(err => {
        console.log(err);
      }).then((result) => result.rows[0])
    }

  static _load(cb) {
    this.getColumns()
      .then(() => cb())
  }

  static new(options) {
    return new this(options)
  }

  static create(options) {
    return new this(options).save
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

  update() {
    //
    return this
  }

}

module.exports = SQLObject
