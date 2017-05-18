
import flask from "../lib/flask"

export function middleware(ctx, next) {
  return next()
}


@flask.blueprint("/prefix")
export default class TestRoutes {

  @flask.all("/all")
  allRoute(ctx) {
    ctx.body = "ALL METHOD ROUTE "
  }

  @flask.get("/get")
  getRoute(ctx) {
    ctx.body = "GET ROUTE "
  }

  @flask.get("/get-with-middleware", middleware)
  getWithMiddlewareRoute(ctx) {
    ctx.body = "GET ROUTE WITH MIDDLEWARE"
  }

  @flask.post("/post")
  postRoute(ctx) {
    ctx.body = "POST ROUTE"
  }

  @flask.put("/put")
  putRoute(ctx) {
    ctx.body = "PUT ROUTE"
  }

  @flask.patch("/patch")
  patchRoute(ctx) {
    ctx.body = "PATCH ROUTE"
  }

  @flask.del("/delete")
  deleteRoute(ctx) {
    ctx.body = "DELETE ROUTE"
  }
}
