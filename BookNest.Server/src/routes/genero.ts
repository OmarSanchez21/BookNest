import { Router } from "express";
import GeneroControllers from "../controllers/genero";
const GeneroRouter = Router();

GeneroRouter.get('/', GeneroControllers.getAllGenero);
GeneroRouter.get('/:id', GeneroControllers.getOneGenrero);
GeneroRouter.delete('/:id', GeneroControllers.DeleteGenero);

export default GeneroRouter;