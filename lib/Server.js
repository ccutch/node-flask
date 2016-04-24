
import Koa from "koa"
import { join } from "path"
import router from "koa-route"
import { values, map } from "lodash"
import requireDir from "require-dir"


export default class Server extends Koa {

  constructor({ port, controllers = [] }) {
    super()
    this.port = port

    if (typeof(controllers) === "string") {
      this.controllers = map(requireDir(controllers), c => c.default)
    } else if (controllers instanceof Array) {
      this.controllers = controllers
    } else {
      this.controllers = values(controllers)
    }
  }

  start() {
    for (let controller of this.controllers) {
      this.generateRouter(controller)
    }

    this.listen(this.port)
  }

  generateRouter(Controller) {
    const { prefix = "", routes = [] } = Controller.prototype
    const inst = new Controller()

    for (let route of routes) {
      const action = inst[route.action]
      const { method, path, middleware } = route
      middleware.push(action)
      this.use(router[method.toLowerCase()](join(prefix, path), ...middleware))
    }
  }
}