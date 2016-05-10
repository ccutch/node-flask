
import { wrap }              from "co"
export *                     from "./decorators"
export { default as Server } from "./Server"
export default module.exports

export function applyRoutes(Controller, prefix, properties) {
  if (typeof(prefix) === "object") {
    properties = prefix
    prefix = null
  }
  if (prefix && typeof(prefix) === "function") {
    prefix(Controller)
  }
  const { prototype = {} } = Controller
  for (let property in properties) {
    const decorator = properties[property]
    const description = decorator(prototype, key, Object.getOwnPropertyDescriptor(property, key))
    Object.defineProperty(prototype, property, description)
  }
  return Controller
}


export function registerRoutes(target, routes) {
  const virtual = {}
  for (const handler in routes) {
    const method = target[handler]
    routes[handler](virtual, wrap(method))
  }
  return virtual.routes
}
