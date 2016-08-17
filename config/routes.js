const Router = require('../router')
const UsersController = require('../app/controllers/users_controller')

Router.draw(function ({ get }) {

  get("/", UsersController, "index")
  get("/users", UsersController, "index")
  get("/users/:id", UsersController, "show")

})
