import { Request, Response } from "express";
import IdiomaModel from '../models/idioma';
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";
import { logError } from "../util/logs";

const IdiomaControllers = {
    getAllIdiomas: async(req: Request, res: Response) => {
        try {
            const idiomas = await IdiomaModel.find({});
            if(!idiomas){
                return res.status(404).json(createErrorResponse("No idioms founds", 404))
            }
            return res.status(200).json(createSuccessResponse("Idioms founds", 200, idiomas));
        } catch (error) {
            logError(`Loading all idioms: ${error}`);
            return res.status(500).json(createErrorResponse("Internal server error"));
        }
    },
    getOneIdioma: async(req: Request, res: Response) => {
        try {
            const idioma = await IdiomaModel.findById(req.params.id);
            if(!idioma){
                return res.status(404).json(createErrorResponse("Idiom not found", 404));
            }
            return res.status(200).json(createSuccessResponse("Idiom found", 200, idioma));
        } catch (error) {
            logError(`Loading one idiom: ${error}`);
            return res.status(500).json(createErrorResponse("Internal server error"));
        }
    },
    DeleteIdioma: async(req: Request, res: Response) => {
        try {
            const idioma = await IdiomaModel.findByIdAndDelete(req.params.id);
            if(!idioma){
                return res.status(404).json(createErrorResponse("Idiom not found", 404));
            }
            return res.status(204).json(createSuccessResponse("Idiom deleted",200,idioma));
        } catch (error) {
            logError(`Deleting idiom: ${error}`);
            return res.status(500).json(createErrorResponse("Internal server error"));
        }
    }
}

export default IdiomaControllers;