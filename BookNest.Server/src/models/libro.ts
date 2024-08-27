import mongoose, {Document, Schema} from "mongoose";

interface ILibro extends Document {
    titulo: string;
    autor: Schema.Types.ObjectId;
    editorial: Schema.Types.ObjectId;
    genero: Schema.Types.ObjectId;
    idioma: Schema.Types.ObjectId;
    isbn: string;
    publicacion: Date;
    stock: number;
    precio: number;
    descripcion: string;
    imagen: string
}

const LibroSchema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true },
    editorial: { type: Schema.Types.ObjectId, ref: 'Editorial', required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    idioma: { type: Schema.Types.ObjectId, ref: 'Idioma', required: true },
    isbn: { type: String, required: true, unique: true },
    publicacion: { type: Date, required: true },
    stock: { type: Number, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true }
});

const LibroModel = mongoose.model<ILibro>('Libro', LibroSchema);

export default LibroModel;