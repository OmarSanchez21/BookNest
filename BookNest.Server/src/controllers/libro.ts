import { Request, Response } from "express";
import LibroModel from "../models/libro";
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";
import { logError, logInfo } from "../util/logs";

const LibroControllers = {
    getAllLibros: async(req: Request, res: Response) => {
        try {
           const libros = await LibroModel.find({});
           if(!libros){
            return res.status(404).json(createErrorResponse("No se encontraron libros", 404));
           };
           return res.status(200).json(createSuccessResponse("Libros encontrados", 200, libros));
        } catch (error) {
            logError(`Error al cargar libros: ${error}`);
            return res.status(500).json(createErrorResponse("Error interno del servidor", 500));
        }
    },
    getOneLibro: async(req: Request, res: Response) => {
        try {
            const libro = await LibroModel.findById(req.params.id);
            if(!libro) {
                return res.status(404).json(createErrorResponse("Book Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Book Found", 200, libro));
        } catch (error) {
            logError(`Error al cargar libro: ${error}`);
            return res.status(500).json(createErrorResponse("Error interno del servidor", 500));
        }
    },
    SaveLibro: async(req: Request, res: Response) => {
        try {
            const { titulo, autor, editorial, genero, idioma, isbn, publicacion, stock, precio, descripcion, imagen } = req.body;
            const existingISBN = await LibroModel.findOne({isbn});
            if(existingISBN) return res.status(404).json(createErrorResponse("Este ISBN ya existe", 404));
            
            const nuevoLibro = new LibroModel({
                titulo,
                autor,
                editorial,
                genero,
                idioma,
                isbn,
                publicacion,
                stock,
                precio,
                descripcion,
                imagen
            });
            await nuevoLibro.save();
            return res.status(201).json(createSuccessResponse("Libro guardado", 201, nuevoLibro));
        } catch (error) {
            logError(`Error al guardar libro: ${error}`);
            return res.status(500).json(createErrorResponse("Error interno del servidor", 500));
        }
    }
}