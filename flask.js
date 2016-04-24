
// Hopefully when we have a stable build we will no longer need this. I am using it now because it is 1am...
require("babel-register")

module.exports = require("./lib/decorators")
module.exports.default = module.exports
module.exports.Server = require("./lib/Server").default
