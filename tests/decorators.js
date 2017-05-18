
import assert          from "assert"
import * as decorators from "../lib/decorators"
import TestRoutes      from "./TestRoutes"

describe("decorators", () => {
  describe("Blueprint", () => {
    const blueprint = new TestRoutes()
    const { prototype } = TestRoutes

    it("should have prefix fields for class in prototype", () => {
      assert(prototype.hasOwnProperty("prefix"), "Blueprint has no prefix field")
      assert(typeof(blueprint.prefix) === "string", "Prefix property is not a string")
      assert(prototype.hasOwnProperty("middleware"), "Blueprint has no middleware field")
      assert(typeof(blueprint.middleware) === "object", "Middleware property is not an object")
      assert(prototype.middleware instanceof Array, "Middleware property is not an instance of Array")
    })

    it("should have an array of routes in its prototype", () => {
      assert(blueprint.routes, "Routes not defined")
      assert(blueprint.routes instanceof Array, "Routes not an Array")
      assert(blueprint.routes.length === 7)
    })

    it("should have a path, method, middleware, and action field for every route", () => {
      for (const route of blueprint.routes) {
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
