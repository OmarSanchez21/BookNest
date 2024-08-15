import { Request, Response } from "express";
import EditorialModel from "../models/editorial";
import { logError } from "../util/logs";
import { createErrorResponse, createSuccessResponse } from "../util/apiResponse";

const EditorialControllers = {
    getAllEditorial: async (req: Request, res: Response) => {
        try {
            const editoriales = await EditorialModel.find({});
            if(!editoriales){
                return res.status(404).json(createErrorResponse("Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Editoriales Founded", 200, editoriales));
        } catch (error) {
            logError(`Failed to get all editoriales: ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    getOneEditorial: async (req: Request, res: Response) => {
        try {
            const editorial = await EditorialModel.findById(req.params.id);
            if(!editorial){
                return res.status(404).json(createErrorResponse("Editorial Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Editorial Founded", 200, editorial));
        } catch (error) {
            logError(`Failed to get editorial: ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    SaveEditorial: async (req: Request, res: Response) => {
        try {
            const editorial = new EditorialModel(req.body);
            await editorial.save();
            return res.status(201).json(createSuccessResponse("Editorial saved", 201, editorial));
        } catch (error) {
            logError(`Failed to save editorial: ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    EdtiEditorial: async (req: Request, res: Response) => {
        try {
            const editorialId = req.params.id;
            const updates = req.body;
            const updatedEditorial = await EditorialModel.findByIdAndUpdate(editorialId, updates, { new: true, runValidators: true });
            if(!updatedEditorial){
                return res.status(404).json(createErrorResponse("Editorial Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Editorial updated", 200, updatedEditorial));
        } catch (error) {
            logError(`Failed to update editorial: ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));
        }
    },
    DeleteEditorial: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const deletedEditorial = await EditorialModel.findByIdAndDelete(id);
            if(!deletedEditorial){
                return res.status(404).json(createErrorResponse("Editorial Not Found", 404));
            }
            return res.status(200).json(createSuccessResponse("Editorial deleted", 200, deletedEditorial));
        } catch (error) {
            logError(`Failed to delete editorial: ${error}`);
            return res.status(500).json(createErrorResponse("Internal Server Error", 500));   
        }
    }
}