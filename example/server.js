
import { Server } from ".."
import { join } from "path"
// import ActionController from "./actions"

const { PORT = 5000 } = process.env
const server = new Server({
  port: PORT,
  controllers: join(__dirname, "controllers"),
})
server.start()
