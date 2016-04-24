## Node Flask

Node implementation [flask](http://flask.pocoo.org/) like server framework. With introduction of function decorators and classes we are able to make a small and easy to implement routing system. Follow the examples below and in `spec` directory. This is build on koa2 as I feel this is a nice, small starting point over express or hapi because of their minimalist approach the their architecture, and positive moves towards es2016 standards.



#### Server example
Ideally this would be implemented with babel to use decorators like so.
```javascript
import { Server } from "node-flask"
import MainController from "./mainController"

const server = new Server({
  port: 5000,
  controllers: [MainController],
})

server.start().then(() => console.log("Server online"))
```

But there should also be support for vanila es5
```javascript
var Server = require("node-flask").Server
var MainController = require("./mainController")

var server = new Server({
  port: 5000,
  controllers: [MainController],
})

server.start().then(() => console.log("Server online"))
```


#### Controller example
Due to the specifications of decorators for es2016 (as of right now) functions are required to be in a class. So for right now all functions must be contained in a controller class. Once module level function decorators can be used this library will be updated.

<br>
##### es2016
```javascript
import flask from "node-flask"
import validateUser from "./middleware" // middleware auth function following koa2 middleware.


@flask.prefix("/main", validateUser)
export default class MainController {

  @flask.get("/:index")
  async home(ctx) {
    ctx.body = await getPost(ctx.params.postId)
  }
}
```

##### es5 (node5)
```javascript
var flask = require("node-flask")
var validateUser = require("./middleware") // middleware auth function following koa2 middleware.
var co = require("co")


module.exports = class MainController {

  home(ctx) {
    return co(function* (ctx) {
      ctx.body = yield getPost(ctx.params.postId)
    })(ctx)
  }
}


flask.applyRoutes(MainController, flask.prefix("/main", validateUser), {
  home: flask.get("/:index"),
})
```


