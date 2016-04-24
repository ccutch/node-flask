
import flask from "../.."

export default class ActionController {

  @flask.get("/")
  home(ctx) {
    ctx.body = "Home page"
  }
}
