"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = module.exports;
function applyRoutes(Controller, prefix, properties) {
  if (typeof prefix === "object") {
    decorators = prefix;
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