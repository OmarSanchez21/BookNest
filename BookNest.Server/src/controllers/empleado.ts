import {Request, Response} from "express"
import EmpleadoModel from "../models/empleado"
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";
import { logError } from "../util/logs";
import { hashPassword, verifyPassword } from "../util/bcrypt";
import { log } from "console";

const EmpleadoControllers = {
    getAllEmpleados: async(req:Request, res: Response) =>{
        try {
            const empleados = await EmpleadoModel.find({}).select("-password");
            if(!empleados){
                return res.status(404).json(createErrorResponse("No hay empleados registrados",404));
            }
            return res.status(200).json(createSuccessResponse("Empleado encontrados", 200, empleados));
        } catch (error) {
            logError(`Failed to load all Employees ${error}`);
            return res.status(500).json(createErrorResponse("Error en el servidor", 500));
        }
    },
    getOneEmpleado: async (req: Request, res: Response) => {
        try {
            const empleado = await EmpleadoModel.findById(req.params.id);
            if(!empleado){
                return res.status(404).json(createErrorResponse("Empleado no encontrado",404));
            }
            return res.status(200).json(createSuccessResponse("Empleado encontrado", 200, empleado));
        } catch (error) {
            logError(`Failed to load Employee ${error}`);
            return res.status(500).json(createErrorResponse("Error en el servidor", 500));
        }
    },
    SaveEmpleado: async (req: Request, res: Response) => {
        try {
            const { nombre, apellido, edad, fCumpleaños, username, password, email, genero, paisOrigen } = req.body;

            const existingUser = await EmpleadoModel.findOne({ $or: [{username}, {email}] });
            if(existingUser){
                return res.status(400).json(createErrorResponse("Usuario ya existe", 400));
            }
            const hashedPassword = await hashPassword(password);
    
            const newEmp = new EmpleadoModel({
                nombre,
                apellido,
                edad,
                fCumpleaños,
                username,
                password: hashedPassword,
                email,
                genero,
                paisOrigen
            });
            await newEmp.save();
    
            return res.status(201).json(createSuccessResponse("Empleado creado", 201, newEmp));
                
        } catch (error) {
            logError(`Failed to save Employee ${error}`);
            return res.status(500).json(createErrorResponse("Error en el servidor", 500));
        }
    },
    EditEmpleado: async (req: Request, res: Response) => {
        try {
            const { id } = req.params; 
            const { nombre, apellido, edad, fCumpleaños, username, password, email, genero, paisOrigen } = req.body;

            const empleado = await EmpleadoModel.findById(id);
            if(!empleado){
                return res.status(404).json(createErrorResponse("Empleado no encontrado",404));
            }
            if(empleado.username !== username || empleado.email !== email){
                const empleadoExist = await EmpleadoModel.findOne({ 
                    $or: [{username}, {email}],
                    _id: { $ne: id}
                });
                if(empleadoExist){
                    return res.status(400).json(createErrorResponse("Usuario ya existe", 400));
                }
            }
            if(password && !(await verifyPassword(password, empleado.password))){
                const hashedPassword = await hashPassword(password);
                empleado.password = hashedPassword
            }
            empleado.nombre = nombre;
            empleado.apellido = apellido;
            empleado.edad = edad;
            empleado.fCumpleaños = fCumpleaños;
            empleado.username = username;
            empleado.email = email;
            empleado.genero = genero;
            empleado.paisOrigen = paisOrigen;

            await empleado.save();

            return res.status(200).json(createSuccessResponse("Empleado actualizado", 200, empleado));
        } catch (error) {
            logError(`Failed to update Employee ${error}`);
            return res.status(500).json(createErrorResponse("Error en el servidor", 500));
        }
    },
    DeleteEmpleado: async(req: Request, res: Response) =>{
        try {
            const { id } = req.params;
            const employedeleted = await EmpleadoModel.findByIdAndDelete(id);
            if(!employedeleted){
                return res.status(404).json(createErrorResponse("Empleado no encontrado",404));
            }
            return res.status(204).json(createSuccessResponse("Empleado eliminado",204));
        } catch (error) {
            logError(`Failed to delete Employee ${error}`);
            return res.status(500).json(createErrorResponse("Error en el servidor", 500));
        }
    }
}