import Koa from 'koa'
import {join} from 'path'
import router from 'koa-route'
import {values, map} from 'lodash'
import requireDir from 'require-dir'

export default class Server extends Koa {

  constructor ({ port, controllers = [] }) {
    super()
    this.port = port

    if (typeof controllers === 'string') {
      this.controllers = map(requireDir(controllers), c => c.default ? c.default : c)
    } else if (controllers instanceof Array) {
      this.controllers = controllers
    } else {
      this.controllers = values(controllers)
    }
  }

  start () {
    return new Promise((resolve, reject) => {
      for (let controller of this.controllers) {
        this.generateRouter(controller)
      }

      this.listen(this.port, resolve)
    })
  }

  generateRouter (Controller) {
    const inst = new Controller()
    const controllerMiddleware = inst.middleware || []
    const {
      prefix = Controller.prototype.prefix || '',
      routes = Controller.prototype.prefix || []
    } = inst

    for (const route of routes) {
      let { action } = route
      if (typeof action === 'string') {
        action = inst[route.action]
      }
      const { method, path, middleware = [] } = route
      const actions = controllerMiddleware.concat(middleware)
      actions.push(action)
      actions.forEach(a => {
        this.use(router[method.toLowerCase()](join(prefix, path), a.bind(inst)))
      })
    }
  }
}
