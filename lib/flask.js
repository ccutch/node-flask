
export *                     from "./decorators"
export { default as Server } from "./Server"
export default module.exports

export function applyRoutes(Controller, prefix, properties) {
  if (typeof(prefix) === "object") {
    decorators = prefix
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
