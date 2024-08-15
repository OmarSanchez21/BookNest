import { Request, Response} from "express"
import AutorModel from "../models/autor"
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";
import { logError } from "../util/logs";

const AutorControllers = {
    getAllAutors: async( req:Request, res: Response) =>{
        try {
            const autores = await AutorModel.find({});
            if(!autores){
                return res.status(404).json(createErrorResponse("Not Found",404));
            }
            return res.status(200).json(createSuccessResponse("Autores found", 200, autores));
        } catch (error) {
            logError(`Failed load all autores ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    getOneAutor: async (req: Request, res: Response) => {
        try {
            const autor = await AutorModel.findById(req.params.id);
            if(!autor){
                return res.status(404).json(createErrorResponse("Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Autor found", 200, autor));
        } catch (error) {
            logError(`Failed load autor ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    SaveAutor: async (req: Request, res: Response) => {	
        try {
            const autor = new AutorModel(req.body);
            await autor.save();
            return res.status(201).json(createSuccessResponse("Autor saved", 201, autor));
        } catch (error) {
            logError(`Failed save autor ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    EditAutor: async (req: Request, res: Response) => {
        try {
            const autorId = req.params.id;
            const updates = req.body;

            const updatedAutor = await AutorModel.findByIdAndUpdate(autorId, updates, { new: true, runValidators: true });
            if(!updatedAutor){
                return res.status(404).json(createErrorResponse("Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Autor updated", 200, updatedAutor));
        } catch (error) {
            logError(`Failed update autor ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    DeleteAutor: async (req: Request, res: Response) => {
        try {
            const autorId = req.params.id;
            const deletedAutor = await AutorModel.findByIdAndDelete(autorId);
            if(!deletedAutor){
                return res.status(404).json(createErrorResponse("Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Autor deleted", 200, deletedAutor));
        } catch (error) {
            logError(`Failed delete autor ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    }
}

export default AutorControllers;