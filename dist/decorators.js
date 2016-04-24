"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del = exports.patch = exports.put = exports.post = exports.get = exports.all = undefined;
exports.register = register;
exports.prefix = prefix;

var _lodash = require("lodash");

function register(method, path) {
  for (var _len = arguments.length, middleware = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    middleware[_key - 2] = arguments[_key];
  }

  return (target, key) => {
    var _target$routes = target.routes;
    const routes = _target$routes === undefined ? [] : _target$routes;

    routes.push({
      path,
      method,
      middleware,
      action: key
    });
    target.routes = routes;
  };
}

const all = exports.all = (0, _lodash.partial)(register, "all");
const get = exports.get = (0, _lodash.partial)(register, "get");
const post = exports.post = (0, _lodash.partial)(register, "post");
const put = exports.put = (0, _lodash.partial)(register, "put");
const patch = exports.patch = (0, _lodash.partial)(register, "patch");
const del = exports.del = (0, _lodash.partial)(register, "delete");

function prefix(path) {
  for (var _len2 = arguments.length, middleware = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    middleware[_key2 - 1] = arguments[_key2];
  }

  return target => {
    target.prototype.prefix = path;
    target.prototype.controllerMiddleware = middleware;
  };
}