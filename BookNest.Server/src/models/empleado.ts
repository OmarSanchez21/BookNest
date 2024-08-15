import mongoose, {Document, Schema} from "mongoose";

interface IEmpleado extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    fCumpleaños: Date;
    username: string;
    password: string;
    email: string;
    genero: string;
    paisOrigen: string;
}

const EmpleadoSchema: Schema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    fCumpleaños: {type: Date, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    genero: {type: String, required: true},
    paisOrigen: {type: String, required: true},
});

const EmpleadoModel = mongoose.model<IEmpleado>("Empleado", EmpleadoSchema);

export default EmpleadoModel;