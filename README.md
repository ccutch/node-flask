## Node Flask

Node implementation [flask](http://flask.pocoo.org/) like server framework. With the introduction of function decorators and classes we are able to make a small and easy to implement routing system. This is build on koa2 for their support of es2016 functionality and because of its small foot print when compared to express. I am using koa@2 because all routes are handled though controller classes and passing a context to a function as a parameter and allowing `this` to still refer to the controller helps class logic. Even though we are using koa@2 you do not have to run you code though a compiler such as babel (though this step makes function decorators posible).



### API

Server() => Server
---
Main server to run controller classes. Extends `Koa` Class from koa@2.

| Option | type   | description |
| ------ | ------ | ----------- |
| port   | `Number` | Http port to listen on |
| controllers | `Object|Array|String` | (optional) Controllers or path to controller classes |

**Example**
```javascript
const { Server } = require("node-flask")
const MainController = require("./MainController")
const server = new Server({
  port: 5000,
  controllers: [MainController],
})
server.start()
```


Server#start() => Promise
---
Run server from configuration
**Example**
```javascript
const server = // ...from example above
server.start()
.then(() => console.log("Server online on port 5000"))
.catch(err => console.error(`An error occurred (such as port in use)`, err.stack))
```

#### `#prefix(prefix: string, ...middleware: fn) => decorator`
Class decorator for controller class level configuration.

#### `#all(path: string, ...middleware: fn) => decorator`
Handle all http requests on path.

#### `#get(path: string, ...middleware: fn) => decorator`
Handle all GET http requests on path.

#### `#post(path: string, ...middleware: fn) => decorator`
Handle all POST http requests on path.

#### `#put(path: string, ...middleware: fn) => decorator`
Handle all PUT http requests on path.

#### `#patch(path: string, ...middleware: fn) => decorator`
Handle all PATCH http requests on path.

#### `#del(path: string, ...middleware: fn) => decorator`
Handle all DELETE http requests on path.


**Example (babel w/ transform-legacy-decorators)**
```javascript
const flask = require("node-flask")

@flask.prefix("/main", middlewarefunction)
class MainController {

  @flask.get("/home")
  async home(ctx) {
    const data = await getData()
    ctx.body = data
  }
}
```
**Example (node6)**
```javascript
const flask = require("node-flask")

class MainController {
  constructor() {
    this.prefix = "/main"
    this.routes = flask.registerRoutes(this, {
      home: flask.get("/home"),
    })
  }

  *home(ctx) {
    const data = yield getData()
    ctx.body = data
  }
}
```


### TODO:
 - Write more tests for Server
 - Add helpful middleware and more decorators upon need

### Contributions:
Feedback, use cases and code is all appreciated. Simply make an issue or pull request on the [github repo](https://github.com/ccutch/node-flask).
