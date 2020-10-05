import { MiddlewareInterface } from '../types';
import Auth from './Auth';
import Lang from './Lang'

class Middleware {
  auth = new Auth().handler
  lang = new Lang().handler
}

export default Middleware;