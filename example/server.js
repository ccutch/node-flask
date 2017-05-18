
import {Server} from '..'
import {join} from 'path'
// (option for blueprint list or object) import ActionRoutes from './routes/ActionRoutes'

const {PORT = 5000} = process.env
const server = new Server({
  port: PORT,
  // (optional blueprint array) blueprints: [ActionRoutes],
  // (optional blueprint object) blueprints: { actions: ActionRoutes },
  // (string option) *used below
  blueprints: join(__dirname, 'routes')
})

server.start()
  .then(() => console.log(`Server online port: ${PORT}`))
  .catch(error => console.error(error.stack))
