const UsersController = '../.app/controllers/users_controller'

function formatUrl(url) {
  if (url.slice(-1) === "/") url = url.slice(0, -1)
  url = url.split("/")
  return url
}

function matchUrls(reqUrl, routeUrl) {
  if (reqUrl.length !== routeUrl.length) return false
  for (var i = 0; i < routeUrl.length; i++) {
    let routeLocation = routeUrl[i]
    let reqLocation = reqUrl[i]
    if (routeLocation[0] === ":") {
      continue
    } else if (routeLocation !== reqLocation) {
      return false
    }
  }
  return true
}

function extractParams(reqUrl, routeUrl) {
  const params = {}
  for (var i = 0; i < routeUrl.length; i++) {
    let routeLocation = routeUrl[i]
    let reqLocation = reqUrl[i]
    if (routeLocation[0] == ":") {
      params[routeLocation.slice(1)] = reqLocation
    }
  }
  return params
}

const Router = {

  routes: [],

  creators: {},

  draw(routes) {
    routes(this.creators)
  },

  run_route(route, req, res) {
    const params = extractParams(formatUrl(req.url), formatUrl(route.url))
    new route.controller(req, res, params)[route.action]()
  },

  run(req, res) {

    for (var i = 0; i < this.routes.length; i++) {
      let route = this.routes[i]
      if (this.match(req, route)) {
        this.run_route(route, req, res)
        return
      }
    }

    res.end("No routes match")
  },

  match(req, route) {
    const match = matchUrls(formatUrl(req.url), formatUrl(route.url))
    return match && (req.method == route.method.toUpperCase())
  }

}

;["get", "post", "patch", "delete"].forEach(method => {

  Router.creators[method] = (url, controller, action) => {
    Router.routes.push({
      url,
      controller,
      action,
      method
    })
  }

})



module.exports = Router
