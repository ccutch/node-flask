
import flask from "../.."

@flask.prefix("/action")
export default class ActionController {

  @flask.get("/")
  home(ctx) {
    ctx.body = "Home page"
  }
}
