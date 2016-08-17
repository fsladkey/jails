const BaseController = require('../../controllers/base_controller')
const User = require('../models/user.js')


class UsersController extends BaseController {

  index() {
    User.all()
      .then(users => {
        this.render("index", { users })
      })
  }

  show() {
    User.find(this.params.id)
      .then(user => {
        this.render("show", { user })
      })
  }


}


module.exports = UsersController
