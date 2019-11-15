import { Router } from 'express';
import LivrosController from './app/controllers/LivrosController';

const routes = new Router();

routes.get('/livros', LivrosController.index);
routes.post('/livros', LivrosController.store);
routes.put('/livros', LivrosController.update);
routes.delete('/livros', LivrosController.destroy);

export default routes;