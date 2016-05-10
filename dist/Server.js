"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _path = require("path");

var _koaRoute = require("koa-route");

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _lodash = require("lodash");

var _requireDir = require("require-dir");

var _requireDir2 = _interopRequireDefault(_requireDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

let Server = class Server extends _koa2.default {

  constructor(_ref) {
    let port = _ref.port;
    var _ref$controllers = _ref.controllers;
    let controllers = _ref$controllers === undefined ? [] : _ref$controllers;

    super();
    this.port = port;

    if (typeof controllers === "string") {
      this.controllers = (0, _lodash.map)((0, _requireDir2.default)(controllers), c => c.default ? c.default : c);
    } else if (controllers instanceof Array) {
      this.controllers = controllers;
    } else {
      this.controllers = (0, _lodash.values)(controllers);
    }
  }

  start() {
    return new Promise(res => {
      for (let controller of this.controllers) {
        this.generateRouter(controller);
      }

      this.listen(this.port, res);
    });
  }

  generateRouter(Controller) {
    const inst = new Controller();
    const controllerMiddleware = inst.middleware || [];
    var _inst$prefix = inst.prefix;
    const prefix = _inst$prefix === undefined ? Controller.prototype.prefix || "" : _inst$prefix;
    var _inst$routes = inst.routes;
    const routes = _inst$routes === undefined ? Controller.prototype.prefix || [] : _inst$routes;


    for (const route of routes) {
      let action = route.action;

      if (typeof action === "string") {
        action = inst[route.action];
      }
      const method = route.method;
      const path = route.path;
      var _route$middleware = route.middleware;
      const middleware = _route$middleware === undefined ? [] : _route$middleware;

      const actions = controllerMiddleware.concat(middleware);
      actions.push(action);
      this.use(_koaRoute2.default[method.toLowerCase()].apply(_koaRoute2.default, [(0, _path.join)(prefix, path)].concat(_toConsumableArray(actions))));
    }
  }
};
exports.default = Server;