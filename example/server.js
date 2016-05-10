
import { Server } from ".."
import { join } from "path"
// (option for controller list or object) import ActionController from "./actions"

const { PORT = 5000 } = process.env
const server = new Server({
  port: PORT,
  // (optional controller array) controllers: [ActionController],
  // (optional controller object) controllers: { actions: ActionController },
  // (string option) *used below
  controllers: join(__dirname, "controllers"),
})

server.start()
  .then(() => console.log(`Server online port: 5000`))
  .catch(error => console.error(error.stack))
