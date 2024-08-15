import mongoose, { Schema, Document } from "mongoose";

interface IGenero extends Document {
    _id: string;
    nombre: string;
}

const GeneroSchema: Schema = new Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
});

const GeneroModel = mongoose.model<IGenero>("Genero", GeneroSchema);

export default GeneroModel;
