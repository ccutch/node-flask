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

let Server = class Server extends _koa2.default {

  constructor(_ref) {
    let port = _ref.port;
    var _ref$controllers = _ref.controllers;
    let controllers = _ref$controllers === undefined ? [] : _ref$controllers;

    super();
    this.port = port;

    if (typeof controllers === "string") {
      this.controllers = (0, _lodash.map)((0, _requireDir2.default)(controllers), c => c.default);
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
    var _Controller$prototype = Controller.prototype;
    var _Controller$prototype2 = _Controller$prototype.prefix;
    const prefix = _Controller$prototype2 === undefined ? "" : _Controller$prototype2;
    var _Controller$prototype3 = _Controller$prototype.routes;
    const routes = _Controller$prototype3 === undefined ? [] : _Controller$prototype3;

    const controllerMiddleware = Controller.prototype.middleware || [];
    const inst = new Controller();

    for (let route of routes) {
      const action = inst[route.action];
      const method = route.method;
      const path = route.path;
      const middleware = route.middleware;

      const actions = controllerMiddleware.concat(middleware);
      actions.push(action);
      this.use(_koaRoute2.default[method.toLowerCase()]((0, _path.join)(prefix, path), ...actions));
    }
  }
};
exports.default = Server;