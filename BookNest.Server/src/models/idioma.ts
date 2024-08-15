import mongoose, { Schema, Document } from "mongoose";


interface IIdioma extends Document {
    _id: string;  
    nombre: string;
}


const IdiomaSchema: Schema = new Schema({
    _id: { type: String, required: true },  
    nombre: { type: String, required: true }, 
});

const IdiomaModel = mongoose.model<IIdioma>("Idioma", IdiomaSchema);

export default IdiomaModel;
