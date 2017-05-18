
import {partial} from 'lodash'

export function register (method, path, ...middleware) {
  return (target, key) => {
    const { routes = [] } = target
    routes.push({
      path,
      method,
      middleware,
      action: key
    })
    target.routes = routes
  }
}

export const all = partial(register, 'all')
export const get = partial(register, 'get')
export const post = partial(register, 'post')
export const put = partial(register, 'put')
export const patch = partial(register, 'patch')
export const del = partial(register, 'delete')

export function blueprint (path, ...middleware) {
  return target => {
    target.prototype.prefix = path
    target.prototype.middleware = middleware
  }
}
