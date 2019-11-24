import express from 'express';
import routes from './routes';
import {Authenticate} from './app/controllers/Auth'
class App {
  constructor () {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.server.use(express.json());
    this.server.use(Authenticate);
  }

  routes () {
    this.server.use(routes);
  }
}

export default new App().server;