import mongoose, {Document, Schema} from "mongoose";

interface IEditorial extends Document {
    nombre: string;
    pais: string;
    libros: Schema.Types.ObjectId[];
}

const EditorialSchema = new Schema<IEditorial>({
    nombre: { types: String, required: true, unique: true },
    pais: { types: String, required: true},
    libros: [{type: Schema.Types.ObjectId, ref: 'Libro'}]
});

const EditorialModel = mongoose.model<IEditorial>("Editorial", EditorialSchema);
export default EditorialModel;