
import flask from "../.."
import { wrap } from "co"

module.exports = class ActionController {

  constructor() {
    this.prefix = "/action"
    this.routes = flask.registerRoutes(this, {
      home: flask.get("/"),
    })
  }

  *home(ctx) {
    ctx.body = "Home page"
  }
}
