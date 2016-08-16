const config = require('../config/settings')
const pg = require('pg')

const client = new pg.Client()
const dbConfig = {
  // user: 'foo', //env var: PGUSER
  database: config.APP_NAME, //env var: PGDATABASE
  // password: 'secret', //env var: PGPASSWORD
  // port: 5432, //env var: PGPORT
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(dbConfig)

module.exports = pool
