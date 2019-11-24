import { Router } from 'express';
import LivrosController from './app/controllers/LivrosController';
import LoginController from './app/controllers/LoginController';
import AuthController from './app/controllers/AuthController'
const routes = new Router();

routes.get('/livros', LivrosController.index);
//EXEMPLO COM AUTENTICAÇÃO//routes.get('/livros', [AuthController.authorize ,LivrosController.index]);
routes.post('/livros', LivrosController.store);
routes.put('/livros', LivrosController.update);
routes.delete('/livros', LivrosController.destroy);

routes.get('/login', LoginController.index);
routes.post('/cadastro', LoginController.store);
routes.put('/login', LoginController.update);

export default routes;