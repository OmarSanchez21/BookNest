import { Router } from "express";
import { validateEditorial } from "../util/validate";
import EditorialControllers from "../controllers/editorial";

const EditorialRouter = Router();

EditorialRouter.get('/', EditorialControllers.getAllEditorial);

EditorialRouter.get('/:id', EditorialControllers.getOneEditorial);

EditorialRouter.post('/', validateEditorial, EditorialControllers.SaveEditorial);

EditorialRouter.put('/:id', validateEditorial, EditorialControllers.EdtiEditorial);

EditorialRouter.delete('/:id', EditorialControllers.DeleteEditorial);

export default EditorialRouter;