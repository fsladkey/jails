class BaseController {
  constructor(req, res, params) {
    this.req = req
    this.res = res
    this.params = params
  }

  render(template, locals) {
    const content = require(`../app/views/users/${template}`)(locals)
    this.res.end(content)
  }
}

module.exports = BaseController
