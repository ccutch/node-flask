
import {wrap} from 'co'
export * from './decorators'
export {default as Server} from './Server'
export default module.exports

export function applyRoutes (Blueprint, prefix, properties) {
  if (typeof prefix === 'object') {
    properties = prefix
    prefix = null
  }
  if (prefix && typeof prefix === 'function') {
    prefix(Blueprint)
  }
  const {prototype} = Blueprint
  for (const property in properties) {
    const decorator = properties[property]
    const description = decorator(prototype, property, Object.getOwnPropertyDescriptor(property, property))
    Object.defineProperty(prototype, property, description)
  }
  return Blueprint
}

export function registerRoutes (target, routes) {
  const virtual = {}
  for (const handler in routes) {
    const method = target[handler]
    routes[handler](virtual, wrap(method))
  }
  return virtual.routes
}
