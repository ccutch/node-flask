
import flask from '../..'

@flask.prefix('/babel')
export default class BabelController {

  @flask.get('/')
  home () {
    this.body = 'Babel compiled controller'
  }
}
