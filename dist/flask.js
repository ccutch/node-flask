"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = undefined;

var _decorators = require("./decorators");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _Server = require("./Server");

Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Server).default;
  }
});
exports.applyRoutes = applyRoutes;
exports.registerRoutes = registerRoutes;

var _co = require("co");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = module.exports;
function applyRoutes(Controller, prefix, properties) {
  if (typeof prefix === "object") {
    properties = prefix;
    prefix = null;
  }
  if (prefix && typeof prefix === "function") {
    prefix(Controller);
  }
  var _Controller$prototype = Controller.prototype;
  const prototype = _Controller$prototype === undefined ? {} : _Controller$prototype;

  for (let property in properties) {
    const decorator = properties[property];
    const description = decorator(prototype, key, Object.getOwnPropertyDescriptor(property, key));
    Object.defineProperty(prototype, property, description);
  }
  return Controller;
}

function registerRoutes(target, routes) {
  const virtual = {};
  for (const handler in routes) {
    const method = target[handler];
    routes[handler](virtual, (0, _co.wrap)(method));
  }
  return virtual.routes;
}