
import flask from '../..'

@flask.blueprint('/babel')
export default class BabelRoutes {

  @flask.get('/')
  home (ctx) {
    ctx.body = 'Babel compiled blueprint'
  }
}
