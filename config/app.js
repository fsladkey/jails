const http = require('http')
const Models = require('../orm/models')
const Router = require('../router')

const port = 3000

const handleRequest = (request, response) => {
  Router.run(request, response, {})
}

const server = http.createServer(handleRequest)

Models._load(() => {
  // define routes
  require('../config/routes')

  server.listen(port, (err) => {
    if (err) {
      return console.log('Error:', err)
    }

    console.log(`server is listening on ${port}`)
  })
})
