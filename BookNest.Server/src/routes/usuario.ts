import { Router } from 'express';
import { validatePerson } from '../util/validate';
import UsuarioControllers from '../controllers/usuario';

const UsuarioRouter = Router();

UsuarioRouter.get('/', UsuarioControllers.getAllUsuarios);
UsuarioRouter.get('/:id', UsuarioControllers.getOneUsuario);
UsuarioRouter.put('/:id', validatePerson, UsuarioControllers.EditUsuario);
UsuarioRouter.delete('/:id', UsuarioControllers.DeleteUsuario);

export default UsuarioRouter;
