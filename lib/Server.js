import Koa from 'koa'
import {join} from 'path'
import router from 'koa-route'
import {values, map} from 'lodash'
import requireDir from 'require-dir'

export default class Server extends Koa {

  constructor ({ port, blueprints = [], controllers = undefined }) {
    super()
    this.port = port
    if (blueprints.length == 0 && controllers != undefined) {
      console.log('Warning from node-flask: naming convension changing, controllers => blueprints')
      blueprints = controllers
    }

    if (typeof blueprints === 'string') {
      this.blueprints= map(requireDir(blueprints), b => b.default ? b.default : b)
    } else if (blueprints instanceof Array) {
      this.blueprints = blueprints
    } else {
      this.blueprints = values(blueprints)
    }
  }

  start () {
    return new Promise((resolve, reject) => {
      for (let blueprint of this.blueprints) {
        this.generateRouter(blueprint)
      }

      this.listen(this.port, resolve)
    })
  }

  generateRouter (Blueprint) {
    const inst = new Blueprint()
    const blueprintMiddleware = inst.middleware || []
    let prefix = inst.prefix || Blueprint.prototype.prefix || ''
    let routes = inst.routes || Blueprint.prototype.routes || []

    for (const route of routes) {
      let { action } = route
      if (typeof action === 'string') {
        action = inst[route.action]
      }
      const { method, path, middleware = [] } = route
      const actions = blueprintMiddleware.concat(middleware)
      actions.push(action)
      actions.forEach(a => {
        this.use(router[method.toLowerCase()](join(prefix, path), a.bind(inst)))
      })
    }
  }
}
