import { Request, Response } from "express";
import { logError } from "../util/logs";
import { createSuccessResponse, createErrorResponse } from "../util/apiResponse";
import UsuarioModel from "../models/usuarios";
import { hashPassword, verifyPassword } from "../util/bcrypt";

const UsuarioControllers = {
    getAllUsuarios: async (req: Request, res: Response) =>{
        try {
            const usuarios = await UsuarioModel.find({}).select("-password");
            if(!usuarios){
                return res.status(404).json(createErrorResponse("Fallo en cargar", 404))
            }
            return res.json(createSuccessResponse("Usuarios cargados con éxito", 200, usuarios));
        } catch (error) {
            logError(`Fallo en cargar usuarios ${error}`);
            return res.status(500).json(createErrorResponse("Fallo en cargar", 500));
        }
    },
    getOneUsuario: async (req: Request, res: Response) => {
        try {
            const usuario = await UsuarioModel.findById(req.params.id);
            if(!usuario){
                return res.status(404).json(createErrorResponse("Usuario no encontrado", 404));
            }
            return res.json(createSuccessResponse("Usuario cargado con éxito", 200, usuario));
        } catch (error) {
            logError(`Fallo en cargar usuario ${error}`);
            return res.status(500).json(createErrorResponse("Fallo en cargar", 500));
        }
    },
    EditUsuario: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, edad, fCumpleaños, username, password, email, genero, paisOrigen } = req.body;
            const usuario = await UsuarioModel.findById(id);
            if(!usuario){
                return res.status(404).json(createErrorResponse("Usuario no encontrado", 404));
            }
            if(usuario.username !== username || usuario.email !== email){
                const existingUser = await UsuarioModel.findOne({ $or: [{username}, {email}], _id: { $ne: id } });
                if(existingUser){
                    return res.status(400).json(createErrorResponse("Usuario ya existe", 400));
                }
            }
            if(password && !(await verifyPassword(password, usuario.password))){
                const hashedPassword = await hashPassword(password);
                usuario.password = hashedPassword
            };
            usuario.nombre = nombre;
            usuario.apellido = apellido;
            usuario.edad = edad;
            usuario.fCumpleaños = fCumpleaños;
            usuario.username = username;
            usuario.email = email;
            usuario.genero = genero;
            usuario.paisOrigen = paisOrigen;
            await usuario.save();
            return res.status(200).json(createSuccessResponse("Usuario actualizado", 200, usuario));
        } catch (error) {
            logError(`Fallo en actualizar usuario ${error}`);
            return res.status(500).json(createErrorResponse("Fallo en actualizar", 500));
        }
    },
    DeleteUsuario: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const usuario = await UsuarioModel.findByIdAndDelete(id);
            if(!usuario){
                return res.status(404).json(createErrorResponse("Usuario no encontrado", 404));
            }
            return res.status(200).json(createSuccessResponse("Usuario eliminado con éxito", 200, usuario));
        } catch (error) {
            logError(`Fallo en eliminar usuario ${error}`);
            return res.status(500).json(createErrorResponse("Fallo en eliminar", 500));
        }
    }
}

export default UsuarioControllers;