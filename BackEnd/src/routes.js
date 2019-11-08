import { Router } from 'express';
import DisciplinaController from './app/controllers/DisciplinasController';

const routes = new Router();

routes.get('/disciplinas', DisciplinaController.index);
routes.post('/disciplinas', DisciplinaController.store);
routes.put('/disciplinas/:codigo', DisciplinaController.update);
routes.delete('/disciplinas/:codigo', DisciplinaController.destroy);

export default routes;