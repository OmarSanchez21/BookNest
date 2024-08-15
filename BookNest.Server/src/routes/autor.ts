import { Router } from "express";
import AutorControllers from "../controllers/autor";
import { validateAutor } from "../util/validate";
const AutorRouter = Router();

AutorRouter.get('/', AutorControllers.getAllAutors);
AutorRouter.get('/:id', AutorControllers.getOneAutor);
AutorRouter.post('/',validateAutor, AutorControllers.SaveAutor);
AutorRouter.put('/:id',validateAutor, AutorControllers.EditAutor);
AutorRouter.delete('/:id', AutorControllers.DeleteAutor);

export default AutorRouter;