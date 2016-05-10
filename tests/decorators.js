
import assert          from "assert"
import * as decorators from "../lib/decorators"
import TestController  from "./TestController"

describe("decorators", () => {
  describe("Controller", () => {
    const controller = new TestController()
    const { prototype } = TestController

    it("should have prefix fields for class in prototype", () => {
      assert(prototype.hasOwnProperty("prefix"), "Controller has no prefix field")
      assert(typeof(controller.prefix) === "string", "Prefix property is not a string")
      assert(prototype.hasOwnProperty("middleware"), "Controller has no middleware field")
      assert(typeof(controller.middleware) === "object", "Middleware property is not an object")
      assert(prototype.middleware instanceof Array, "Middleware property is not an instance of Array")
    })

    it("should have an array of routes in its prototype", () => {
      assert(controller.routes, "Routes not defined")
      assert(controller.routes instanceof Array, "Routes not an Array")
      assert(controller.routes.length === 7)
    })

    it("should have a path, method, middleware, and action field for every route", () => {
      for (const route of controller.routes) {
        assert(typeof(route) === "object", "route is not type object")
        assert(route instanceof Object, "Route is not an instance of an object")
        assert(route.hasOwnProperty("path"), "Route does not have property path")
        assert(typeof(route.path) === "string", "Path property is not a string")
        assert(route.hasOwnProperty("method"), "Route does not have property method")
        assert(typeof(route.method) === "string", "Method property is not a string")
        assert(route.hasOwnProperty("middleware"), "Route does not have property middleware")
        assert(typeof(route.middleware) === "object", "Middleware property is not an object")
        assert(route.middleware instanceof Array, "Middleware property is not an Array")
        assert(route.hasOwnProperty("action"), "Route does not have property action")
        assert(typeof(route.action) === "string", "Action property is not a string")
      }
    })
  })
})
