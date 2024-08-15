import mongoose, {Schema, Document} from "mongoose";

interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    fCumpleaños: Date;
    username: string;
    password: string;
    email: string;
    genero: string;
    paisOrigen: string;
    favoritosLibros?: Schema.Types.ObjectId[];
    GenerosFavortios?: Schema.Types.ObjectId[];
    listaDeseados?: Schema.Types.ObjectId[];
    historialPrestamo?: Schema.Types.ObjectId[];
    historialCompras?: Schema.Types.ObjectId[];
}

const UsuarioSchema: Schema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    fCumpleaños: {type: Date, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    genero: {type: String, required: true},
    paisOrigen: {type: String, required: true},
    favoritosLibros: [{type: Schema.Types.ObjectId, ref: 'Libro'}],
    GenerosFavortios: [{type: Schema.Types.ObjectId, ref: 'Genero'}],
    listaDeseados: [{type: Schema.Types.ObjectId, ref: 'Libro'}],
    historialPrestamo: [{type: Schema.Types.ObjectId, ref: 'Prestamo'}],
    historialCompras: [{type: Schema.Types.ObjectId, ref: 'Compra'}]
});

const UsuarioModel = mongoose.model<IUsuario>("Usuario", UsuarioSchema);

export default UsuarioModel;