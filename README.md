## Node Flask

Node implementation [flask](http://flask.pocoo.org/) like server framework. With introduction of function decorators and classes we are able to make a small and easy to implement routing system. Follow the examples below and in `spec` directory. This is build on koa2 as I feel this is a nice, small starting point over express or hapi because of their minimalist approach the their architecture, and positive moves towards es2016 standards.



#### Server example
Ideally this would be implemented with babel to use decorators like so.
```javascript
import { Server } from "node-flask"
import "./mainController"

const server = new Server({
  port: 5000,
})

server.start()
```

But there should also be support for vanila es5
```javascript
var Server = require("node-flask").Server
require("./mainController")

var server = new Server({
  port: 5000,
})

server.start()
```


#### Function example

Functions must be exported to module to be served, this allows for dynamic routing without having to comment out code.

**es2016**
```javascript
// mainController.js
import flask from "node-flask"

@flask.get("/")
export function home(ctx) {
  ctx.body = "Home page!"
}
```

**es5**
```javascript
// mainController.js
var flask = require("node-flask")

module.exports.home = fucntion home(ctx) {
  ctx.body = "Home Page"
}

flask.applyRoutes(module.exports, {
  home: flask.get("/"),
})
```



#### Class example
**es2016**
```javascript
// postController.js
import flask from "node-flask"
import validateUser from "./middleware" // middleware auth function following koa2 middleware.


@flask.prefix("/posts", validateUser)
export default class PostController {

  @flask.get("/:postId")
  async home(ctx) {
    ctx.body = await getPost(ctx.params.postId)
  }
}
```

**es5 (node5)**
```javascript
// postController.js
var flask = require("node-flask")
var validateUser = require("./middleware") // middleware auth function following koa2 middleware.
var co = require("co")


module.exports = class PostController {

  home(ctx) {
    return co(function* (ctx) {
      ctx.body = yield getPost(ctx.params.postId)
    })(ctx)
  }
}


flask.applyRoutes(PostController, flask.prefix("/posts", validateUser), {
  home: flask.get("/:postId"),
})
```


