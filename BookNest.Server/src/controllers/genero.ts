import { Request, Response } from "express";
import GeneroModel from "../models/genero";
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";
import { logError } from "../util/logs";

const GeneroControllers = {
    getAllGenero: async (req: Request, res: Response) => {
        try {
            const generos = await GeneroModel.find({});
            if(!generos){
                return res.status(404).json(createErrorResponse("Not Found genres", 404))
            }
            return res.status(200).json(createSuccessResponse("Generos found", 200, generos))
        } catch (error) {
            logError(`Failed load all genres ${error}`)
            return res.status(500).json(createErrorResponse("Internal Server Error", 500))
        }
    },
    getOneGenrero: async (req: Request, res: Response) => {
        try {
            const genero = await GeneroModel.findById(req.params.id);
            if(!genero){
                return res.status(404).json(createErrorResponse("Not Found genre", 404))
            }
            return res.status(200).json(createSuccessResponse("Genre found", 200, genero))
        } catch (error) {
            logError(`Failed load genre ${error}`)
            return res.status(500).json(createErrorResponse("Internal Server Error", 500))
        }
    },
    DeleteGenero: async (req: Request, res: Response) => {
        try {
            const genero = await GeneroModel.findByIdAndDelete(req.params.id);
            if(!genero){
                return res.status(404).json(createErrorResponse("Not Found genre", 404))
            }
            return res.status(200).json(createSuccessResponse("Genre deleted", 200, genero))
        } catch (error) {
            logError(`Failed delete genre ${error}`)
            return res.status(500).json(createErrorResponse("Internal Server Error", 500))
        }
    }
}

export default GeneroControllers;