const Models = require('../orm/models')
const User = require('../app/models/user')
const glob = require( 'glob' )
const path = require( 'path' )
const repl = require("repl")

require('require-all')(__dirname + '/../app/models')

const newRepl = repl.start("node::jails> ")

Models._load(() => {
  Models.models.forEach(model => {
    newRepl.context[model.name] = model
  })
})
