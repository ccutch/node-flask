
const flask = require('../..')

module.exports = class ActionController {

  constructor () {
    this.prefix = '/action'
    this.routes = flask.registerRoutes(this, {
      home: flask.get('/')
    })
  }

  * home (ctx) {
    ctx.body = 'Home page'
  }
}
