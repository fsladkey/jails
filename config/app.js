const http = require('http')
const Models = require('../orm/models')
const User = require('../app/models/user')
const port = 3000

const router = (request, response) => {
  User.new({username: "fsladkey"})
  response.end(JSON.stringify(User.new({username: "fsladkey"}))
}

const server = http.createServer(router)

Models._load(() => {
  server.listen(port, (err) => {
    if (err) {
      return console.log('Error:', err)
    }

    console.log(`server is listening on ${port}`)
  })
})
