import { Router } from "express";
import IdiomaControllers from "../controllers/idioma";

const idiomaRouter = Router();

idiomaRouter.get('/', IdiomaControllers.getAllIdiomas);
idiomaRouter.get('/:id', IdiomaControllers.getOneIdioma);
idiomaRouter.delete('/:id', IdiomaControllers.DeleteIdioma);
export default idiomaRouter;