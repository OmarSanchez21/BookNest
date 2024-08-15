import mongoose, {Document, Schema} from "mongoose";

interface IAutor extends Document {
    nombre: string;
    apellido: string;
    biografia: string;
    fechaNacimiento: Date;
    genero: string;
    paisOrigen: string;
    libros: Schema.Types.ObjectId[];
}

const AutorSchema: Schema = new Schema<IAutor>({
    nombre: {type: 'string',required: true},
    apellido: {type: 'string',required: true},
    biografia: {type: 'string', required: false},
    fechaNacimiento: {type: Date, required: true},
    genero: {type: 'string', required: true},
    paisOrigen: {type: 'string', required: true},
    libros: [{type: Schema.Types.ObjectId, ref: 'Libro'}]
})

const AutorModel = mongoose.model<IAutor>("Autor", AutorSchema);

export default AutorModel;