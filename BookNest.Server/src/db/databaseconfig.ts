import mongoose from "mongoose";
import GeneroModel from "../models/genero";
import { MONGO_DB } from "../util/config";
import { logError, logSuccess } from "../util/logs";
import IdiomaModel from "../models/idioma";

export async function dbConection(){
    try {
        await mongoose.connect(MONGO_DB);
        logSuccess('Conexión a la base de datos exitosa');
    } catch (error) {
        logError(`Error al conectar a la base de datos: ${error}`);
    }
}