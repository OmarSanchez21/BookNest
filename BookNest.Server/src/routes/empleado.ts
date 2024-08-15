import { Router } from "express";
import { validatePerson } from "../util/validate";
import EmpleadoControllers from "../controllers/empleado";

const EmpleadoRouter = Router();

EmpleadoRouter.get('/', EmpleadoControllers.getAllEmpleados);
EmpleadoRouter.get('/:id', EmpleadoControllers.getOneEmpleado);
EmpleadoRouter.post('/', validatePerson, EmpleadoControllers.SaveEmpleado);
EmpleadoRouter.put('/:id', validatePerson, EmpleadoControllers.EditEmpleado);
EmpleadoRouter.delete('/:id', EmpleadoControllers.DeleteEmpleado);

export default EmpleadoRouter;